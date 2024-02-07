"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-12 p-8 md:p-32 bg-gradient-to-tr from-black to-yellow-500 from-40%">
      <div className="col-span-7 text-center md:text-start gap-4  flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-yellow-500">ようこそ !</h3>
        <h1 className="text-3xl font-bold text-white">
          Transforming Students into Global Business Ninjas.
        </h1>
        <p className="text-base font-bold text-yellow-500">
          Perth Japanese Language Schools Learning Management System{" "}
        </p>
        <div className="flex flex-row gap-4 justify-center md:justify-start">
          <Link href="/dashboard" className="bg-gradient-to-r rounded-xl from-yellow-500 to-yellow-600 text-white px-3 py-2 w-[100px] text-center"> Sign In </Link>
          <button className="bg-gradient-to-r rounded-xl from-yellow-500 to-yellow-600 text-white px-1 py-1 min-w-[100px]">
            <div className="bg-black px-2 py-1 rounded-xl">
              <span> Learn More </span>
            </div>
          </button>
        </div>
      </div>
      <div className="col-span-5">
        <Image
          src="/landing/HeroShiba.png"
          width={1024}
          height={1024}
          alt="ShibaInu"
        />
      </div>
    </div>
  );
};

export default Hero;
