import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Dashboard from "./components/Dashboard";
import ChartContainer from "./components/ChartContainer";
import "../src/App.css";
import Login from "./components/Login";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
});

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  return (
    <BrowserRouter>
      <WagmiConfig config={config}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ChartContainer
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
              />
            }
          />
        </Routes>
      </WagmiConfig>
    </BrowserRouter>
  );
};

export default App;
