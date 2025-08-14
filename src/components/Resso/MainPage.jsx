import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import PlaylistRow from './PlaylistRow';
import PlayerBar from './PlayerBar';
import YouTubePlayer from '../YouTube/YouTubePlayer';
import { useYouTube } from '../../context/YouTubeContext';
import YouTubeView from '../YouTube/YouTubeView';

const MainPage = () => {
  const { videos, trending } = useYouTube();

  // Fetch trending videos initially
  useEffect(() => {
    if (!videos.length) {
      trending();
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-950 text-white pb-40">
      {/* Header */}
      <header className="text-center text-3xl md:text-4xl font-bold py-4 text-purple-400">
        🎵 Sunlo - YouTube Music
      </header>

      {/* Search Bar */}
      <div className="flex justify-center my-4 px-4">
        <SearchBar />
      </div>

      {/* Playlists view */}
      <div className="px-2">
        <PlaylistRow title="Trending Now" items={videos} />
      </div>

      {/* Full YouTube grid view (optional section) */}
      <div className="px-2 mt-6">
        <YouTubeView />
      </div>

      {/* Bottom Controls */}
      <PlayerBar />
      <YouTubePlayer />
    </div>
  );
};

export default MainPage;
