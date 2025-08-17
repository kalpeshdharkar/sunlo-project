import React, { useEffect, useRef } from 'react';
import { useYouTube } from '../context/YouTubeContext';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const YouTubePlayer = () => {
  const { currentVideoId, nextVideo, prevVideo, isPlaying, setIsPlaying } = useYouTube();
  const playerRef = useRef(null);

  // Hidden iframe opts (muted autoplay allowed)
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      playsinline: 1
    }
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    // Start muted to satisfy autoplay policy
    playerRef.current.mute();
    playerRef.current.playVideo();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      // Unmute + play on user action
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Media Session handlers — keep hook at top level, guard inside
  useEffect(() => {
    if (!currentVideoId) return;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('previoustrack', prevVideo);
      navigator.mediaSession.setActionHandler('nexttrack', nextVideo);
    }
    // no cleanup required for setActionHandler in most cases
  }, [currentVideoId, nextVideo, prevVideo, isPlaying]);

  // Safe to conditionally render AFTER hooks
  if (!currentVideoId) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 z-50">
      {/* Hidden YouTube Iframe */}
      <YouTube
        videoId={currentVideoId}
        opts={opts}
        onReady={onReady}
        iframeClassName="hidden"
        iframeProps={{ allow: 'autoplay' }}
      />

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
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <button
            onClick={nextVideo}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Current video label */}
        <p className="text-sm text-gray-300 truncate w-1/2">
          Playing: {currentVideoId}
        </p>
      </div>
    </div>
  );
};

export default YouTubePlayer;
