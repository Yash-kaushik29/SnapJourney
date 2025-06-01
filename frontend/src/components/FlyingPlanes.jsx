import React from 'react'
import { FaPlane } from "react-icons/fa6";
import { motion } from "framer-motion";

const generateFlightPath = () => {
  const type = Math.floor(Math.random() * 3); // 0 = straight, 1 = takeoff, 2 = landing
  const delay = Math.random() * 5;
  const duration = 10 + Math.random() * 5;
  const top = Math.random() * 80;
  const left = Math.random() * 20;
  const size = 18 + Math.random() * 12;

  let animation = {};

  switch (type) {
    case 1: // Takeoff
      animation = {
        initial: { x: "-10vw", y: "20vh", rotate: -25 },
        animate: { x: "110vw", y: "-20vh", rotate: -25 },
      };
      break;
    case 2: // Landing
      animation = {
        initial: { x: "-10vw", y: "-20vh", rotate: 25 },
        animate: { x: "110vw", y: "30vh", rotate: 25 },
      };
      break;
    default: // Horizontal
      animation = {
        initial: { x: "-10vw", y: "0vh", rotate: 0 },
        animate: { x: "110vw", y: "0vh", rotate: 0 },
      };
  }

  return {
    transition: { repeat: Infinity, duration, delay, ease: "linear" },
    style: {
      top: `${top}%`,
      left: `${left}%`,
      fontSize: `${size}px`,
    },
    animation,
  };
};

const FlyingPlanes = () => {
  const planes = Array.from({ length: 6 });

  return planes.map((_, index) => {
    const { animation, transition, style } = generateFlightPath();

    return (
      <motion.div
        key={index}
        initial={animation.initial}
        animate={animation.animate}
        transition={transition}
        style={style}
        className="absolute text-white opacity-80"
      >
        <FaPlane className="text-blue-700" />
      </motion.div>
    );
  });
};

export default FlyingPlanes