// src/components/Resso/Navbar.jsx

import React from 'react';
import { Music, Search, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ showBackButton = false, onBackClick }) => {
  return (
    <motion.div
      className="flex justify-between items-center px-4 py-3 bg-gray-900 shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
            onClick={onBackClick}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.div>
        )}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold text-pink-500"
        >
          Sunlo 🎵
        </motion.div>
      </div>

      <div className="flex space-x-4 text-white">
        {[Search, Music, User].map((Icon, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Navbar;
