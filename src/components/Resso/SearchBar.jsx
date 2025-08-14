import React, { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { YouTubeContext } from '../../context/YouTubeContext';

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const { searchVideos } = useContext(YouTubeContext);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    searchVideos(value); // ✅ actually search YouTube
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition duration-300"
      >
        <Search className="text-white" />
      </button>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search songs..."
        className={`absolute top-0 left-12 transition-all duration-500 bg-white text-black px-4 py-2 rounded-full shadow-md w-0 ${
          open ? 'w-64 opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 10 }}
      />
    </div>
  );
};

export default SearchBar;
