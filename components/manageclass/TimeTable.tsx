"use client";
import { ExtendedSession } from "@/types/authtypes";
import React, { useEffect, useState } from "react";
import TableTitleAndButtons from "./TableTitleAndButtons";
import { SessionContext } from "@/hooks/session";
import SearchAndAddClass from "./SearchAndAddClass";
import SelectDate from "./SelectDate";
import { CalendarContext } from "@/hooks/Calendar";
import AddOrEditClassModal from "./AddOrEditClassModal";

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
	"08:00 - 09:00",
	"09:00 - 10:00",
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
    const [showModal, setShowModal] = useState(false);
    const [existingClass, setExistingClass] = useState(false);
    const [selectedDate, setSelectedDate ] = useState<Date>(dates[0])
    const [selectedTime, setSelectedTime] = useState<string>('8:00 - 9:00')

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
    
    
	return (
		<SessionContext.Provider value={session}>
            <CalendarContext.Provider value={{showModal, setShowModal, existingClass, setExistingClass, selectedDate, setSelectedDate, selectedTime, setSelectedTime}} >
            <AddOrEditClassModal />
			<div className="flex flex-col gap-2">
				<TableTitleAndButtons setDates={setDates} />
                <SearchAndAddClass />
				<div className="border border-slate-500 rounded-xl p-4 overflow-auto">
					<table className="w-full border-b border-slate-300 divide-y divide-slate-300">
						<thead>
							<tr>
								<th></th>
								{dates.map((date, index) => (
									<th
										key={index}
										className="text-xs font-semibold text-slate-500 uppercase"
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
							{TIMES.map((time, timeIdx) => (
								<tr key={timeIdx}>
									<th className="text-slate-500 border-r border-slate-300 text-sm font-semibold">
										{time}
									</th>
                                    {dates.map((date, dateIdx)=> (
                                        <td key={dateIdx} className="relative h-[40px] border-r border-slate-300">
                                            <SelectDate time={time} date={date}/>
                                        </td>
                                    ))}
                                </tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
            </ CalendarContext.Provider >
		</SessionContext.Provider>
	);
};

export default TimeTable;
