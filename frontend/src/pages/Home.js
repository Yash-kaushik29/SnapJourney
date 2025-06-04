import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PopularCities from "../components/PopularCities";

const images = [
  { src: "/trip1.jpg", alt: "Trip 1", span: "row-span-2", full: true },
  { src: "/trip2.jpg", alt: "Trip 2", height: "h-48" },
  { src: "/trip6.jpg", alt: "Trip 6", height: "h-48" },
  { src: "/trip4.jpg", alt: "Trip 4", height: "h-48" },
  { src: "/trip5.jpg", alt: "Trip 5", span: "row-span-2", full: true },
  { src: "/trip3.jpg", alt: "Trip 3", span: "col-span-2", height: "h-60" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/main-img.jpg"
          alt="Home Background"
          className="w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-black/30">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Explore Together, Plan Smarter
          </h1>
          <p className="mt-4 text-md md:text-xl text-gray-100 max-w-2xl drop-shadow-md">
            <span className="text-rose-500 text-lg md:text-2xl font-semibold">SnapJourney</span> helps you organize your trips with friends, discover
            places, and create unforgettable journeys – all in one place.
          </p>

          {!user && (
            <Link
              to="/login"
              className="mt-6 px-6 py-3 bg-rose-500 text-white font-medium rounded-lg hover:bg-rose-600 transition"
            >
              Get Started
            </Link>
          )}

          {user && (
            <Link
              to="/plan"
              className="mt-6 px-6 py-3 bg-rose-500 text-white font-medium rounded-lg hover:bg-rose-600 transition"
            >
              Plan a Journey
            </Link>
          )}
        </div>
      </div>

      {/* Discover Memories Section */}
      <section className="py-12 px-2 sm:px-4 bg-slate-200 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-rose-600 dark:text-rose-400 mb-8">
          Discover Memories from Real Journeys
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {images.map(
            ({ src, alt, span = "", height = "", full = false }, index) => (
              <motion.div key={index} variants={item} className={`${span}`}>
                <img
                  src={src}
                  alt={alt}
                  className={`w-full ${
                    full ? "h-full" : height
                  } object-cover rounded-xl shadow-md hover:scale-105 transition`}
                />
              </motion.div>
            )
          )}
        </motion.div>
      </section>

      {/* Popular Cities */}
      <PopularCities />
    </>
  );
};

export default Home;
