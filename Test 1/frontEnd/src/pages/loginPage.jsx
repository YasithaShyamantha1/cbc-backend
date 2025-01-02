import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" }); // Custom toast state

  // Function to show toast
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000); // Auto-dismiss after 3 seconds
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Both email and password are required.", "error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      const data = response.data;

      if (!data.user) {
        throw new Error("Invalid username or password.");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      // Show success toast and log user details
      showToast("Login successful!", "success");
      console.log("User Details:", data.user);

      // Redirect based on user type
      if (data.user.type === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Invalid username or password.";
      showToast(errorMsg, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Custom Toast */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please login to your account.</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
