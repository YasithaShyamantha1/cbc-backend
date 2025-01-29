import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      axios.post (import.meta.env.VITE_BACKEND_URL+"/user/google",{
        token : res.access_token
      }).then((res)=>{
        if(res.data.message == "user created"){
          toast.success("Account is created")
        }
        else{
          localStorage.setItem("token",res.data.token)
          if(res.data.user.type == "admin"){
            window.location.href = "/admin"
          }else{
            window.location.href = "/"
          }
        }
      
      })
      toast.success("Google login successful!");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Google login failed.");
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        { email, password }
      );

      const data = response.data;

      if (!data.user) {
        throw new Error("Invalid username or password.");
      }

      localStorage.setItem("token", data.token);

      toast.success("Login successful!");

      if (data.user.type === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Login failed.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-accent to-accent-light">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Login to your account</p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-accent rounded-lg hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent"
          >
            <FaGoogle className="text-lg" />
            Login with Google
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-accent hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
