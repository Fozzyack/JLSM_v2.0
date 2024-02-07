'use client'
import React, { useState } from "react";
import Image from "next/image";
import MobileNav from "./MobileNav";

const NAV_LINKS = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#",
  },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
  return (
    <nav className="fixed bg-black bg-opacity-90 w-full z-10 px-8 py-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Image src="/LogoNBG.png" width={50} height={50} alt="Logo" />
          <h1 className="text-2xl font-bold text-white">JLSM</h1>
        </div>
        <div className="md:flex flex-row gap-4 hidden">
          {NAV_LINKS.map((link, index) => (
            <a key={index} href={link.href} className="text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="block md:hidden">
          <button onClick={handleOpen}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <MobileNav navlinks={NAV_LINKS} isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
