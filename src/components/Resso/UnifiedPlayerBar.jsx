import React, { useState, useRef, useEffect } from 'react';
import { useYouTube } from 'context/YouTubeContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import YouTube from 'react-youtube';

const UnifiedPlayerBar = () => {
  const {
    currentVideoId,
    videos,
    isPlaying,
    setIsPlaying,
    nextVideo,
    prevVideo,
  } = useYouTube();

  const currentVideo = videos.find(
    v => (v.id.videoId || v.id) === currentVideoId
  );

  const playerRef = useRef(null);
  const [videoMode, setVideoMode] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(50);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
      playsinline: 1,
      mute: muted ? 1 : 0,
    },
  };

  useEffect(() => {
    if (!playerRef.current || !currentVideoId) return;
    if (muted) playerRef.current.mute();
    else playerRef.current.unMute();

    playerRef.current.setVolume(volume);
  }, [muted, volume, currentVideoId]);

  const onReady = (event) => {
    playerRef.current = event.target;
    if (muted) playerRef.current.mute();
    else playerRef.current.unMute();
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

  const toggleMute = () => {
    setMuted(!muted);
  };

  const onVolumeChange = (e) => {
    const vol = parseInt(e.target.value, 10);
    setVolume(vol);
    if (vol === 0) setMuted(true);
    else setMuted(false);
  };

  const toggleVideoMode = () => {
    setVideoMode(!videoMode);
  };

  if (!currentVideoId) return null;

  return (
    <>
      <YouTube videoId={currentVideoId} opts={opts} onReady={onReady} />

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-3 flex items-center justify-between z-50 gap-4 animate-fadeIn">
        <div className="flex items-center gap-3 w-1/2 min-w-0 overflow-hidden transform transition-transform duration-300 hover:scale-105">
          {currentVideo && (
            <img
              src={currentVideo.snippet?.thumbnails?.default?.url}
              alt={currentVideo.snippet?.title || 'Track Artwork'}
              className="w-14 h-14 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">
              {currentVideo?.snippet?.title || 'Unknown Title'}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {currentVideo?.snippet?.channelTitle || ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={prevVideo}
            aria-label="Previous"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transform hover:scale-110 transition-transform duration-200"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transform hover:scale-110 transition-transform duration-200 shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button
            onClick={nextVideo}
            aria-label="Next"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transform hover:scale-110 transition-transform duration-200"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 min-w-[120px]">
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transform hover:scale-110 transition-transform duration-200"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={onVolumeChange}
            aria-label="Volume"
            className="w-full cursor-pointer"
          />
        </div>

        <button
          onClick={toggleVideoMode}
          className="text-sm text-purple-400 hover:text-purple-500 border border-purple-400 rounded px-3 py-1 transform hover:scale-105 transition-transform duration-200"
          aria-label={`Switch to ${videoMode ? 'Audio' : 'Video'} Mode`}
        >
          {videoMode ? 'Audio Mode' : 'Video Mode'}
        </button>
      </div>
    </>
  );
};

export default UnifiedPlayerBar;
