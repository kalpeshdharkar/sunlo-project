import React from 'react';
import YouTubeView from './YouTubeView';
import YouTubePlayer from './YouTubePlayer';

const MainPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-950 text-white p-4">
      <header className="text-center text-4xl font-bold py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-pulse">
        🎵 Sunlo - YouTube Music
      </header>

      {/* Search + Playlist Grid */}
      <YouTubeView />

      {/* Floating YouTube Player */}
      <YouTubePlayer />
    </div>
  );
};

export default MainPage;
