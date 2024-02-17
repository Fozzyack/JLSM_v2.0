import options from "@/app/api/auth/[...nextauth]/options";
import TimeTable from "@/components/manageclass/TimeTable";
import { ExtendedSession } from "@/types/authtypes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";

const getCurrentWeek = () => {
	const dates: Date[] = [];
	const day = 24 * 60 * 60 * 1000;
	const today = new Date();
	let monday = new Date();
	if (today.getDay() === 0) {
		monday = new Date(today.getTime() - day * 6);
	} else {
		monday = new Date(today.getTime() - today.getDay() * day + day);
	}
	monday.setUTCHours(0, 0, 0, 0);
	for (let i = 0; i < 7; i++) {
		dates.push(new Date(monday.getTime() + day * i));
	}
	dates[6].setUTCHours(23, 59, 59, 999);
	return dates;
};

const ManageClass = async () => {
	const dates = getCurrentWeek();
	const session = (await getServerSession(options)) as ExtendedSession;

	if (!session || !session.user || session.user.privilege < 2) {
		return redirect("/dashboard");
	}

	return (
		<Fragment>
			<TimeTable session={session} weekDates={dates} />
		</Fragment>
	);
};

export default ManageClass;
