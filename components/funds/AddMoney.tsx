'use client';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const DIFFERENT_LESSONS = [
    {
        type: 'Private Lesson x 1',
        description: 'One on one lesson with a tutor',
        price: 40,
        href: '/dashboard/addfunds/1'
    },
    {
        type: "Group Lesson x 1",
        description: "Group lesson with a tutor",
        price: 30,
        href: '/dashboard/addfunds/2'
    },
    {
        type: "Group Lesson x 4",
        description: "Group lesson with a tutor with a discount (Value Pack?)",
        price: 100,
        href: '/dashboard/addfunds/3'
    }
]
const ChooseFunds = () => {
    const router = useRouter();
    const handleNavigate = (href: string) => {
        router.push(href);
    }
    return (
        <div className="flex flex-col md:flex-row gap-2">

            {DIFFERENT_LESSONS.map((lesson, index) => (
                <button onClick={() => {handleNavigate(lesson.href)}} key={index} className="flex flex-col gap-2 p-4 w-full hover:border-2 border-yellow-500 hover:shadow-xl transition ease-in-out duration-500 rounded-md bg-slate-200 items-between justify-between text-center">
                    <h2 className="text-2xl font-bold text-slate-600">{lesson.type}</h2>
                    <p className="text-slate-600">{lesson.description}</p>
                    <p className="text-2xl font-bold text-slate-600">${lesson.price}</p>
                    <Link href={lesson.href} >
                        <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-4 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-400 text-white">
                            Buy
                        </motion.div>
                    </Link>
                </button>
            ))}
            
        </div>
    );
};

export default ChooseFunds;
