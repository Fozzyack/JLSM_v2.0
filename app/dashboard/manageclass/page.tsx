import options from "@/app/api/auth/[...nextauth]/options";
import WeeklyTimeTable from "@/components/manageclass/WeeklyTimeTable";
import { SessionContext } from "@/hooks/session";
import { ExtendedSession } from "@/types/authtypes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getWeekDays = () => {
	const today = new Date();
	const dayOfWeek = today.getDay();
	const currentDay = today.getDate();
	today.setDate(currentDay);
	const monday = new Date(
		today.setDate(currentDay + (dayOfWeek === 0 ? 6 : 1 - dayOfWeek)),
	);
	let weekDays = [];
	for (let i = 0; i < 7; i++) {
		const nextDay = new Date(monday);
		nextDay.setDate(monday.getDate() + i);
		weekDays.push(nextDay);
	}

	return weekDays;
};
const ManageClass = async () => {
	const weekDays = getWeekDays();
    const session = await getServerSession(options) as ExtendedSession
    if(session.user.privilege < 1) return redirect('/dashboard')
	return (
		<div className="h-full w-full">
			<WeeklyTimeTable weekdays={weekDays} session={session}/>
		</div>
	);
};

export default ManageClass;
