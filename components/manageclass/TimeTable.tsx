"use client";
import { ExtendedSession } from "@/types/authtypes";
import React, { useEffect, useState } from "react";
import TableTitleAndButtons from "./TableTitleAndButtons";
import { SessionContext } from "@/hooks/session";
import AddClass from "./SearchAndAddClass";
import SearchAndAddClass from "./SearchAndAddClass";

const DAYS = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];
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

const TimeTable = ({
	weekDates,
	session,
}: {
	weekDates: Date[];
	session: ExtendedSession;
}) => {
	const [dates, setDates] = useState<Date[]>(weekDates);
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const res = await fetch("/api/classes/getweeklyclasses", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						start: dates[0],
						end: dates[6],
					}),
				});
				if (!res.ok)
					throw new Error("There was An Error getting Classes");
				setClasses(await res.json());
			} catch (error: any) {
				console.error(error.message);
			}
		};
		fetchClasses();
	}, [dates]);

    console.log(classes)
	return (
		<SessionContext.Provider value={session}>
			<div className="flex flex-col gap-2">
				<TableTitleAndButtons setDates={setDates} />
                <SearchAndAddClass />
				<div className="border border-slate-500 rounded-xl p-4 overflow-auto">
					<table className="w-full divide-y divide-slate-300">
						<thead>
							<tr>
								<th></th>
								{dates.map((date, index) => (
									<th
										key={index}
										className="text-sm text-slate-500 uppercase"
									>
										<p>{DAYS[index]}</p>
										<p>
											{date.toLocaleDateString("en-AU", {
												timeZone: "UTC",
											})}
										</p>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-300">
							{TIMES.map((time, index) => (
								<tr key={index}>
									<th className="text-slate-500 border-r border-slate-300 text-sm font-semibold">
										{time}
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</SessionContext.Provider>
	);
};

export default TimeTable;