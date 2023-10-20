import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import from react-router-dom

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http the.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function NavbarComponent() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const activeSessions = [
    { text: "Session 1", href: "/session/student/1" },
    { text: "Session 2", href: "/session/student/2" },
    { text: "Session 3", href: "/session/student/3" },
  ];

  const pastHistory = [
    { text: "History 1", href: "/history/1" },
    { text: "History 2", href: "/history/2" },
    { text: "History 3", href: "/history/3" },
  ];

  return (
    <div
      className={` bg-[#020C1B] text-white  w-1/6  transition-all duration-300 ease-in-out border-r`}
      style={{
        borderImage: "linear-gradient(to top, transparent, #00FFE5)",
        borderImageSlice: 1,
      }}
    >
      <nav className={`flex flex-col mt-8 m-2`}>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-md text-white font-normal hover:text-[#00FFE5] focus:text-[#00FFE5]"
          >
            Active Sessions
          </AccordionHeader>
          <AccordionBody>
            {activeSessions.map((session, index) => (
              <Link to={session.href} key={index} className="text-white flex ">
                <div className="p-2"> {session.text}</div>
              </Link>
            ))}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="text-md text-white font-normal hover:text-[#00FFE5]"
          >
            Past History
          </AccordionHeader>
          <AccordionBody>
            {pastHistory.map((history, index) => (
              <Link to={history.href} key={index} className="text-white flex ">
                <div className="p-2"> {history.text}</div>
              </Link>
            ))}
          </AccordionBody>
        </Accordion>
      </nav>
    </div>
  );
}
