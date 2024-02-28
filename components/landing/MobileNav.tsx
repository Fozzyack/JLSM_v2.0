"use client";
import Link from "next/link";
import React, { Fragment } from "react";

const MobileNav = ({
  navlinks,
  isOpen,
}: {
  isOpen: boolean;
  navlinks: { label: string; href: string }[];
}) => {
  return (
    <Fragment>
      {isOpen && (
        <div className="flex flex-col gap-4 items-center md:hidden">
          {navlinks.map((link, index) => (
            <a key={index} href={link.href} className="text-white">
              {link.label}
            </a>
          ))}
          <Link href="/dashboard">
            <div className="relative group p-[1px]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-lg bg-yellow-500 transition duration-500 ease-in-out"/>
                <div className="relative z-20 bg-yellow-600 px-3 py-2 rounded-xl group-hover:bg-black transition-all ease-in-out duration-500 group-hover:shadow-xl">
                    <span className="text-white"> Sign in </span>
                </div>
            </div>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default MobileNav;
