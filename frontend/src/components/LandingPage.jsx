import React, { useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const handleAboutClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: "smooth",
    });
  };
  const handleGettingClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight + window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="h-screen ">
        <div
          className="flex text-white border-b p-4 "
          style={{
            borderImage: "linear-gradient(to right, transparent, #00FFE5)",
            borderImageSlice: 1,
          }}
        >
          <div className="flex gap-2 items-center">
            <img
              src="https://svgshare.com/i/ykT.svg"
              className="w-12"
              alt="Logo"
            />
            WaFL
          </div>
          <div className="ml-auto flex gap-8 items-center">
            <div className="cursor-pointer" onClick={handleAboutClick}>
              About Us
            </div>
            <div className="cursor-pointer" onClick={handleGettingClick}>
              Getting Started
            </div>
          </div>
        </div>
        <div className="text-white flex justify-between h-full">
          <div className="flex flex-col justify-center gap-8 w-1/2">
            <div className="font-bold text-4xl text-[#00FFE5]">
              WaFL : Web3 accelerated Federated Learning
            </div>
            <div className="text-xl">
              Pairing ML Waffles with the sweetness of Web3
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
              src="https://lottie.host/348f4e1f-42b0-4b74-87f5-199a1f07a27f/k6MYvQpIBN.json" // Use the imported Lottie animation JSON
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
