import React from "react";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import ReactEcharts from "echarts-for-react";

echarts.use([CanvasRenderer]);

const dataAccuracy = [
  { name: 0, uv1: 0.97, uv2: 0.98, uv3: 0.99, uv4: 0.99, uv5: 0.98 },
  { name: 200, uv1: 0.98, uv2: 0.99, uv3: 1.0, uv4: 0.98, uv5: 0.99 },
  { name: 400, uv1: 0.985, uv2: 0.995, uv3: 0.999, uv4: 0.98, uv5: 0.97 },
  { name: 600, uv1: 0.988, uv2: 0.998, uv3: 0.9995, uv4: 0.999, uv5: 0.98 },
  { name: 800, uv1: 0.989, uv2: 0.999, uv3: 0.9997, uv4: 0.99, uv5: 1.0 },
  { name: 1000, uv1: 0.99, uv2: 1.0, uv3: 1.0, uv4: 0.99, uv5: 0.98 },
];

const dataLoss = [
  { name: 1, uv1: 1.5, uv2: 1.6, uv3: 1.7, uv4: 1.6, uv5: 1.7 },
  { name: 11, uv1: 1.55, uv2: 1.65, uv3: 1.75, uv4: 1.7, uv5: 1.8 },
  { name: 21, uv1: 1.6, uv2: 1.7, uv3: 1.8, uv4: 1.75, uv5: 1.85 },
  { name: 31, uv1: 1.65, uv2: 1.75, uv3: 1.85, uv4: 1.8, uv5: 1.9 },
  { name: 41, uv1: 1.7, uv2: 1.8, uv3: 1.9, uv4: 1.85, uv5: 1.95 },
  { name: 51, uv1: 1.75, uv2: 1.85, uv3: 1.95, uv4: 1.9, uv5: 1.97 },
];

const LineChartComponent = () => {
  const option = {
    title: {
      text: "Accuracy",
      left: "center",
      textStyle: {
        color: "#ffffff",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
      top: 30,
      textStyle: {
        color: "#009788",
      },
    },
    xAxis: {
      type: "category",
      data: dataAccuracy.map((entry) => entry.name),
      interval: 200,
    },
    yAxis: {
      type: "value",
      min: 0.97,
      max: 1.0,
    },
    series: [
      {
        name: "Series 1",
        type: "line",
        data: dataAccuracy.map((entry) => entry.uv1),
        itemStyle: {
          color: "#08FFE4",
        },
      },
      {
        name: "Series 2",
        type: "line",
        data: dataAccuracy.map((entry) => entry.uv2),
        itemStyle: {
          color: "#08dbc2",
        },
      },
      {
        name: "Series 3",
        type: "line",
        data: dataAccuracy.map((entry) => entry.uv3),
        itemStyle: {
          color: "#03a895",
        },
      },
      {
        name: "Series 4",
        type: "line",
        data: dataAccuracy.map((entry) => entry.uv4),
        itemStyle: {
          color: "#ff5733",
        },
      },
      {
        name: "Series 5",
        type: "line",
        data: dataAccuracy.map((entry) => entry.uv5),
        itemStyle: {
          color: "#ffda68",
        },
      },
    ],
  };

  return (
    <div style={{ width: "50%", height: "100%" }}>
      <ReactEcharts
        option={option}
        style={{ width: "100%", height: "300px" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

const LineChartComponentLoss = () => {
  const option = {
    title: {
      text: "Train Loss",
      left: "center",
      textStyle: {
        color: "#ffffff",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["Loss S1", "Loss S2", "Loss S3", "Loss S4", "Loss S5"],
      top: 30,
      textStyle: {
        color: "#009788",
      },
    },
    xAxis: {
      type: "category",
      data: dataLoss.map((entry) => entry.name),
      interval: 10,
    },
    yAxis: {
      type: "value",
      min: 1.0,
      max: 2.0,
    },
    series: [
      {
        name: "Loss S1",
        type: "line",
        data: dataLoss.map((entry) => entry.uv1),
        itemStyle: {
          color: "#08FFE4",
        },
      },
      {
        name: "Loss S2",
        type: "line",
        data: dataLoss.map((entry) => entry.uv2),
        itemStyle: {
          color: "#08dbc2",
        },
      },
      {
        name: "Loss S3",
        type: "line",
        data: dataLoss.map((entry) => entry.uv3),
        itemStyle: {
          color: "#03a895",
        },
      },
      {
        name: "Loss S4",
        type: "line",
        data: dataLoss.map((entry) => entry.uv4),
        itemStyle: {
          color: "#ff5733",
        },
      },
      {
        name: "Loss S5",
        type: "line",
        data: dataLoss.map((entry) => entry.uv5),
        itemStyle: {
          color: "#ffda68",
        },
      },
    ],
  };

  return (
    <div style={{ width: "50%", height: "100%" }}>
      <ReactEcharts
        option={option}
        style={{ width: "100%", height: "300px" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

const PieLineContainer = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
      className="p-10 w-full"
    >
      <LineChartComponent />
      <LineChartComponentLoss />
    </div>
  );
};

export default PieLineContainer;
