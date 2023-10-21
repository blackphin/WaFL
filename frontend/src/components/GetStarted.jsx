import React, { useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const GetStarted = () => {
  const [isCopied, setIsCopied] = useState([false, false]);

  const codeSnippets = [
    "git clone https://github.com/blackphin/WaFL  &&  cd WaFL",
    "./scripts/setup.sh",
  ];

  const copyToClipboard = (index) => {
    navigator.clipboard.writeText(codeSnippets[index]).then(() => {
      const updatedCopiedState = [...isCopied];
      updatedCopiedState[index] = true;
      setIsCopied(updatedCopiedState);
      setTimeout(() => {
        const resetCopiedState = [...isCopied];
        resetCopiedState[index] = false;
        setIsCopied(resetCopiedState);
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col justify-center text-white h-screen p-4">
      <div className="text-4xl font-semibold text-start pl-10 text-[#00FFe5]">
        Getting Started
      </div>
      <p className="p-10 text-xl">
        <span>
          We provide a simple 2-step initialization so that developers can get
          started instantly
        </span>
        <div className="flex flex-col gap-8 p-12">
          {codeSnippets.map((snippet, index) => (
            <div
              key={index}
              className="p-4 bg-black rounded-lg relative flex justify-between"
            >
              <span>
                {index + 1}. {snippet}
              </span>
              <button
                onClick={() => copyToClipboard(index)}
                className="text-[#00FFe5] border-none bg-transparent cursor-pointer"
              >
                {isCopied[index] ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>

        <span className="text-xl">Happy Building!</span>
        <br />
        <br />
      </p>
    </div>
  );
};

export default GetStarted;
