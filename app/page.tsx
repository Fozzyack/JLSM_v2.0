import React from 'react';
import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar';
import About from '@/components/landing/About';
import OurStaff from '@/components/landing/OurStaff';

export default function Home() {
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
