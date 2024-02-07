import React from 'react';
import InfoBar from '@/components/dashboard/InfoBar';
import { getServerSession } from 'next-auth';
import { ExtendedSession } from '@/types/authtypes';
import options from '../api/auth/[...nextauth]/options';

const Dashboard = async () => {
   const session = await getServerSession(options) as ExtendedSession 
    
    return (
        <div>
            <InfoBar session={session}/>
        </div>
    )
}

export default Dashboard;
