"use client";
import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { useCalendarContext } from "@/hooks/Calendar";

const AddClassButton = () => {
	const context = useCalendarContext();
	const handleModalOpen = () => {
        context.setExistingClass(false)
        context.setShowModal(state => !state)
    };

	return (
		<Fragment>
			<motion.button
				whileHover={{ y: -5 }}
				onClick={handleModalOpen}
				className="text-white p-3 text-center rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500"
			>
				Add Class
			</motion.button>
		</Fragment>
	);
};

export default AddClassButton;
