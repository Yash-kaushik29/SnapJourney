import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const topUsers = [
  'Aarav Sharma',
  'Isha Patel',
  'Kabir Mehta',
  'Riya Kapoor',
  'Vivaan Joshi',
  'Anaya Singh',
  'Arjun Nair',
  'Saanvi Desai'
];

export default function SearchFriends() {
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(true);
  const [username] = useState('Viyom');

  const filteredUsers = search
    ? topUsers.filter(user =>
        user.toLowerCase().includes(search.toLowerCase())
      )
    : topUsers;

  return (
    <div className={dark ? 'dark' : ''}>
      <div
        className="min-h-screen bg-cover bg-center text-black dark:text-white dark:bg-gray-900 transition-colors duration-500"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')` }}
      >
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 shadow-md">
          <h1 className="text-2xl font-bold">Snap Journey</h1>
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">FAQ</li>
            <li className="hover:underline cursor-pointer">Journeys</li>
            <li className="hover:underline cursor-pointer">Your Memories</li>
          </ul>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold uppercase">
              {username[0]}
            </div>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center py-16 px-6 bg-black bg-opacity-60"
        >
          <h2 className="text-4xl font-extrabold mb-4">Find Your Travel Partner</h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Search your friend by name or explore our top users who love to travel with Snap Journey.
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="mt-6 px-4 py-2 rounded-lg w-full max-w-md text-black"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16 bg-black bg-opacity-60"
        >
          {filteredUsers.map((user, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold">{user}</h3>
              <p className="text-gray-600 dark:text-gray-400">Top Traveler</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
