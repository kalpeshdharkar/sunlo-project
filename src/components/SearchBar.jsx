import React, { useState } from 'react';
import { Search } from 'lucide-react'; // icon
import { useYouTube } from '../context/YouTubeContext';

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { searchVideos } = useYouTube();

  const handleChange = (e) => {
    setQuery(e.target.value);
    searchVideos(e.target.value);
  };

  return (
    <div className="relative flex justify-center my-4">
      <button onClick={() => setOpen(!open)} className="bg-purple-600 p-2 rounded-full">
        <Search className="text-white" />
      </button>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search music..."
        className={`absolute top-0 left-12 transition-all duration-300 bg-white text-black px-4 py-2 rounded-full ${
          open ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
      />
    </div>
  );
};

export default SearchBar;
