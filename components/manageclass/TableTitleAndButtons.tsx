"use client";
import React from "react";
import { motion } from "framer-motion";

const TableTitleAndButtons = ({
	setDates,
}: {
	setDates: React.Dispatch<React.SetStateAction<Date[]>>;
}) => {
	const back = () =>
		setDates((dates) =>
			dates.map(
				(date) => new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000),
			),
		);
	const forward = () =>
		setDates((dates) =>
			dates.map(
				(date) => new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000),
			),
		);
	return (
		<div className="flex flex-row justify-between w-full mb-4">
			<motion.button
				whileHover={{ scale: 1.06 }}
				onClick={back}
				className="w-[80px] rounded-md bg-yellow-500 p-2 text-white"
			>
				{" "}
				Back
			</motion.button>
			<h3> Organise Classes </h3>
			<motion.button
				whileHover={{ scale: 1.06 }}
				onClick={forward}
				className="w-[80px] rounded-md bg-yellow-500 p-2 text-white"
			>
				{" "}
				Forward{" "}
			</motion.button>
		</div>
	);
};

export default TableTitleAndButtons;
