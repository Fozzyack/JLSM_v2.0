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
    const submitClass = async () => {
        try {
            const res = await fetch('/api/class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    timeslot,
                    date
                })})
            if(!res.ok) throw new Error("Failed to add class")
            const data = await res.json()
        } catch(error: any) {
            console.log(error.message)
        }
    }
    const user = getSessionContext().user;
	return (
		<Fragment>
            <div className="w-full h-full">
			<button
				onClick={toggleModal}
				className="w-full h-full text-white"
			>
				<TimeslotClasses timeslot={timeslot} date={date} />
			</button>
            </div>

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
                        <div className="flex flex-col items-center justify-center">
                            <p> Nothing yet </p>
                            <button onClick={submitClass} className="text-white bg-slate-400 p-2">
                                Add Class
                            </button>
                        </div>
					</motion.div>
				</div>
			)}
		</Fragment>
	);
};

export default TimeSlot;
