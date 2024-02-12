"use client";
import { User } from "@/types/userconteacttypes";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Role from "../members/Role";

const EditModal = ({ user }: { user: User }) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [privilege, setPrivilege] = useState<number>(user.privilege);
	const handleClose = () => {
		setShowModal(false);
		setInputs({ name: "", balance: "" });
		setPrivilege(user.privilege);
	};

	const [inputs, setInputs] = useState({
		name: "",
		balance: "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const name = inputs.name ? inputs.name : user.name;
		const balance = inputs.balance ? inputs.balance : user.balance / 100;
		const res = await fetch("/api/users", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: user.id,
				name: name,
				balance: balance,
				privilege: privilege,
			}),
		});
		if (!res.ok) throw new Error("Failed to Update User");
		window.location.reload();
	};

	return (
		<div>
			<button
				className="text-base text-blue-800 hover:text-purple-600  transition ease-in-out duration-500"
				onClick={() => setShowModal(true)}
			>
				Edit
			</button>
			{showModal && (
				<div className="fixed  z-20 left-0  top-0 h-full w-full bg-black bg-opacity-50 flex justify-center items-center p-4">
					<motion.div
						initial={{ opacity: 0, y: -100 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-slate-100 rounded-xl divide-y divide-slate-300 flex flex-col shadow-xl p-5 w-screen md:max-w-[400px]"
					>
						<div className="flex justify-between">
							<h3 className="text-lg text-slate-500 font-semibold">
								Edit User
							</h3>
							<button onClick={handleClose}>X</button>
						</div>
						<form
							onSubmit={(e) => handleSubmit(e)}
							className="pt-4 flex flex-col space-y-3"
						>
							<label className="text-xs text-slate-400 uppercase">
								Name
							</label>
							<input
								value={inputs.name}
								onChange={(e) =>
									setInputs({
										...inputs,
										name: e.target.value,
									})
								}
								className="p-2 rounded-xl"
								type="text"
								placeholder={
									user.name ? user.name : "No Name given"
								}
							/>
							<label className="text-xs text-slate-400 uppercase">
								Balance
							</label>
							<input
								value={inputs.balance}
								onChange={(e) =>
									setInputs({
										...inputs,
										balance: e.target.value,
									})
								}
								min="0"
								step="0.01"
								className="p-2 rounded-xl"
								type="number"
								placeholder={(user.balance / 100).toString()}
							/>
							<label className="text-xs text-slate-400 uppercase">
								{" "}
								Role{" "}
							</label>
							<select
								value={privilege}
								onChange={(e) =>
									setPrivilege(parseInt(e.target.value))
								}
								className="p-2 rounded-xl"
							>
								<option value={0}>🎓 Student</option>
								<option value={1}>📚Teacher</option>
								<option value={2}>🔐Admin</option>
							</select>
							<div className="flex justify-center gap-4">
								<motion.button
									whileHover={{ scale: 1.05 }}
									className="w-20 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-2 rounded-xl"
									type="submit"
								>
									Save
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									onClick={handleClose}
									className="w-20 bg-gradient-to-r from-red-600 to-red-500 text-white p-2 rounded-xl"
								>
									Cancel
								</motion.button>
							</div>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
};
export default EditModal;
