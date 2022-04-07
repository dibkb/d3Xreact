import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
const data = [
  { score: 12 },
  { core: 19 },
  { score: 31 },
  { score: 15 },
  { score: 24 },
  { score: 37 },
  { score: 12 },
  { core: 19 },
  { score: 36 },
  { score: 45 },
  { score: 23 },
  { score: 27 },
  { score: 21 },
  { core: 29 },
  { score: 31 },
  { score: 50 },
  { score: 32 },
  { score: 42 },
];
const max = data.reduce((prev, current) =>
  prev.score > current.score ? prev : current
);
const ScatterPlot = () => {
  const ref = useRef();
  const width = 900;
  const height = 500;
  const margin = { top: 0, bottom: 0, left: 50, right: 50 };
  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, width, height]);

    var xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    var yScale = d3
      .scaleLinear()
      .domain([0, Math.ceil(max.score / 10) * 10])
      .range([height - margin.bottom, margin.top]);
    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(null, data.format))
        .attr("font-size", "20px");
    }
    function xAxis(g) {
      g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat((i) => i))
        .attr("font-size", "20px");
    }
    svg.append("g").call(yAxis);
    svg.append("g").call(xAxis);
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", () => {
        return `#00476b`;
      })
      .attr("cx", function (d, i) {
        return xScale(i);
      })
      .attr("cy", function (d) {
        return yScale(d.score);
      })
      .attr("r", 5)
      .on("mouseover", function (a, b, c) {
        this.attr("class", "focus");
      })
      .on("mouseout", function () {});
  });
  return (
    <div className="scatter-chart">
      <h3>Scatter Plot</h3>
      <svg ref={ref}></svg>
    </div>
  );
};

export default ScatterPlot;
