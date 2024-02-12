"use client";
import React from "react";

// A list of 9 different background colours to display grades
const GRADE_COLOURS = [
  "bg-red-500",
  "bg-red-400",
  "bg-red-300",
  "bg-yellow-500",
  "bg-yellow-400",
  "bg-yellow-300",
  "bg-green-500",
  "bg-green-400",
  "bg-indigo-600",
];
// A badge to display the grade of a student / teacher
const GradeBadge = ({
  grade,
  difficulty,
}: {
  grade: string;
  difficulty: number;
}) => {
  return (
    <div className="flex w-full h-full items-center justify-start">
      <div
        className={`
            py-1 px-3 rounded-full text-white text-center flex items-center justify-center
            ${GRADE_COLOURS[difficulty - 1]}
        `}
      >
        <span> {grade} </span>
      </div>
    </div>
  );
};

export default GradeBadge;
