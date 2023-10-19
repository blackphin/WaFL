import { PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";

const signer = ethers.Wallet.createRandom();

const userAlice = await PushAPI.initialize(signer, { env: "staging" });

const apiResponse = await userAlice.channel.send(["*"], {
  notification: {
    title: "Hello world",
    body: "subrabala here",
  },
});
