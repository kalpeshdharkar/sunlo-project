import React, { useEffect, useRef, useState } from 'react';
import { useYouTube } from 'context/YouTubeContext';
import YouTube from 'react-youtube';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const YouTubePlayer = () => {
  const { currentVideoId, nextVideo, prevVideo, isPlaying, setIsPlaying } = useYouTube();
  const playerRef = useRef(null);
  const [videoMode, setVideoMode] = useState(false); // toggle audio/video mode

  const opts = {
    height: videoMode ? '240' : '1', // 1px instead of 0 to prevent iframe API issue
    width: videoMode ? '426' : '1',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: videoMode ? 1 : 0,
      playsinline: 1,
      mute: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.mute();  // mute for autoplay policy
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
    if (!currentVideoId) return;
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('previoustrack', prevVideo);
      navigator.mediaSession.setActionHandler('nexttrack', nextVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentVideoId]);

  if (!currentVideoId) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-2 z-50">
      {/* Audio/Video Mode Toggle */}
      <div className="flex justify-end mb-2 px-2">
        <button
          onClick={() => setVideoMode(!videoMode)}
          className="text-sm text-purple-400 hover:text-purple-500 border border-purple-400 rounded px-3 py-1"
          aria-label={`Switch to ${videoMode ? 'Audio' : 'Video'} Mode`}
        >
          {videoMode ? 'Audio Mode' : 'Video Mode'}
        </button>
      </div>
      
      {/* YouTube iframe */}
      <div className={`overflow-hidden transition-all duration-300 ${videoMode ? 'h-[240px] w-full' : 'h-1 w-1'}`}>
        <YouTube videoId={currentVideoId} opts={opts} onReady={onReady} />
      </div>
      
      {/* Mini Player Controls */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <button onClick={prevVideo} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700" aria-label="Previous track">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={togglePlay} className="p-3 rounded-full bg-purple-500 hover:bg-purple-600" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (<Pause className="w-5 h-5" />) : (<Play className="w-5 h-5" />)}
          </button>
          <button onClick={nextVideo} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700" aria-label="Next track">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-300 truncate w-1/2">Playing ID: {currentVideoId}</p>
      </div>
    </div>
  );
};

export default YouTubePlayer;
