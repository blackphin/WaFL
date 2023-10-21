import React, { useState, useEffect } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useSDK } from "@metamask/sdk-react";
import { useWallet } from "@suiet/wallet-kit";
import { OktoConnector } from "@okto_wallet/okto-connect-sdk";
import { useConnect } from "wagmi";
import { Link, useNavigate } from "react-router-dom";

const oktoConnector = new OktoConnector({
  options: {
    projectId: "adecec5237aed1fe115e84ac2b9ea981",
  },
});

const Login = ({ walletAddress, setWalletAddress }) => {
  const { sdk, connected, chainId } = useSDK();
  const { connect: connectWithWagmi } = useConnect({
    connector: oktoConnector,
  });
  const navigate = useNavigate();

  const wallet = useWallet();
  const connectToMetamask = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts?.[0]) {
        setWalletAddress(accounts[0]);
        navigate("/dashboard");
      }
    } catch (err) {
      console.warn("Failed to connect to Metamask:", err);
    }
  };

  console.log(walletAddress);

  useEffect(() => {
    if (wallet.account && wallet.account.address) {
      setWalletAddress(wallet.account.address);
      navigate("/dashboard");
    }
  }, [wallet.account]);

  return (
    <div className="h-screen">
      <div
        className="p-8 h-full"
        style={{
          background:
            "rgb(0,54,59) radial-gradient(circle, rgba(0,54,59,1) 0%, rgba(2,12,27,1) 100%)",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 54, 59, 0.4)",
        }}
      >
        <Link to="/" className="text-white">
          <span>Back</span>
        </Link>
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
              onClick={connectToMetamask}
            >
              <span>
                CONNECT <span className="pl-4">via</span>
              </span>
              <img
                src="https://svgshare.com/i/ykU.svg"
                alt="Metamask"
                className="w-8"
              />
            </button>
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
              <img
                src=" https://svgshare.com/i/ymK.svg"
                alt="SUI"
                className="text-[#00FFE5]"
              />
            </ConnectButton>
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
              onClick={() => {
                connectWithWagmi();
              }}
            >
              <span>
                CONNECT <span className="pl-4">via</span>
              </span>
              <img
                src=" https://svgshare.com/i/ynA.svg"
                alt="OktoWallet"
                className="w-24"
              />
            </button>
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
