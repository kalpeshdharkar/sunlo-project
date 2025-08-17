import React, { useEffect } from 'react';
import { useYouTube } from 'context/YouTubeContext';
import { motion } from 'framer-motion';

const YouTubeView = () => {
  const { videos, trending, setCurrentVideoId } = useYouTube();

  useEffect(() => {
    if (videos.length === 0) {
      trending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos.length]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2">
      {videos.map((video, idx) => {
        const videoId = video.id?.videoId || video.id;
        const thumbnail = video.snippet?.thumbnails?.medium?.url;
        const title = video.snippet?.title;
        const channel = video.snippet?.channelTitle;

        return (
          <motion.div
            key={videoId || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentVideoId(videoId)}
            aria-label={`Play video: ${title}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentVideoId(videoId);
              }
            }}
          >
            <img
              src={thumbnail}
              alt={title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-2">
              <p className="text-sm font-semibold truncate">{title}</p>
              <p className="text-xs text-gray-400 truncate">{channel}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default YouTubeView;
