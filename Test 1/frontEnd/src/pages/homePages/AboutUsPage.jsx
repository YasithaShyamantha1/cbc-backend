import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaLeaf, FaHandshake, FaHeart } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ffe0b5] via-[#fff7ed] to-[#fbeee6] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-8 backdrop-blur-md"
      >
        <h1 className="text-5xl font-extrabold text-center text-[#b8895a] mb-6 tracking-tight drop-shadow-lg">
          About Crystal Beauty
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-gray-700 leading-relaxed mb-8 text-center"
        >
          Welcome to <span className="font-semibold text-[#b8895a]">Crystal Beauty</span>, where beauty meets confidence. We are passionate about providing premium beauty products that empower you to look and feel your best every day. Our mission is to make beauty accessible, enjoyable, and inspiring for everyone.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="p-4"
          >
            <h2 className="text-2xl font-bold text-[#b8895a] mb-4 flex items-center gap-2">
              <FaLightbulb className="text-[#f7c873]" /> Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To be a globally recognized brand known for excellence,
              innovation, and customer satisfaction. We aim to create a
              sustainable future through cutting-edge technology and ethical
              business practices.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="p-4"
          >
            <h2 className="text-2xl font-bold text-[#b8895a] mb-4 flex items-center gap-2">
              <FaHeart className="text-[#f7c873]" /> Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To empower our customers by delivering high-quality products and
              exceptional services that exceed expectations. We are committed
              to fostering a culture of trust, collaboration, and continuous
              improvement.
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-[#b8895a] mb-4 flex items-center gap-2">
              <FaUsers className="text-[#f7c873]" /> Our Values
            </h2>
            <ul className="text-gray-700 leading-relaxed space-y-3">
              <li className="flex items-center gap-2"><FaHandshake className="text-[#b8895a]" /> Customer First: Your satisfaction is our priority.</li>
              <li className="flex items-center gap-2"><FaLeaf className="text-[#b8895a]" /> Integrity: We uphold the highest ethical standards.</li>
              <li className="flex items-center gap-2"><FaLightbulb className="text-[#b8895a]" /> Innovation: We embrace creativity and new ideas.</li>
              <li className="flex items-center gap-2"><FaUsers className="text-[#b8895a]" /> Teamwork: Together, we achieve greatness.</li>
              <li className="flex items-center gap-2"><FaLeaf className="text-[#b8895a]" /> Sustainability: We care for the planet and future generations.</li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
              alt="About Us"
              className="rounded-2xl shadow-xl border-4 border-[#ffe0b5]"
            />
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-10"
        >
          <h2 className="text-2xl font-bold text-[#b8895a] mb-4">
            Join Our Journey
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We invite you to explore our range of products and become a part of our growing beauty community. Together, we can achieve incredible things.
          </p>
          <a href="/product" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#b8895a] to-[#d8ae7e] text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">Shop Now</a>
        </motion.div>
      </motion.div>
    </div>
  );
}
