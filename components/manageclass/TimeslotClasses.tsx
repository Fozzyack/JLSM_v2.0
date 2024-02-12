'use client';
import React from 'react';

const TimeslotClasses = ({ timeslot, date} : { timeslot : number, date: Date }) => {
    return (
        <div className="w-full">
            <div className="w-full bg-amber-500">test1</div>
            <div className="w-full bg-green-500">test2</div>
            <div className="w-full bg-indigo-500">test3</div>
        </div>
    );
};

export default TimeslotClasses;
