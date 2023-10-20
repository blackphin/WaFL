import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Dashboard from "./components/Dashboard";
import ChartContainer from "./components/ChartContainer";
import "../src/App.css";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
});

const App = () => {
  return (
    <BrowserRouter>
      <WagmiConfig config={config}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<ChartContainer />} />
        </Routes>
      </WagmiConfig>
    </BrowserRouter>
  );
};

export default App;
