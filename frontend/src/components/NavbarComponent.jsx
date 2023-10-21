import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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

export default function NavbarComponent({session, setSession}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const activeSessions = [
    { text: "Session 1", value: 1 },
    { text: "Session 2", value: 2 },
    { text: "Session 3", value: 3 },
  ];

  console.log(session)

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
              <div
                key={index}
                className="text-white flex cursor-pointer hover:text-[#00FFE5]"
                onClick={() => setSession(session.value)}
              >
                <div className="p-2"> {session.text}</div>
              </div>
            ))}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="text-md text-white font-normal hover:text-[#00FFE5]"
          >
           Getting Started
          </AccordionHeader>
          <AccordionBody>
            
          </AccordionBody>
        </Accordion>
      </nav>
    </div>
  );
}
