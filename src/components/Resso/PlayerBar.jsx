import React from 'react';
import { useYouTube } from '../../context/YouTubeContext';
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

  // Find details of the current video for artwork/title
  const currentVideo = videos.find(v =>
    (v.id.videoId || v.id) === currentVideoId
  );

  if (!currentVideoId) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // YouTube actual play/pause handled inside YouTubePlayer component
  };

  return (
    <div className="fixed bottom-[72px] left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Song info */}
        <div className="flex items-center gap-3 w-1/2 overflow-hidden">
          {currentVideo && (
            <img
              src={currentVideo.snippet?.thumbnails?.default?.url}
              alt={currentVideo.snippet?.title}
              className="w-12 h-12 rounded object-cover flex-shrink-0"
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
        <div className="flex items-center gap-3">
          <button
            onClick={prevVideo}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-purple-500 hover:bg-purple-600"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={nextVideo}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
