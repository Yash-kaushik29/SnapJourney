import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import FlyingPlanes from "../components/FlyingPlanes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState("form");
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpInputs = e.target.querySelectorAll("input[type='text']");
    const otp = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");

    if (otp.length < 4) {
      toast.error("Please enter the complete 4-digit OTP");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/user-signup`,
        { formData, otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Signup Successful! 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message + " ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Signup Failed. Please try again. ❌"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. ❌");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/send-otp`,
        { formData },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Otp sent! 🎉");
        setStep("otp");
      } else {
        toast.error(response.data.message + " ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Signup Failed. Please try again. ❌"
      );
    }
  };

  const signup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/google-signup`,
        { googleToken: tokenResponse.access_token },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Logged in successfully! 🎉");
        console.log(response.data)
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

      {/* Flying Planes */}
      <FlyingPlanes />

      {/* Main Card */}
      {step === "form" ? (
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
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full px-4 py-3 pl-10 rounded-md border border-white/30 focus:ring-2 focus:ring-white/70 focus:outline-none shadow-inner bg-white/70 text-gray-900 placeholder-gray-500"
              />
              <span className="absolute left-3 top-3.5 text-purple-600">
                📧
              </span>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-4 py-3 pl-10 rounded-md border border-white/30 focus:ring-2 focus:ring-white/70 focus:outline-none shadow-inner bg-white/70 text-gray-900 placeholder-gray-500"
              />
              <span className="absolute left-3 top-3.5 text-purple-600">
                📧
              </span>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full px-4 py-3 pl-10 rounded-md border border-white/30 focus:ring-2 focus:ring-white/70 focus:outline-none shadow-inner bg-white/70 text-gray-900 placeholder-gray-500"
              />
              <span className="absolute left-3 top-3.5 text-purple-600">
                🔒
              </span>
            </div>

            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="w-full px-4 py-3 pl-10 rounded-md border border-white/30 focus:ring-2 focus:ring-white/70 focus:outline-none shadow-inner bg-white/70 text-gray-900 placeholder-gray-500"
              />
              <span className="absolute left-3 top-3.5 text-purple-600">
                🔒
              </span>
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
            onClick={() => signup()}
            className="w-full mt-5 bg-blue-700 text-white py-2 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="text-center text-sm text-white/80 mt-6">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      ) : (
        <div className="z-10 max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the code sent to {formData.email.substring(0, 3)}
              ****@gmail.com.
            </p>
          </header>
          <form id="otp-form" onSubmit={verifyOtp}>
            <div className="flex items-center justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  pattern="[a-zA-Z0-9]*"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 1 && e.target.nextSibling) {
                      e.target.nextSibling.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      e.target.value === "" &&
                      e.target.previousSibling
                    ) {
                      e.target.previousSibling.focus();
                    }
                  }}
                />
              ))}
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                Verify Account
              </button>
            </div>
          </form>
          <div className="text-sm text-slate-500 mt-4">
            Didn't receive code?{" "}
            <span
              onClick={handleSubmit}
              className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer"
            >
              Resend
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
