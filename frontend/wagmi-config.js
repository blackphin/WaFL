import { createConfig, configureChains } from "wagmi";
import { OktoConnector } from "@okto_wallet/okto-connect-sdk";

const oktoConnector = new OktoConnector({
  options: {
    projectId: "adecec5237aed1fe115e84ac2b9ea981",
  },
});

const { chains, publicClient, webSocketPublicClient } = configureChains([
  "ethereum",
]);

const config = createConfig({
  connectors: [oktoConnector],
  publicClient,
  webSocketPublicClient,
});

export default config;
