import Classmates from '@/components/members/Classmates';
import TeacherTable from '@/components/members/TeacherTable';
import React from 'react';

const Members = () => {
    return (
        <div className="flex flex-col gap-4">
            <TeacherTable /> 
            <Classmates />
        </div>
    )
}
export default Members;
