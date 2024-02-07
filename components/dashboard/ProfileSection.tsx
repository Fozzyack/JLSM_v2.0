import { ExtendedSession } from '@/types/authtypes';
import React from 'react';
import Image from 'next/image';

const ProfileSection = ({session} : {session: ExtendedSession }) => {
    return (
        <div className="flex flex-row items-center text-center gap-4">
                        {
                session.user.name ? <span> {session.user.name} </span>
                :
                <span> {session.user.email} </span>
            }
            {
               session.user.image && <Image src={session.user.image} alt='ProfilePicture' width={40} height={40} className="rounded-full border-2" />            
            }
 
        </div>
    )
}
export default ProfileSection
