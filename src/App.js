// App.js
import React from "react";
import ScatterPlot from "./ScatterPlot";
import "./App.css";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

function App() {
  return (
    <div className="App">
      <BarChart />
      <LineChart />
      <ScatterPlot />
    </div>
  );
}

export default App;
