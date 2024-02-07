import React from 'react';
import Image from 'next/image';


const Logo = () => {
    return (
        <div className="flex flex-row gap-2 justify-center items-center px-5 rounded-xl ">
            <Image src='/LogoNBG.png' alt="Logo" width={50} height={50} />
        </div>
    )
}

export default Logo
