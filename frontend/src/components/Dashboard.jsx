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
      <footer className="p-4 text-white text-center">
        <div className="text-xl p-2">Made with ❤️🧇</div>
        <div>Shivansh Goel | Amey Khare | Madhav Walia | Subrabala Dash</div>
      </footer>
    </div>
  );
};

export default Dashboard;
