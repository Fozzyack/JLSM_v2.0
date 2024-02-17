import React from "react";

type CalendarContextType = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    existingClass: boolean
    setExistingClass: React.Dispatch<React.SetStateAction<boolean>>,
    selectedDate: Date,
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
    selectedTime: string,
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>,
}

export const CalendarContext = React.createContext<CalendarContextType| undefined>(undefined);

export const useCalendarContext = () => {
	const context = React.useContext(CalendarContext);
	if (context === undefined)
		throw new Error("Please use within a calendar provider");
	return context;
};
