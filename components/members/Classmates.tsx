"use client";
import { Classmate } from "@/types/userconteacttypes";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Role from "./Role";

const Classmates = () => {
  const [classmates, setClassmates] = useState<Classmate[]>([]);

  useEffect(() => {
    const fetchClassmates = async () => {
      const res = await fetch("/api/classmates", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch classmates");
      const data = await res.json();
      setClassmates(data);
    };
    fetchClassmates();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center md:text-start text-2xl">Classmates</h1>

      <div className="overflow-x-auto p-4 rounded-xl border border-slate-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className=" text-center text-xs font-medium text-gray-500 uppercase "
              >
                Image
              </th>
              <th
                scope="col"
                className="text-start text-xs font-medium text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-start text-xs font-medium text-gray-500 uppercase"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-end text-xs font-medium text-gray-500 uppercase"
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {classmates.map((classmate, index) => (
              <tr key={index}>
                <th className="text-xs font-medium text-gray-500 uppercase">
                  {classmate.image && (
                    <Image
                      src={classmate.image}
                      alt="pp"
                      width={60}
                      height={60}
                      className="rounded-full border border-black mx-auto my-2"
                    />
                  )}
                </th>
                <td className="text-sm font-medium text-gray-900 ">
                  {classmate.name}
                </td>
                <td className="text-sm font-medium text-gray-900 ">
                  {classmate.email}
                </td>
                <td className="text-sm font-medium text-gray-900 ">
                  <Role privilege={0} place={1} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classmates;
