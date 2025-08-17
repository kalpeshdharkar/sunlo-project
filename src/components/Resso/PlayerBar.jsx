import React from 'react';
import { useYouTube } from 'context/YouTubeContext';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const PlayerBar = () => {
  const {
    currentVideoId,
    videos,
    isPlaying,
    setIsPlaying,
    nextVideo,
    prevVideo
  } = useYouTube();

  const currentVideo = videos.find(
    v => (v.id.videoId || v.id) === currentVideoId
  );

  if (!currentVideoId) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Actual play/pause handled in YouTubePlayer
  };

  return (
    <div
      className="fixed bottom-[72px] left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
      style={{ minHeight: 70 }}
      aria-label="Mini player controls"
    >
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-3 md:gap-0 w-full">
        {/* Song info */}
        <div className="flex items-center gap-3 w-full md:w-1/2 overflow-hidden">
          {currentVideo && (
            <img
              src={currentVideo.snippet?.thumbnails?.default?.url}
              alt={currentVideo.snippet?.title || 'Track Artwork'}
              className="w-14 h-14 rounded object-cover flex-shrink-0"
              style={{ minWidth: 48, minHeight: 48 }}
            />
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">
              {currentVideo?.snippet?.title || 'Unknown Title'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentVideo?.snippet?.channelTitle || ''}
            </p>
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevVideo}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-purple-400"
            aria-label="Previous track"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-purple-500 hover:bg-purple-600 focus:outline-purple-400"
            aria-label={isPlaying ? "Pause" : "Play"}
            style={{ minWidth: 48, minHeight: 48 }}
          >
            {isPlaying
              ? <Pause className="w-6 h-6" />
              : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={nextVideo}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-purple-400"
            aria-label="Next track"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
