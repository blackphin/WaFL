import React from "react";
import LandingPage from "./LandingPage";
import About from "./About";

const Dashboard = () => {
  return (
    <div className="px-10 bg-[#020C1B] h-full w-full">
      <LandingPage />
      <About />
    </div>
  );
};

export default Dashboard;
