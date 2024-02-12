"use client";
import { TeacherContact } from "@/types/userconteacttypes";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Role from "./Role";
import GradeBadge from "./GradeBadge";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState<TeacherContact[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await fetch("/api/teachers", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch teachers");
      const data = await res.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center md:text-start text-2xl">
        Teacher&apos;s Contacts
      </h1>
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
                className="text-start text-xs font-medium text-gray-500 uppercase"
              >
                Grade
              </th>
              <th
                scope="col"
                className="text-end text-xs font-medium text-gray-500 uppercase"
              >
              Role
              </th>
              {/* <th scope="col" className="text-end text-xs font-medium text-gray-500 uppercase">Classes</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <th className="text-xs font-medium text-gray-500 uppercase">
                  {teacher.image && (
                    <Image
                      src={teacher.image}
                      alt="pp"
                      width={60}
                      height={60}
                      className="rounded-full border border-black mx-auto my-2"
                    />
                  )}
                </th>
                <td className="text-sm font-medium text-gray-900">
                  {teacher.name && <span> {teacher.name} </span>}
                </td>
                <td className="text-sm font-medium text-gray-900">
                  {teacher.email}
                </td>
                <td className="text-sm font-medium text-gray-900">
                    <GradeBadge grade={teacher.grade} difficulty={teacher.difficulty}/>
                </td>
                <td > 
                    <Role privilege={teacher.privilege} place={1}/>
                </td>
                {/* <td className="text-sm font-medium text-gray-900">{teacher.classes}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
