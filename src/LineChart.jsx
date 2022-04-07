import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
const data = [
  { color: "Red", score: 12 },
  { color: "Blue", score: 19 },
  { color: "Yellow", score: 3 },
  { color: "Green", score: 5 },
  { color: "Purple", score: 2 },
  { color: "Orange", score: 7 },
];
const max = data.reduce((prev, current) =>
  prev.score > current.score ? prev : current
);
const LineChart = () => {
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

    var line = d3
      .line()
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        return yScale(d.score);
      })
      .curve(d3.curveMonotoneX);
    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(null, data.format))
        .attr("font-size", "20px");
    }
    function xAxis(g) {
      g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3.axisBottom(xScale).tickFormat((i) => {
            if (data[i]) return `${data[i].color}`;
          })
        )
        .attr("font-size", "20px");
    }
    svg.append("g").call(yAxis);
    svg.append("g").call(xAxis);

    svg.append("path").datum(data).attr("class", "line").attr("d", line);
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", (i) => {
        return `${i.color.toLowerCase()}`;
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
    <div className="line-chart">
      <h3>Line Chart</h3>
      <svg ref={ref}></svg>
    </div>
  );
};

export default LineChart;
