'use client';
import { useCalendarContext } from '@/hooks/Calendar';
import React from 'react';

const SelectDate = () => {
    const context = useCalendarContext()
    const handleModalOpen = () => {
        context.setExistingClass(true)
        context.setShowModal(true)
    }

    return (
        <button onClick={handleModalOpen} className="w-full h-full">
        </button>
    );
};

export default SelectDate;
