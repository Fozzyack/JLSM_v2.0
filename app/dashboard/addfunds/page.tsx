'use client';
import ChooseFunds from '@/components/funds/AddMoney';
import React from 'react';

const AddFunds = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <p> The new way to pay your tutors </p>
            <ChooseFunds />
        </div>
    );
};

export default AddFunds;
