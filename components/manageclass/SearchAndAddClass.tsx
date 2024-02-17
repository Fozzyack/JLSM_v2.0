'use client';
import React from 'react';
import SearchClasses from './SearchClass';
import AddClassButton from './AddClassButton';

const SearchAndAddClass = () => {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <SearchClasses />
            <AddClassButton />
        </div>
    );
};

export default SearchAndAddClass;
