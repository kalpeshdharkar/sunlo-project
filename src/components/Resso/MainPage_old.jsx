import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PlaylistRow from './PlaylistRow';
import PlayerBar from './PlayerBar';

const MainPage = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="px-4 mt-4 space-y-6">
        <SearchBar />
        <CategoryFilter />
        <PlaylistRow title="Made for You" />
        <PlaylistRow title="Trending Now" />
      </div>
      <PlayerBar />
    </div>
  );
};

export default MainPage;
