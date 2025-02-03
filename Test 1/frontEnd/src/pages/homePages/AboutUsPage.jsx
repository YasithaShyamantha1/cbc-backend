import React from "react";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <div className="w-full h-full bg-[#FFE0B5] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-center text-[#D8AE7E] mb-6">
          About Us
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-gray-700 leading-relaxed mb-6"
        >
          Welcome to <span className="font-semibold">Our Company</span>, where
          passion meets purpose. We are dedicated to providing top-notch
          products and services to our customers, ensuring that every
          interaction is marked by quality, integrity, and innovation. Our
          mission is to make your life easier and more enjoyable by offering
          solutions tailored to your needs.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="p-4"
          >
            <h2 className="text-2xl font-semibold text-[#D8AE7E] mb-4">
              Our Vision
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
            <h2 className="text-2xl font-semibold text-[#D8AE7E] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To empower our customers by delivering high-quality products and
              exceptional services that exceed expectations. We are committed
              to fostering a culture of trust, collaboration, and continuous
              improvement.
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-semibold text-[#D8AE7E] mb-4">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Customer First: Your satisfaction is our priority.</li>
              <li>Integrity: We uphold the highest ethical standards.</li>
              <li>Innovation: We embrace creativity and new ideas.</li>
              <li>Teamwork: Together, we achieve greatness.</li>
              <li>Sustainability: We care for the planet and future generations.</li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1"
          >
            <img
              src="https://via.placeholder.com/400"
              alt="About Us"
              className="rounded-xl shadow-md"
            />
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-8"
        >
          <h2 className="text-2xl font-semibold text-[#D8AE7E] mb-4">
            Join Our Journey
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We invite you to explore our range of products and services and
            become a part of our growing community. Together, we can achieve
            incredible things.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
