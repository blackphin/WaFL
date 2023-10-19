import React from "react";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import ReactEcharts from "echarts-for-react";

echarts.use([CanvasRenderer]);

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
];

const LineChartComponent = () => {
  const option = {
    title: {
      text: "Monthly Progress",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["UV", "PV", "Amt"],
      top: 30,
    },
    xAxis: {
      type: "category",
      data: data.map((entry) => entry.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "UV",
        type: "line",
        data: data.map((entry) => entry.uv),
        itemStyle: {
          color: "#3388FF", // Change the color to blue shade
        },
      },
      {
        name: "PV",
        type: "line",
        data: data.map((entry) => entry.pv),
        itemStyle: {
          color: "#0066CC", // Change the color to blue shade
        },
      },
      {
        name: "Amt",
        type: "line",
        data: data.map((entry) => entry.amt),
        itemStyle: {
          color: "#003399", // Change the color to blue shade
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

export function PieChartComponent() {
  const option = {
    title: {
      text: "Marketing Channels",
      left: "center",
      top: 0,
      textStyle: {
        color: "#464646",
      },
    },
    tooltip: {
      trigger: "item",
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        data: [
          { value: 212, name: "Social Media" },
          { value: 410, name: "Referral" },
          { value: 348, name: "Print Media" },
          { value: 283, name: "Television Ads" },
          { value: 250, name: "Billboard" },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: "radius",
        label: {
          color: "rgba(0, 0, 0, 0.6)",
        },
        labelLine: {
          lineStyle: {
            color: "rgba(0, 0, 0, 0.6)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: "#8C6FC7",
        },
        animationType: "scale",
        animationEasing: "easeOutExpo",
        animationDelay: 100,
      },
    ],
  };
  return (
    <div style={{ width: "50%", height: "300px" }}>
      <ReactEcharts option={option} />
    </div>
  );
}

const PieLineContainer = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <LineChartComponent />
      <PieChartComponent />
    </div>
  );
};

export default PieLineContainer;
