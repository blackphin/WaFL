import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const LandingPage = () => {
  return (
    <div className="h-screen">
      <div
        className="flex text-white border-b pb-4"
        style={{
          borderImage: "linear-gradient(to right, transparent, #00FFE5)",
          borderImageSlice: 1,
        }}
      >
        <div className="flex gap-2 items-center"><img src="/public/logo.svg" className="w-8"/>WaFL</div>
        <div className="ml-auto flex gap-8">
          <div>About Us</div>
          <div>Getting Started</div>
        </div>
      </div>
      <div className="text-white flex justify-between">
        <div className="flex flex-col justify-center gap-8">
          <div className="font-bold text-5xl text-[#00FFE5]">
            Neural Networks and Shit
          </div>
          <div className="text-xl">Acting as a catalyst and fools</div>
          <button className="bg-[#00FFE5] p-3 text-black rounded-full w-40">
            SignUp / Login
          </button>
        </div>
        <div className="flex items-center p-2">
          <Player
            autoplay
            loop
            src="/public/animation.json"
            style={{ height: "400px", width: "400px" }}
          >
            <Controls buttons={["play", "repeat", "frame", "debug"]} />
          </Player>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
