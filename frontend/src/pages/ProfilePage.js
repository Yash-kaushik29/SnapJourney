import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("Viyom Paliwal");
  const [email, setEmail] = useState("viyom@example.com");
  const username = "viyomog";
  const followers = 342;
  const following = 198;
  const trips = 24;

  if (!user) {
    toast.error("Please login first!");
  }

  useEffect(() => {
    const fetchUserInfo = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/user-info`, {withCredentials: true});

        console.log(data)
    }

    fetchUserInfo();
  })

  const latestTrips = [
    { title: "Manali Adventure", date: "May 2025", image: "/trip1.jpg" },
    { title: "Desert Safari", date: "April 2025", image: "/trip2.jpg" },
    { title: "Goa Beaches", date: "March 2025", image: "/trip3.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <ToastContainer />
      <Navbar />

      {/* Cover Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1651046894888-f886e9258b6f?q=80&w=1744&auto=format&fit=crop"
          alt="cover"
          className="w-full h-56 object-cover"
        />
        <button className="absolute top-4 right-4 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded">
          Edit
        </button>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative -mt-16 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        {/* Profile Pic */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-rose-600 p-1 rounded-full cursor-pointer">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v11.586A1.5 1.5 0 003.5 18h11a1.5 1.5 0 001.5-1.5V10l-6-6H4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Name, Username, Role */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-gray-500">@{username}</p>
          <p className="text-sm mt-1">Explorer & Creator</p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-10 mt-6 text-center">
          <div>
            <p className="font-bold text-xl">{trips}</p>
            <p className="text-sm text-gray-500">Trips</p>
          </div>
          <div>
            <p className="font-bold text-xl">{followers}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-bold text-xl">{following}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>

        {/* Editable Info */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-md">
            Save Changes
          </button>
        </div>

        {/* About Me */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            About Me
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            I’m passionate about exploring the world and capturing beautiful
            stories through journeys. SnapJourney is where I share it all.
          </p>
        </div>

        {/* Latest Trips */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Latest Trips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latestTrips.map((trip, idx) => (
              <div
                key={idx}
                className="bg-rose-50 dark:bg-gray-700 p-4 rounded-lg shadow"
              >
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-28 w-full object-cover rounded-md mb-2"
                />
                <h4 className="font-semibold text-sm">{trip.title}</h4>
                <p className="text-xs text-gray-500">{trip.date}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
