"use client";
import React, { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";
import { ExtendedSession } from "@/types/authtypes";

const InfoBar = ({ session }: { session: ExtendedSession }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const res = await fetch("/api/balance", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Error getting balance");
      const data = await res.json();
      setBalance(data.balance);
    };
    getBalance();
  }, []);

  return (
    <div className="flex shadow-lg flex-row py-3 px-4 items-center justify-between bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-xl">
      <span>${balance / 100}</span>
      <ProfileSection session={session}/>
    </div>
  );
};

export default InfoBar;
