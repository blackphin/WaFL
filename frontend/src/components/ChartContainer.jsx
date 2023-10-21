import React, { useState } from "react";
import PieLineContainer from "../Charts/PieLineContainer";
import NavbarComponent from "./NavbarComponent";

const ChartContainer = ({ walletAddress, setWalletAddress }) => {
  console.log(walletAddress);
  const [session, setSession] = useState(1);

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
            <img src="/public/logo1.svg" className="w-10" />
            WaFL
          </div>
          <div className="ml-auto flex gap-8 text-white items-center">
            <span>Wallet Address :</span>0xac0....c80a
          </div>
        </div>
        <div className="flex">
          <NavbarComponent setSession={setSession} session={session} />
          <PieLineContainer setSession={setSession} session={session} />
        </div>
      </div>
    </>
  );
};

export default ChartContainer;
