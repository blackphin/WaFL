import React, { useState } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaUser,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaUserMd,
} from "react-icons/fa";

const NavbarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const links = [
    { icon: <FaUser size={20} />, text: "Profile", href: "/profile/student" },
    {
      icon: <FaExclamationTriangle size={20} />,
      text: "Grievances",
      href: "/grievances",
    },
    { icon: <FaSignOutAlt size={20} />, text: "Outpass", href: "/outpass/student" },
    { icon: <FaUserMd size={20} />, text: "Counsellor", href: "/counsellor" },
    { icon: <FaSignOutAlt size={20} />, text: "Logout", href: "/logout" },
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div
      className={`h-100 min-h-screen bg-[#272715] text-white  ${
        collapsed ? "w-20" : "w-1/6"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="pl-6 pt-4">
        <button
          className="w-8 h-8 bg-[#e8e7d854]  flex items-center justify-center rounded-3xl focus:outline-none"
          onClick={toggleCollapse}
        >
          {collapsed ? (
            <FaChevronRight className="text-white" />
          ) : (
            <FaChevronLeft className="text-white" />
          )}
        </button>
      </div>
      <nav className={`flex flex-col mt-8 m-2`}>
        {links.map(({ icon, text, href }, index) => (
          <a
            key={href}
            className={`py-2 px-4 flex items-center rounded-3xl ${
              index === activeLink
                ? "bg-[#e8e7d8] text-black justify-center"
                : collapsed
                ? "hover:bg-[#e8e7d8] hover:text-black justify-center"
                : "hover:bg-[#e8e7d8] hover:text-black justify-start"
            }`}
            href={href}
            onClick={() => handleLinkClick(index)}
          >
            <span className="mr-2">{icon}</span>
            <div
              style={{
                display: collapsed ? "none" : "block",
                paddingLeft: collapsed ? 0 : "0.75rem",
              }}
            >
              {text}
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default NavbarComponent;
