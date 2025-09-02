<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { useYouTube } from 'context/YouTubeContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import YouTube from 'react-youtube';
=======
// src/components/Resso/UnifiedPlayerBar.jsx
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useYouTube } from "context/YouTubeContext";
>>>>>>> 77c1d34 (First commit - Sunlo project v1)

const UnifiedPlayerBar = () => {
  const {
    currentVideoId,
    videos,
    isPlaying,
    setIsPlaying,
    nextVideo,
    prevVideo,
<<<<<<< HEAD
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
=======
    setCurrentVideoId,
  } = useYouTube();

  const currentVideo = videos.find(v => (v?.id?.videoId || v?.id) === currentVideoId);

  const playerRef = useRef(null);
  const safeRef = useRef(false); // indicates ready
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const [videoMode, setVideoMode] = useState(false);

  const opts = {
    height: videoMode ? "360" : "0",
    width: videoMode ? "640" : "0",
>>>>>>> 77c1d34 (First commit - Sunlo project v1)
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
      playsinline: 1,
<<<<<<< HEAD
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
=======
    },
  };

  // Apply mute/volume when player ready
  useEffect(() => {
    if (!playerRef.current || !safeRef.current) return;
    try {
      if (muted) playerRef.current.mute();
      else playerRef.current.unMute();
      // setVolume expects 0-100
      if (typeof playerRef.current.setVolume === "function") {
        playerRef.current.setVolume(Number(volume));
      }
    } catch (err) {
      console.warn("Player not ready to apply volume/mute:", err);
    }
  }, [muted, volume, currentVideoId]);

  // When currentVideoId changes, load it safely
  useEffect(() => {
    if (!playerRef.current || !safeRef.current) return;
    try {
      // prefer loadVideoById if available
      if (typeof playerRef.current.loadVideoById === "function") {
        playerRef.current.loadVideoById(currentVideoId);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Error loading video by id:", err);
    }
  }, [currentVideoId]);

  const onReady = (event) => {
    playerRef.current = event.target;
    safeRef.current = true;
    try {
      if (muted) playerRef.current.mute();
      else playerRef.current.unMute();
      if (typeof playerRef.current.setVolume === "function") playerRef.current.setVolume(Number(volume));
      playerRef.current.playVideo();
      setIsPlaying(true);
    } catch (err) {
      console.warn("onReady apply settings error:", err);
    }
  };

  const onStateChange = (event) => {
    // 0 = ended
    if (event?.data === window?.YT?.PlayerState?.ENDED) {
      nextVideo();
    }
  };

  const togglePlay = () => {
    if (!playerRef.current || !safeRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("togglePlay error:", err);
>>>>>>> 77c1d34 (First commit - Sunlo project v1)
    }
  };

  const toggleMute = () => {
<<<<<<< HEAD
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
=======
    setMuted(prev => !prev);
  };

  const onVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (v === 0) setMuted(true);
    else setMuted(false);
  };

  // safe fallback thumbnail
  const thumb =
    currentVideo?.snippet?.thumbnails?.medium?.url ||
    currentVideo?.snippet?.thumbnails?.default?.url ||
    "/favicon.ico";
>>>>>>> 77c1d34 (First commit - Sunlo project v1)

  if (!currentVideoId) return null;

  return (
    <>
<<<<<<< HEAD
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
=======
      <YouTube
        videoId={currentVideoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-3 flex items-center justify-between z-50 gap-4">
        {/* Song info */}
        <div className="flex items-center gap-3 w-1/2 min-w-0 overflow-hidden">
          <img src={thumb} alt={currentVideo?.snippet?.title || "Track"} className="w-14 h-14 rounded object-cover flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{currentVideo?.snippet?.title || "Unknown Title"}</p>
            <p className="text-gray-400 text-xs truncate">{currentVideo?.snippet?.channelTitle || ""}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5">
          <button onClick={prevVideo} aria-label="Prev" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <FaStepBackward className="w-5 h-5" />
          </button>

          <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg">
            {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
          </button>

          <button onClick={nextVideo} aria-label="Next" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <FaStepForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input type="range" min={0} max={100} value={muted ? 0 : volume} onChange={onVolumeChange} className="w-full cursor-pointer" />
        </div>

        {/* Video toggle */}
        <button onClick={() => setIsPlaying(prev=>prev)} className="text-sm text-purple-400 hover:text-purple-500 border border-purple-400 rounded px-3 py-1">
          {/* keep placeholder if you want to implement video-mode */}
          Audio Mode
>>>>>>> 77c1d34 (First commit - Sunlo project v1)
        </button>
      </div>
    </>
  );
};

export default UnifiedPlayerBar;
