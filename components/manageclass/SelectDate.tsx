'use client';
import { useCalendarContext } from '@/hooks/Calendar';
import React from 'react';

const SelectDate = ({ time, date } : { time : string, date: Date}) => {
    const context = useCalendarContext()
    const handleModalOpen = () => {
        context.setExistingClass(true)
        context.setShowModal(true)
        context.setSelectedTime(time)
        context.setSelectedDate(date)
    }
    return (
        <button onClick={() => {handleModalOpen()}} className="w-full h-full hover:bg-black hover:bg-opacity-50 hover:animate-pulse">
        </button>
    );
};

export default SelectDate;
