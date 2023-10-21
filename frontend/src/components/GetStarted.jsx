import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const GetStarted = () => {
  return (
    <div className="flex flex-col justify-center  text-white h-screen p-4">
      <div className="text-4xl font-semibold text-start pl-10 ">
        Getting Started
      </div>
      <p className="p-10 text-sm">
        <span className="text-[#00FFe5] text-xl">Federated Learning</span>
        enables collaborative model training across entities while preserving
        <span className="text-[#00FFe5] text-xl"> data privacy</span> . It works
        by local client model training and sharing only model weights with an
        aggregator. However, it has some drawbacks: clients must trust the
        aggregator for accurate aggregation, and malicious clients can
        compromise the model. To address these challenges, we've developed WaFL,
        a secure solution with two key components:
        <br /> <br /> 1. An{" "}
        <span className="text-[#00FFe5] text-xl">
          aggregator smart contract{" "}
        </span>{" "}
        ensures trustless aggregation of client model updates.
        <br /> <br />
        2. Off-chain{" "}
        <span className="text-[#00FFe5] text-xl">
          zkSNARK verification
        </span>{" "}
        guarantees the integrity of client model weights before aggregation.
        <br />
        <br /> We offer middleware to facilitate client-aggregator interactions
        and streamline data flow, allowing clients to focus on their local
        models. Our setup process makes it easy for everyone to use WaFL.
        Additionally, we provide a service for users to visualize model metrics
        like accuracy and loss scores. Users can sign up on our website to
        monitor their model's progress and fine-tune hyperparameters.
      </p>
    </div>
  );
};

export default GetStarted;
