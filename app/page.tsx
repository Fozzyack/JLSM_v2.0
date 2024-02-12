import React from 'react';
import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar';
import About from '@/components/landing/About';
import OurStaff from '@/components/landing/OurStaff';
import { getServerSession } from 'next-auth';
import options from './api/auth/[...nextauth]/options';
import { ExtendedSession } from '@/types/authtypes';
import { redirect } from 'next/navigation';

export default async function Home() {    
  const session = await getServerSession(options) as ExtendedSession;
  if(session) {
    redirect('/dashboard');
  }
  return (
    <main className="bg-black min-h-screen">
        <Navbar />
        <Hero />
        <div className="flex flex-col p-4 md:p-32">
            <About />
            <OurStaff />
        </div>
    </main>
  );
}
