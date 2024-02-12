"use client";
import React, { Fragment, useState } from "react";
import TimeslotClasses from "./TimeslotClasses";
import { motion } from "framer-motion";
import { getSessionContext } from "@/hooks/session";

const TimeSlot = ({ timeslot, date }: { timeslot: number; date: Date }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};
    const user = getSessionContext().user;
	return (
		<Fragment>
			<button
				onClick={toggleModal}
				className="flex h-full w-full hover:animate-pulse flex-col text-white  items-center text-center justify-center"
			>
				<TimeslotClasses timeslot={timeslot} date={date} />
			</button>

			{modalOpen && (
				<div className="bg-black left-0 normal-case top-0 p-4 bg-opacity-40 fixed w-full h-screen flex flex-col items-center justify-center">
					<motion.div
						initial={{ opacity: 0, y: -200 }}
						animate={{ opacity: 1, y: 0 }}
						className="p-4 bg-white max-w-[400px] w-full rounded-md flex flex-col divide-y divide-slate-300"
					>
						<div className="flex flex-row justify-between items-center">
							<h3 className="text-lg text-slate-500 font-semibold">
								Classes
							</h3>
                            <button onClick={toggleModal} className="text-base p-2">
                                X
                            </button>
						</div>
					</motion.div>
				</div>
			)}
		</Fragment>
	);
};

export default TimeSlot;
