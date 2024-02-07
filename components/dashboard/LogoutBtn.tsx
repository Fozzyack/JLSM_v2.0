import React from 'react';
import Link from 'next/link';

const LogoutBtn = () => {
    return (
        <Link href="/api/auth/signout" className="bg-yellow-500 rounded-xl py-2 px-3 text-white font-bold shadow">
            Logout
        </Link> 
    )
}
export default LogoutBtn
