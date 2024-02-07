"use client";
import { User } from "@/types/userconteacttypes";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Role from "../members/Role";
import EditModal from "./EditModal";
import VerifyUser from "./VerifyUser";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <div className="p-4 rounded-xl border border-slate-300 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Image
            </th>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Name
            </th>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Email
            </th>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Balance
            </th>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Role
            </th>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Verified
            </th>
            <th
              scope="col"
              className="text-start text-xs font-medium text-gray-500 uppercase "
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-4 whitespace-nowrap">
                {user.image && (
                  <Image
                    src={user.image}
                    alt={"Profile Picture"}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}
              </td>
              <td className="py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
              </td>
              <td className="py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {user.privilege === 0 ? `$${user.balance / 100}` : "N/A"}
                </div>
              </td>
              <td className="py-4 whitespace-nowrap text-gray-500">
                  <Role privilege={user.privilege} place={0} />
              </td>
              <td className="py-4 whitespace-nowrap text-gray-500">
                <VerifyUser id={user.id} verified={user.verified} /> 
              </td>
              <td className="py-4 whitespace-nowrap">
                <EditModal user={user}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
