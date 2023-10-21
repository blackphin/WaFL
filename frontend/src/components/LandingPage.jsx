import React, { useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="h-screen">
        <div
          className="flex text-white border-b p-4 "
          style={{
            borderImage: "linear-gradient(to right, transparent, #00FFE5)",
            borderImageSlice: 1,
          }}
        >
          <div className="flex gap-2 items-center">
            <img src="https://drive.google.com/file/d/1_sBplgKkYDKcyUG7jrIVpRePcPUTea7v/view?usp=share_link" className="w-12" alt="Logo" /> 
            WaFL
          </div>
          <div className="ml-auto flex gap-8 items-center">
            <div>About Us</div>
            <div>Getting Started</div>
          </div>
        </div>
        <div className="text-white flex justify-between h-full">
          <div className="flex flex-col justify-center gap-8 w-1/2">
            <div className="font-bold text-5xl text-[#00FFE5]">
              Neural Network Stuff
            </div>
            <div className="text-xl">
              Turning crypto newbies into DeFi wizards, because even your cat
              understands smart contracts better than you.
            </div>
            <Link to="/login">
              <button className="bg-[#00FFE5] p-3 text-black rounded-full font-semibold w-40">
                Connect Wallet
              </button>
            </Link>
            <p className="text-sm text-blue-gray-300 relative bottom-5">
              Don't have a wallet yet ? Try our new{" "}
              <a className="text-[#00FFE5] underline">zkLogin</a>
            </p>
          </div>
          <div className="flex items-center p-2">
            <Player
              autoplay
              loop
              src="https://drive.google.com/file/d/1xExMqge5_-YeC9JAZCsOc0I4Z3Z4Qfgp/view?usp=share_link" // Use the imported Lottie animation JSON
              style={{ height: "400px", width: "400px" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
