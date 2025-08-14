import React, { useEffect, useRef } from 'react';
import { useYouTube } from '../context/YouTubeContext';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const YouTubePlayer = () => {
  const { currentVideoId, nextVideo, prevVideo, isPlaying, setIsPlaying } = useYouTube();
  const playerRef = useRef(null);

  if (!currentVideoId) return null;

  const opts = {
    height: '0', // Audio-only hidden
    width: '0',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.playVideo();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Basic Media Session for lock screen
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        prevVideo();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        nextVideo();
      });
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800">
      {/* Hidden YouTube Iframe */}
      <YouTube videoId={currentVideoId} opts={opts} onReady={onReady} />

      {/* Mini Player UI */}
      <div className="flex items-center justify-between px-4 py-3">
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

        {/* Current video title */}
        <p className="text-sm text-gray-300 truncate w-1/2">
          Playing ID: {currentVideoId}
        </p>
      </div>
    </div>
  );
};

export default YouTubePlayer;
