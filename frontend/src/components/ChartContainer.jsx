import React from "react";
import PieLineContainer from "../Charts/PieLineContainer";
import NavbarComponent from "./NavbarComponent";

const ChartContainer = () => {
  return (
    <>
      <div className="bg-[#020C1B] h-screen flex flex-col w-full">
        <div
          className="flex text-white border-b p-4"
          style={{
            borderImage: "linear-gradient(to right, transparent, #00FFE5)",
            borderImageSlice: 1,
          }}
        >
          <div className="flex gap-2 items-center">
            <img src="/public/logo.svg" className="w-8" />
            WaFL
          </div>
          <div className="ml-auto flex gap-8">
            <div>About Us</div>
            <div>Getting Started</div>
          </div>
        </div>
        <div className="flex">
          <NavbarComponent />
          <PieLineContainer />
        </div>
      </div>
    </>
  );
};

export default ChartContainer;
