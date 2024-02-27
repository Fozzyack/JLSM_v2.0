"use client";
import { useCalendarContext } from "@/hooks/Calendar";
import { TeacherContact } from "@/types/userconteacttypes";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
// List of random colur hexcodes
const COLOUR_LIST = [
	"#ff0000",
	"#ff6100",
	"#dee014",
	"#1bd222",
	"#1bd269",
	"#1bd298",
	"#1bcdd2",
	"#1b92d2",
	"#1b4cd2",
	"#331bd2",
	"#6f1bd2",
	"#aa1bd2",
	"#d21bc6",
	"#d21b8e",
	"#d21b1b",
];

// AddOrEditClassModal component
// This modal is used to add or edit a class
// It is used to select a teacher from the list of teachers
// It is also used to add a class to the timetable
// It is also used to edit a class in the timetable
const AddOrEditClassModal = () => {
	const context = useCalendarContext();
	const [teachers, setTeachers] = useState<TeacherContact[]>([]);
	const [selectedTeacher, setSelectedTeacher] = useState<string>("-1");
	const [selectedColour, setSelectedColour] = useState("#ffff00");
	const [openColours, setOpenColours] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	console.log(startTime);
	const handleModalOpen = () => {
		context.setShowModal((state) => !state);
		setOpenColours(false);
		setStartDate("");
	};

	const handleSelect = (e: any) => {
		e.preventDefault();
		setSelectedTeacher(e.target.value);
		teachers.forEach((teacher) => {
			if (teacher.id == e.target.value) {
				console.log(teacher.colour);
				setSelectedColour(teacher.colour);
			}
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        if (selectedTeacher === "-1") {
            alert("Please select a teacher");
            throw new Error("Not Teacher Selected");
        }
		const res = await fetch("/api/classes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				teacherId: selectedTeacher,
				colour: selectedColour,
				startDate: new Date(startDate + "T" + startTime),
				endDate: new Date(endDate + "T" + endTime),
			}),
		});
		if (!res.ok) throw new Error("Error Adding Class");
		context.setShowModal((state) => !state);
	};

	useEffect(() => {
		const fetchTeachers = async () => {
			const res = await fetch("/api/teachers", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			if (!res.ok) throw new Error("Error Fetching Teachers");
			setTeachers(await res.json());
		};
		fetchTeachers();
		setStartDate(context.selectedDate.toISOString().split("T")[0]);
		setEndDate(context.selectedDate.toISOString().split("T")[0]);
		setStartTime(context.selectedTime.split(" - ")[0]);
		setEndTime(context.selectedTime.split(" - ")[1]);
	}, [context.selectedDate, context.selectedTime]);

	console.log(startDate);

	return (
		<AnimatePresence>
			{context.showModal && (
				<motion.div
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed z-50 flex flex-col w-full h-full top-0 left-0 items-center justify-center bg-black bg-opacity-50 p-4"
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
						<form
							onSubmit={(e) => handleSubmit(e)}
							className="flex flex-col items-center justify-center gap-2 py-2"
						>
							<div className="flex flex-col items-start justify-center">
								<label className="text-start text-slate-600 text-base">
									Teacher:
								</label>
								<div className="flex flex-row items-center gap-4 justify-between">
									<select
										className="p-3 rounded-xl"
										value={selectedTeacher}
										onChange={(e) => handleSelect(e)}
									>
										<option
											selected
											disabled
											hidden
											value="-1"
										>
											Select a Teacher
										</option>
										{teachers.map((teacher, index) => {
											if (teacher.privilege < 3) {
												return (
													<option
														value={teacher.id}
														key={index}
													>
														{teacher.name}
													</option>
												);
											}
										})}
									</select>
									<div
										className="inline relative"
										id="colourselect"
									>
										<div
											onClick={() => {
												setOpenColours(
													(state) => !state,
												);
											}}
											className="flex flex-row gap-2 cursor-pointer"
										>
											<div
												className="rounded-full"
												style={{
													backgroundColor:
														selectedColour,
													height: "30px",
													width: "30px",
												}}
											></div>
											<p> ? </p>{" "}
											{/* Change to svg of a down / up arrow */}
										</div>
										<AnimatePresence>
											{openColours && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													transition={{
														duration: 0.4,
													}}
													className="absolute rounded-xl grid grid-cols-4 shadow gap-4 bg-slate-100 w-[200px] p-2"
												>
													{COLOUR_LIST.map(
														(colour, index) => (
															<div
																key={index}
																className="cursor-pointer rounded-full"
																onClick={() => {
																	setSelectedColour(
																		colour,
																	);
																	setOpenColours(
																		false,
																	);
																}}
																style={{
																	backgroundColor:
																		colour,
																	height: "30px",
																	width: "30px",
																}}
															></div>
														),
													)}
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>
								<div className="flex flex-row gap-2 mt-4">
									<input
										type="date"
										value={startDate}
										onChange={(e) => {
											setStartDate(e.target.value);
										}}
									/>
									<input
										type="time"
										value={startTime}
										onChange={(e) => {
											setStartTime(e.target.value);
										}}
									/>
								</div>
								<div className="flex flex-row gap-2 mt-4">
									<input
										type="date"
										value={endDate}
										onChange={(e) => {
											setEndDate(e.target.value);
										}}
									/>
									<input
										type="time"
										value={endTime}
										onChange={(e) => {
											setEndTime(e.target.value);
										}}
									/>
								</div>
							</div>
							<div className="flex flex-row gap-4">
								<motion.button
									whileHover={{ y: -5 }}
									className="bg-yellow-500 p-2 rounded-xl text-white"
									type="submit"
								>
									Add Class
								</motion.button>
								<motion.button
									whileHover={{ y: -5 }}
									className="bg-red-500 p-2 rounded-xl text-white"
                                    type='button'
									onClick={() => handleModalOpen()}
								>
									Cancel
								</motion.button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AddOrEditClassModal;
