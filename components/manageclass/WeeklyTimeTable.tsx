"use client";
import React, { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import { ExtendedSession } from "@/types/authtypes";
import { SessionContext } from "@/hooks/session";

const TIMES = [
	"8:00 - 9:00",
	"9:00 - 10:00",
	"10:00 - 11:00",
	"11:00 - 12:00",
	"12:00 - 13:00",
	"13:00 - 14:00",
	"14:00 - 15:00",
	"15:00 - 16:00",
	"16:00 - 17:00",
	"17:00 - 18:00",
	"18:00 - 19:00",
	"19:00 - 20:00",
	"20:00 - 21:00",
];

const DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

function handleDateChange(date: Date, factor: number) {
	return new Date(date.getTime() + factor * 24 * 60 * 60 * 1000 * 7);
}
const WeeklyTimeTable = ({
	weekdays,
	session,
}: {
	weekdays: Date[];
	session: ExtendedSession;
}) => {
	const [dateOffset, setDateOffset] = useState(0);
	return (
		<SessionContext.Provider value={session}>
			<div className="flex flex-row mb-4 justify-between items-center">
				<button
					onClick={() => setDateOffset(dateOffset - 1)}
					className="text-white bg-slate-400 p-2 rounded-md"
				>
					Previous
				</button>
				<h3 className="text-slate-500 text-lg font-semibold">
					Weekly Timetable
				</h3>
				<button
					onClick={() => setDateOffset(dateOffset + 1)}
					className="text-white bg-slate-400 p-2 rounded-md"
				>
					Next
				</button>
			</div>
			<div className="w-full h-full p-4 border overflow-x-auto rounded-xl border-slate-300">
				<table className="w-full divide-y divide-slate-300 border-b border-slate-300">
					<thead>
						<tr>
							<th></th> {/* Empty cell */}
							{weekdays.map((date, index) => {
								return (
									<th key={index} className="">
										<div className="flex flex-col p-4 text-slate-400 text-xs uppercase">
											<p>{DAYS[index]}</p>
											<p className="text-center">
												{handleDateChange(
													date,
													dateOffset,
												).toLocaleDateString("en-AU", {
													timeZone: "UTC",
												})}
											</p>
										</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-400">
						{TIMES.map((time, index) => {
                            const timeslot = index;
							return (
								<tr key={index}>
									<td className="text-slate-400 text-xs uppercase border-r border-slate-400">
										{time}
									</td>
									{weekdays.map((date, index) => (
										<td
											key={index}
											className="border border-r border-slate-300"
										>
											<TimeSlot
												timeslot={timeslot}
												date={handleDateChange(
													date,
													dateOffset,
												)}
											/>
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</SessionContext.Provider>
	);
};

export default WeeklyTimeTable;
