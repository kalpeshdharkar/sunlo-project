import React from 'react';
import { useYouTube } from '../context/YouTubeContext';

const YouTubeView = () => {
  const { videos, setCurrentVideoId } = useYouTube();

  return (
    <div className="p-4 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">🎧 Trending YouTube Music</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((video, index) => {
          const videoId =
            video.id?.videoId || video.snippet?.resourceId?.videoId || video.id;

          if (!videoId || !video.snippet) return null;

          return (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setCurrentVideoId(videoId)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full"
              />
              <p className="p-2 text-sm font-medium truncate">
                {video.snippet.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubeView;
