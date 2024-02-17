'use client';
import React from 'react';
import SearchClasses from './SearchClass';
import AddClassHeader from './AddClassHeader';

const SearchAndAddClass = () => {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <SearchClasses />
            <AddClassHeader/>
        </div>
    );
};

export default SearchAndAddClass;
