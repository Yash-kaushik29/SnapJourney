import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import UserCard from "../components/UserCard";
import { ToastContainer } from "react-toastify";

export default function SearchFriends() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchQuery = "", page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/search/search-friends?query=${searchQuery}&page=${page}`
      );
      setUsers(data.users);
      setHasMore(page * 12 < data.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(query, page);
  }, [page, query]);

  const handleSearchClick = () => {
    setPage(1);
    setQuery(search.trim());
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-black dark:text-white dark:bg-gray-900 transition-colors duration-500"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')`,
      }}
    >
      <ToastContainer />
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content container */}
      <div className="relative z-10">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center py-16 px-6 min-h-[40vh]"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Find Your Travel Partner
          </h2>
          <p className="text-lg text-neutral-100 max-w-xl mx-auto">
            Search your friend by name or explore our top users who love to
            travel with Snap Journey.
          </p>

          {/* Search input with icon */}
          <div className="mt-6 flex justify-center items-center gap-2 w-full max-w-md mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="px-4 py-2 rounded-l-lg w-full text-black focus:outline-none"
            />
            <button
              onClick={handleSearchClick}
              className="bg-rose-600 hover:bg-rose-700 p-3 rounded-r-lg text-white"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </motion.div>

        {!loading && (
          <div className="px-6 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {users.length > 0 &&
                users.map((user, idx) => (
                  <UserCard user={user} />
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-white">{page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
