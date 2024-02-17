"use client";
import React, { Fragment, useState } from "react";
import SearchClasses from "./SearchClass";
import { AnimatePresence, motion } from "framer-motion";
const AddClass = () => {
	const [showModal, setShowModal] = useState(false);
	const handleModalOpen = () => {
		setShowModal(!showModal);
	};
	return (
		<Fragment>
			<SearchClasses />
			<motion.button
                whileHover={{ y: -5 }}
				onClick={handleModalOpen}
				className="text-white p-3 text-center rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500"
			>
				Add Class
			</motion.button>
			<AnimatePresence>
				{showModal && (
					<motion.div
						initial={{ y: -500 }}
						exit={{ y: -1000 }}
						animate={{ y: 0 }}
						transition={{ stiffness: 1000 }}
						className="fixed flex flex-col w-full h-full top-0 left-0 items-center justify-center bg-black bg-opacity-50 p-4"
					>
						<motion.div
							key="modal"
							exit={{ opacity: 0, y: -100 }}
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="bg-slate-100 flex flex-col p-5 rounded-xl w-screen md:max-w-[400px] divide-y divide-slate-300"
						>
							<div className="flex justify-between">
								<h3 className="text-lg text-slate-500 font-semibold">
									Add Class
								</h3>
								<button onClick={handleModalOpen}>X</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</Fragment>
	);
};

export default AddClass;
