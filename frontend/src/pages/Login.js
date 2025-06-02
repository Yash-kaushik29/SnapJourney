import React, { useContext, useState } from "react";
import { FaPlane, FaPlaneDeparture } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import FlyingPlanes from "../components/FlyingPlanes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  if(user) {
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/user-login`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Login Successful! 🎉");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message + " ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login Failed. Please try again. ❌"
      );
    }
  };

  const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/google-signup`,
          { googleToken: tokenResponse.access_token },
          { withCredentials: true }
        );
  
        if (response.data.success) {
          toast.success("Logged in successfully! 🎉");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(response.data.message + " ❌");
        }
      },
      onError: () => {
        toast.error("Some error occured! ❌");
      },
    });

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-200 via-sky-300 to-indigo-200">
      <ToastContainer />

      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-repeat opacity-10 bg-[url('https://images.unsplash.com/photo-1601370552761-d129028bd833?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdWR8ZW58MHx8MHx8fDA%3D')]"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <FlyingPlanes />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-11/12 md:w-2/3 lg:w-1/2 bg-gradient-to-r from-pink-400 via-purple-400 to-purple-500 rounded-2xl shadow-2xl p-8 relative backdrop-blur-md border border-white/20"
      >
        {/* Plane Icon */}
        <div className="flex justify-center mb-6">
          <FaPlaneDeparture className="text-white text-5xl animate-bounce" />
        </div>

        <h2 className="text-center text-3xl text-slate-50 font-extrabold mb-2">
          Adventure Awaits!
        </h2>
        <p className="text-center text-white/90 mb-8">
          Login to start planning your journey across skies, tracks, and roads
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 rounded-md border border-white/30 focus:ring-2 focus:ring-white/70 focus:outline-none shadow-inner bg-white/70 text-gray-900 placeholder-gray-500"
            />
            <span className="absolute left-3 top-3.5 text-purple-600">📧</span>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 rounded-md border border-white/30 focus:ring-2 focus:ring-white/70 focus:outline-none shadow-inner bg-white/70 text-gray-900 placeholder-gray-500"
            />
            <span className="absolute left-3 top-3.5 text-purple-600">🔒</span>
          </div>

          <div className="flex justify-between items-center text-sm text-white/90">
            <a className="text-white hover:underline cursor-pointer">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Let’s Go!
          </button>
        </form>

        <button
          type="button"
          onClick={() => login()}
          className="w-full mt-5 bg-blue-700 text-white py-2 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <p className="text-center text-md text-white/80 mt-6">
          First trip with us?{" "}
          <Link
            to="/signup"
            className="text-white font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
