import React, { ReactNode } from "react";
import Navbar from "@/components/dashboard/NavbarWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import options from "@/app/api/auth/[...nextauth]/options";
import { ExtendedSession } from "@/types/authtypes";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = (await getServerSession(options)) as ExtendedSession;
  if (!session) return redirect("/api/auth/signin?callbackUrl=/dashboard");

  if (!session.user.verified) {
    return (
      <div className="bg-black p-4 h-screen">
        <div className="h-full flex flex-col rounded-xl space-y-3 items-center justify-center bg-slate-200 text-center">
          <h1 className="text-3xl font-bold text-slate-600">Email not verified</h1>
          <div className="p-4 rounded-xl bg-slate-500">
          <p className="text-white">Please wait for an Admin to verify your email.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <main className="p-3 bg-black h-screen">
      <div className="rounded-xl  bg-slate-100 md:bg-white h-full">
        <Navbar session={session} />
        <div className="md:ml-[200px] md:rounded-3xl p-4 md:p-16 bg-slate-100 md:h-full overflow-y-scroll text-black">
          {children}
        </div>
      </div>
    </main>
  );
};
export default DashboardLayout;
