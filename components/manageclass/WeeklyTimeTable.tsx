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
	"21:00 - 22:00",
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
			<div className="w-full h-full p-4 border overflow-x-auto rounded-xl border-slate-300">
				<table className="w-full h-full border-b border-slate-300 divide-y divide-slate-300">
					<thead>
						<tr>
							<th className="text-center text-xs font-medium text-gray-500 uppercase"></th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Monday</p>
								<p>
									{handleDateChange(
										weekdays[0],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Tuesday</p>
								<p>
									{handleDateChange(
										weekdays[1],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Wednesday</p>
								<p>
									{handleDateChange(
										weekdays[2],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Thursday</p>
								<p>
									{handleDateChange(
										weekdays[3],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Friday</p>
								<p>
									{handleDateChange(
										weekdays[4],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Saturday</p>
								<p>
									{handleDateChange(
										weekdays[5],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
							<th className="text-center text-xs font-medium text-gray-500 uppercase">
								<p>Sunday</p>
								<p>
									{handleDateChange(
										weekdays[6],
										dateOffset,
									).toLocaleDateString("en-AU")}
								</p>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-300">
						{TIMES.map((time, index) => (
							<tr key={index}>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									{time}
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
								<td className="text-center border-r border-slate-300 text-xs font-medium text-gray-500 uppercase">
									<TimeSlot
										timeslot={index}
										date={handleDateChange(
											weekdays[0],
											dateOffset,
										)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</SessionContext.Provider>
	);
};

export default WeeklyTimeTable;
