"use client";
import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Our Vision",
    content:
      "We envision a future where technology and education merge to create an ecosystem that not only educates but also inspires and cultivates the next generation of leaders, thinkers, and innovators. Our platform is more than just a tool; it's a bridge to the future of education in Japan.",
  },
  {
    title: "Our Mission",
    content:
      "Our mission is to provide a platform that is accessible, intuitive, and engaging for students and educators alike. We aim to create a space where students can learn, grow, and thrive in a digital environment that is both safe and supportive.",
  },
  {
    title: "Why us?",
    content:
      "In a world where education is evolving, we stay ahead of the curve, anticipating the needs of schools, students, and families. Our dedication to enhancing the educational journey through technology is unwavering. We believe in the power of education and the potential of every student, and our platform is designed to unlock that potential. Join us in transforming the educational landscape. Together, we can create a brighter, more informed, and connected world.",
  },
];
const About = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-3xl py-4 font-bold text-amber-500">About</h3>
      <div className="justify-center flex flex-col md:flex-row gap-12">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-[33%]"
          >
            <motion.div whileHover={{ y: -20 }}

            className="bg-gradient-to-t h-full from-yellow-600 to-yellow-500 p-5 rounded-md"
            >
              <h4 className="text-xl font-bold text-white">{section.title}</h4>
              <p className="text-white">{section.content}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
