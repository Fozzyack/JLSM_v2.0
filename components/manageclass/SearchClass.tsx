'use client';
import React from 'react';

const SearchClasses = () => {
    return (
        <div className="flex items-center justify-start">
            <input 
            type="text"
            className="p-3 rounded-full border border-yellow-300 focus:border-none" 
            placeholder={"Search Classes"}/>
        </div>
    );
};

export default SearchClasses;
