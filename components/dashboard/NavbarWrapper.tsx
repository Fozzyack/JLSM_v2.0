"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import LogoutBtn from "./LogoutBtn";
import NavbarLinks from "./Links";
import { ExtendedSession } from "@/types/authtypes";
import { SessionContext } from "@/hooks/session";
import { motion } from "framer-motion";
const NavbarWrapper = ({ session }: { session: ExtendedSession }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <SessionContext.Provider value={session}>
      <div className="fixed h-screen hidden md:flex flex-col justify-between items-center py-10 w-[250px]">
        <Logo />
        <NavbarLinks />
        <LogoutBtn />
      </div>
      <button
        className="md:hidden bg-slate-100 rounded p-2"
        onClick={handleOpen}
      >
        {open ? (
          <svg
            className="w-8 h-8 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        )}
      </button>
      {open && (
        <motion.div 
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{stiffness: 170}}
        className="fixed  h-[70%] p-4  w-[90px] rounded-xl bg-white z-10 flex flex-col items-center justify-between shadow-xl  md:hidden">
            <Logo />
            <NavbarLinks />
            <LogoutBtn />
        </motion.div>
      )}
    </SessionContext.Provider>
  );
};
export default NavbarWrapper;
