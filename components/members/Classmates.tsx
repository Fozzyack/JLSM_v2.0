"use client";
import { Classmate } from "@/types/userconteacttypes";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Role from "./Role";
import GradeBadge from "./GradeBadge";
import { motion } from "framer-motion";

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
	if (classmates.length > 0) {
		return (
			<motion.div
				initial={{ height: 20 }}
				animate={{ height: "auto" }}
				className="flex flex-col gap-4"
			>
				<h1 className="text-center md:text-start text-2xl">
					Classmates
				</h1>

				<div className="overflow-x-auto p-4 rounded-xl border border-slate-300 transition ease-in-out duration-500 hover:bg-white hover:shadow-lg">
					<table className="min-w-full divide-y divide-gray-300">
						<thead>
							<tr>
								<th
									scope="col"
									className=" text-center text-xs font-medium text-transparent lg:text-gray-500 uppercase "
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
									className="hidden lg:table-cell text-start text-xs font-medium text-gray-500 uppercase"
								>
									Email
								</th>
								<th
									scope="col"
									className="hidden lg:table-cell text-start text-xs font-medium text-gray-500 uppercase"
								>
									Grade
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
								<motion.tr
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2 * index }}
									key={index}
								>
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
										<div className="text-slate-600 flex flex-col lg:hidden gap-1">
											<p>{classmate.email}</p>
											<GradeBadge
												grade={classmate.grade}
												difficulty={
													classmate.difficulty
												}
											/>
										</div>
									</td>
									<td className="hidden lg:table-cell text-sm font-medium text-gray-900 ">
										{classmate.email}
									</td>
									<td className="hidden lg:table-cell text-sm font-medium text-gray-900 ">
										<GradeBadge
											grade={classmate.grade}
											difficulty={classmate.difficulty}
										/>
									</td>
									<td className="text-sm font-medium text-gray-900 ">
										<Role privilege={0} place={2} />
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
		);
	}
};

export default Classmates;
