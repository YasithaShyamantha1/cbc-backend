import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-accent to-accent-light py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white shadow-2xl rounded-lg p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            My Account
          </h1>

          {/* Profile Picture */}
          {user.profilePicture && (
            <div className="flex justify-center mb-8">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#ab825b] shadow-lg"
              />
            </div>
          )}

          {/* User Info */}
          <div className="space-y-6">
            {/* First Name */}
            <motion.div
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              whileHover={{ backgroundColor: "#f3f4f6" }}
            >
              <FaUser className="text-[#ab825b] text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">First Name</p>
                <p className="text-gray-800 text-lg font-semibold">
                  {user.firstName}
                </p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              whileHover={{ backgroundColor: "#f3f4f6" }}
            >
              <FaEnvelope className="text-[#ab825b] text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 text-lg font-semibold">
                  {user.email}
                </p>
              </div>
            </motion.div>

            {/* Account Type */}
            <motion.div
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              whileHover={{ backgroundColor: "#f3f4f6" }}
            >
              <div className="text-[#ab825b] text-2xl">👤</div>
              <div>
                <p className="text-gray-600 text-sm">Account Type</p>
                <p className="text-gray-800 text-lg font-semibold capitalize">
                  {user.type}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
