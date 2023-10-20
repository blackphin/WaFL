import React, { useState } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useSDK } from "@metamask/sdk-react";

const Login = () => {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };
  return (
    <div className=" h-screen">
      <div
        className="p-8 h-full rounded-md"
        style={{
          background: "rgb(0,54,59)",
          background:
            "radial-gradient(circle, rgba(0,54,59,1) 0%, rgba(2,12,27,1) 100%)",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 54, 59, 0.4)",
        }}
      >
        <h1 className="font-semibold text-white text-4xl text-center p-8">
          Sign Up / Login
        </h1>
        <div className="flex justify-around">
          <div className="w-1/2 flex justify-center py-10 gap-8 flex-col p-28 border rounded-3xl border-blue-gray-500">
            <button
              style={{
                backgroundColor: "#00FFE5",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
              className="px-4 w-100 py-4 font-semibold rounded-2xl"
              onClick={connect}
            >
              <span className="">
                CONNECT<span className="pl-4">via</span>
              </span>
              <img src="/public/metamask.svg" className="w-8" />
            </button>
            {/* {connected && (
            <div>
              <>
                {chainId && `Connected chain: ${chainId}`}
                <p></p>
                {account && `Connected account: ${account}`}
              </>
            </div>
          )} */}
            <ConnectButton
              style={{
                backgroundColor: "transparent",
                border: "2px solid #00FFE5",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <span>
                CONNECT <span className="pl-4">via</span>
              </span>
              <img src="/public/sui.svg" className="text-[#00FFE5]" />
            </ConnectButton>
            <div
              style={{
                backgroundColor: "#00FFE5",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
              className="px-4 w-100 py-4 font-semibold rounded-2xl"
            >
              OKTA
            </div>
          </div>
          <div>
            <Player
              autoplay
              loop
              src="https://lottie.host/d363ff7b-03cf-4c34-abf0-f2b980921d1f/W14tBx8zua.json"
              style={{ height: "400px", width: "400px" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
