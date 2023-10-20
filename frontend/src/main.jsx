import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { WalletProvider } from "@suiet/wallet-kit";
import { MetaMaskProvider } from "@metamask/sdk-react";
import "@suiet/wallet-kit/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <WalletProvider>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            logging: {
              developerMode: false,
            },
            checkInstallationImmediately: false,
            dappMetadata: {
              name: "Demo React App",
              url: window.location.host,
            },
          }}
        >
          <App />
        </MetaMaskProvider>
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>
);
