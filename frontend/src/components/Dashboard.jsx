import React from "react";
import LandingPage from "./LandingPage";
import About from "./About";
import GetStarted from "./GetStarted";
// import NotificationComponent from "./NotificationComponent";

const Dashboard = () => {
  return (
    <div className="px-10 bg-[#020C1B] h-full w-full">
      {/* <NotificationComponent /> */}
      <LandingPage />
      <About />
      <GetStarted />
    </div>
  );
};

export default Dashboard;
