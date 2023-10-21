import React from "react";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import ReactEcharts from "echarts-for-react";
import Data from "../DummyJSON/Charts.json";

echarts.use([CanvasRenderer]);

const LineChartComponent = ({ session }) => {
  let sessionData;

  if (session === 1) {
    sessionData = Data.session1;
  } else if (session === 2) {
    sessionData = Data.session2;
  } else if (session === 3) {
    sessionData = Data.session3;
  } else {
    return null;
  }

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
      data: sessionData.dataAccuracy.map((entry) => entry.name),
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
        data: sessionData.dataAccuracy.map((entry) => entry.uv1),
        itemStyle: {
          color: "#08FFE4",
        },
        smooth:true
      },
      {
        name: "Series 2",
        type: "line",
        data: sessionData.dataAccuracy.map((entry) => entry.uv2),
        itemStyle: {
          color: "#08dbc2",
        },
        smooth:true

      },
      {
        name: "Series 3",
        type: "line",
        data: sessionData.dataAccuracy.map((entry) => entry.uv3),
        itemStyle: {
          color: "#03a895",
        },
        smooth:true

      },
      {
        name: "Series 4",
        type: "line",
        data: sessionData.dataAccuracy.map((entry) => entry.uv4),
        itemStyle: {
          color: "#ff5733",
        },
        smooth:true

      },
      {
        name: "Series 5",
        type: "line",
        data: sessionData.dataAccuracy.map((entry) => entry.uv5),
        itemStyle: {
          color: "#ffda68",
        },
        smooth:true

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

const LineChartComponentLoss = ({ session }) => {
  let sessionData;

  if (session === 1) {
    sessionData = Data.session1;
  } else if (session === 2) {
    sessionData = Data.session2;
  } else if (session === 3) {
    sessionData = Data.session3;
  } else {
    // Handle the case when an invalid session is provided
    return null;
  }

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
      data: sessionData.dataLoss.map((entry) => entry.name),
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
        data: sessionData.dataLoss.map((entry) => entry.uv1),
        itemStyle: {
          color: "#ffffff",
        },
        lineStyle: {
          width: 2,
        },
        smooth: true,
      },
      {
        name: "Loss S2",
        type: "line",
        data: sessionData.dataLoss.map((entry) => entry.uv2),
        itemStyle: {
          color: "#08dbc2",
        },
        smooth: true,
      },
      {
        name: "Loss S3",
        type: "line",
        data: sessionData.dataLoss.map((entry) => entry.uv3),
        itemStyle: {
          color: "#03a895",
        },
        smooth: true,
      },
      {
        name: "Loss S4",
        type: "line",
        data: sessionData.dataLoss.map((entry) => entry.uv4),
        itemStyle: {
          color: "#ff5733",
        },
        smooth: true,
      },
      {
        name: "Loss S5",
        type: "line",
        data: sessionData.dataLoss.map((entry) => entry.uv5),
        itemStyle: {
          color: "#ffda68",
        },
        smooth: true,
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

const PieLineContainer = ({ session }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="w-full"
    >
      <div
        style={{
          display: "flex",
        }}
        className="p-10 w-full"
      >
        <LineChartComponent session={session} />
        <LineChartComponentLoss session={session} />
      </div>
      <div class="glassmorphism px-10 text-white">
        <h2 className="text-[#00EEf8]">Neural Network Parameters</h2>
        <ul>
          <li>Epochs: 100</li>
          <li>Accuracy: 0.95</li>
        </ul>
      </div>
    </div>
  );
};

export default PieLineContainer;
