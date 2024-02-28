"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    
    const [ transform, setTransform ] = useState(
        "rotateX(0deg) scale(1)"
    );
    const [ opacity, setOpacity] = useState(0);

    const onMouseEnter = () => {
        setTransform("rotateX(40deg) scale(0.9)")
        setOpacity(1)
    }
    const onMouseLeave = () => {
        setTransform("rotateX(0deg) scale(1)")
        setOpacity(0)
    }
	return (
		<div className="bg-[#121212]">
			<div className="flex flex-col md:grid md:grid-cols-12 p-8 pt-20 px-20 md:px-32 pb-0">
				<div className="col-span-7 flex flex-col justify-center p-4 ">
					<div className="group relative group p-2 rounded-xl shadow-xl">
						<div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_100%_0,#fcca03,transparent),radial-gradient(circle_farthest-side_at_0_100%,#fca103,transparent)] rounded-xl" />
						<div className="flex flex-col gap-4 text-center md:text-start p-4 relative bg-black rounded-xl">
							<h3 className="text-2xl font-bold text-yellow-500">
								ようこそ !
							</h3>
							<h1 className="text-3xl font-bold text-white">
								Transforming Students into Global Business
								Ninjas.
							</h1>
							<p className="text-base font-bold text-yellow-500">
								Perth Japanese Language Schools Learning
								Management System{" "}
							</p>
						</div>
					</div>
                    <div className="flex my-5 flex-row items-center justify-center gap-4 md:justify-start">
                        <Link href="/dashboard">
                            <div className="rounded-xl bg-yellow-500 px-3 py-2 text-center text-white w-[100px] hover:bg-amber-500 hover-bold transition-all ease-in-out duration-500">
                                Sign In
                            </div>
                        </Link>
                        <Link href="">
                            <div className="rounded-xl bg-black border-2 border-white px-3 py-2 text-center text-white  hover:bg-white hover:text-black hover-shadow-xl hover:scale-110 transition ease-in-out duration-500">
                                Learn More 
                            </div>
                        </Link>
                    </div>
				</div>
				<div className="col-span-5 flex justify-center items-center relative">
					<div className="absolute bg-yellow-500 rounded-full w-[40%] h-[40%]" />
					<Image
						src="/landing/HeroShiba.png"
						width={1024}
						height={1024}
						alt="ShibaInu"
						className="relative z-30"
					/>
				</div>
			</div>
			<div className="flex flex-col text-white w-80% justify-center items-center p-3 ">
				<a
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                href="https://perthjls.com.au/" className="group p-2 rounded-xl bg-black shadow-xl transition-all ease-in-out duration-500 group"
                    style={{
                        transform: transform
                    }}
                    >
					<Image
						src="/test.png"
						alt="Perth Japanese Language School"
						width={512}
						height={512}
					/>
				</a >
                <div className="absolute z-30 -translate-y-16 transition-all ease-in-out duration-500 p-3 rounded-xl bg-black" style={{ opacity: opacity }}>
                    To: https://perthjls.com.au/
                </div>
			</div>
		</div>
	);
};

export default Hero;
