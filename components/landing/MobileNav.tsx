"use client";
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
        </div>
      )}
    </Fragment>
  );
};

export default MobileNav;
