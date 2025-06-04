import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-10 px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-purple-400 drop-shadow-lg">
          SnapJourney
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          {user && (
            <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white font-semibold drop-shadow">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white drop-shadow"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline transition"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline transition"
          >
            Contact
          </Link>
          <Link
            to="/faqs"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline transition"
          >
            FAQs
          </Link>
          <Link
            to="/find-friends"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline transition"
          >
            Find Mates
          </Link>

          <DarkModeToggle />

          {!user ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-1.5 rounded-lg font-medium transition text-center drop-shadow"
            >
              Login
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white text-lg font-semibold drop-shadow">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 px-2 mt-3">
          <Link
            to="/"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline"
          >
            Contact
          </Link>
          <Link
            to="/faqs"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline"
          >
            FAQs
          </Link>
          <Link
            to="/find-friends"
            className="text-white drop-shadow font-semibold text-lg hover:text-rose-500 hover:underline transition"
          >
            Find Mates
          </Link>

          {!user && (
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-4 py-1.5 rounded-lg font-medium transition text-center drop-shadow"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
