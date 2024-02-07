import React from  'react';
import { getServerSession } from 'next-auth';
import { ExtendedSession } from '@/types/authtypes';
import options from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import UsersTable from '@/components/manage/UserTable';
const Manage = async () => {
    const session = await getServerSession(options) as ExtendedSession
    if (session.user.privilege < 2 ) return redirect("/dashboard")
    return ( 
        <div>
            <UsersTable />
        </div>
    )
    
}

export default Manage;
