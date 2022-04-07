// BarChart.js
import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import "./App.css";
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
function BarChart() {
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
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, Math.ceil(max.score / 10) * 10])
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .selectAll("rect")
      .data(data.sort((a, b) => d3.descending(a.score, b.score)))
      .join("rect")
      .attr("fill", (i) => {
        return `${i.color.toLowerCase()}`;
      })
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d.score))
      .attr("title", (d) => d.score)
      .attr("class", "rectangle")
      .attr("height", (d) => y(0) - y(d.score))
      .attr("width", x.bandwidth());
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 4.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.color);
          })
          .y(function (d) {
            return y(d.score);
          })
      );
    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", "20px");
    }
    function xAxis(g) {
      g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => data[i].color))
        .attr("font-size", "20px");
    }
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.node();
  });
  return (
    <div className="bar-chart">
      <h3>Bar chart</h3>
      <svg ref={ref}></svg>
    </div>
  );
}

export default BarChart;
