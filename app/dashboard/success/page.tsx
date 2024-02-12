"use client";
import React, { useEffect } from "react";

const Success = () => {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
    }, []);
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center text-center justify-center">
      <h3 className="text-4xl font-bold text-slate-700">Success!</h3>
      <div>
        <p className="text-slate-500">Your payment was successful</p>
        <p className="text-slate-500">
          Thankyou for supporting Perth Japanese Language School
        </p>
        <p className="text-slate-500">
          You will be redirected to the dashboard shortly
        </p>
      </div>
    </div>
  );
};

export default Success;
