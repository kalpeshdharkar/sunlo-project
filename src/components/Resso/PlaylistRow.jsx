import React from 'react';
import { useYouTube } from '../../context/YouTubeContext';
import { motion } from 'framer-motion';

const PlaylistRow = ({ title, items }) => {
  const { setCurrentVideoId } = useYouTube();

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Row Title */}
      <h2 className="text-xl font-bold mb-3 px-2 text-purple-400">{title}</h2>

      {/* Horizontal Scroll List */}
      <div className="flex overflow-x-auto space-x-4 px-2 scrollbar-hide">
        {items.map((video, idx) => {
          const videoId = video.id?.videoId || video.id;
          const thumb = video.snippet?.thumbnails?.medium?.url;
          const vTitle = video.snippet?.title;
          const channel = video.snippet?.channelTitle;

          return (
            <motion.div
              key={videoId || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="min-w-[150px] bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setCurrentVideoId(videoId)}
            >
              <img
                src={thumb}
                alt={vTitle}
                className="w-full aspect-video object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-semibold truncate">{vTitle}</p>
                <p className="text-xs text-gray-400 truncate">{channel}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistRow;
