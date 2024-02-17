"use client";
import React from "react";

const ROLE_COLOURS = [
  "bg-yellow-500",
  "bg-cyan-700",
  "bg-red-500",
  "bg-indigo-700",
];
const placement = ["justify-start", "justify-center", "justify-end"];
const Role = ({ privilege, place }: { privilege: number; place: number }) => {
  return (
    <div
      className={`flex w-full h-full items-center 
    ${placement[place]}
    `}
    >
      <div
        className={`py-1 px-3 rounded-full text-white text-center 
    ${ROLE_COLOURS[privilege]} 

    `}
      >
        {privilege === 0 ? (
          <span>🎓Student</span>
        ) : privilege === 1 ? (
          <span>🍎Teacher</span>
        ) : privilege === 2 ? (
          <span>🔐Admin</span>
        ) : (
          <span>🤖Dev</span>
        )}
      </div>
    </div>
  );
};

export default Role;
