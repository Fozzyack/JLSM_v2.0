"use client";
import { User } from "@/types/userconteacttypes";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Role from "../members/Role";
import EditModal from "./EditModal";
import VerifyUser from "./VerifyUser";
import { motion } from "framer-motion";
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
		<div className="p-4 rounded-xl border border-slate-300 overflow-x-auto hover:bg-white hover:shadow-lg transition ease-in-out duration-500">
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
							className="text-center text-xs font-medium text-gray-500 uppercase "
						>
							Name
						</th>
						<th
							scope="col"
							className=" hidden lg:table-cell text-center text-xs font-medium text-gray-500 uppercase "
						>
							Email
						</th>
						<th
							scope="col"
							className="hidden lg:table-cell text-center text-xs font-medium text-gray-500 uppercase "
						>
							Balance
						</th>
						<th
							scope="col"
							className="hidden lg:table-cell text-center text-xs font-medium text-gray-500 uppercase "
						>
							Role
						</th>
						<th
							scope="col"
							className="hidden lg:table-cell text-center text-xs font-medium text-gray-500 uppercase "
						>
							Verified
						</th>
						<th
							scope="col"
							className="text-center text-xs font-medium text-gray-500 uppercase "
						>
							Edit
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-300">
					{users.map((user) => (
						<tr key={user.id}>
							<td className="py-4 whitespace-nowrap ">
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
							<td className="py-4 whitespace-nowrap px-4">
								<div className="text-sm flex flex-col gap-1 font-medium text-gray-900">
									<p> {user.name} </p>
									<p className="lg:hidden text-slate-600">
										{" "}
										{user.email}{" "}
									</p>
									<p className="lg:hidden text-slate-600">
										{" "}
										{user.privilege === 0
											? `$${user.balance / 100}`
											: "N/A"}{" "}
									</p>
									<div className="lg:hidden">
										<Role
											privilege={user.privilege}
											place={0}
										/>
									</div>
								</div>
							</td>
							<td className="hidden lg:table-cell py-4 whitespace-nowrap px-4">
								<div className="text-sm text-center text-gray-500">
									{user.email}
								</div>
							</td>
							<td className="hidden lg:table-cell py-4 whitespace-nowrap px-4">
								<div className="text-sm text-gray-500 text-center">
									{user.privilege === 0
										? `$${user.balance / 100}`
										: "N/A"}
								</div>
							</td>
							<td className="hidden lg:table-cell py-4 whitespace-nowrap text-gray-500 px-4">
								<Role privilege={user.privilege} place={1} />
							</td>
							<td className="hidden lg:table-cell py-4 whitespace-nowrap text-gray-500 px-4">
								<div className="flex justify-center">
									<VerifyUser
										id={parseInt(user.id)}
										verified={user.verified}
									/>
								</div>
							</td>
							<td className="py-4 whitespace-nowrap px-4 pr-8">
								<div className="flex flex-col items-center justify-center">
									<EditModal user={user} />
									<div className="lg:hidden">
										<VerifyUser
											id={parseInt(user.id)}
											verified={user.verified}
										/>
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UsersTable;
