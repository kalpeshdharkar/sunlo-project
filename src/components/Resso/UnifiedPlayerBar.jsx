import React, { useEffect, useRef, useState, useMemo } from "react";
import YouTube from "react-youtube";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useYouTube } from "context/YouTubeContext";

const UnifiedPlayerBar = () => {
  const playerRef = useRef(null);
  const safeRef = useRef(false);

  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const opts = useMemo(() => ({
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
      playsinline: 1,
    },
  }), []);

  const { currentVideoId, videos, isPlaying, setIsPlaying, nextVideo, prevVideo, hasUserSelectedVideo } = useYouTube();
  const currentVideo = videos.find(v => (v?.id?.videoId || v?.id) === currentVideoId);

  // -------------------- Hooks --------------------
  useEffect(() => {
    if (!playerRef.current) return;
    muted ? playerRef.current.mute() : playerRef.current.unMute();
    if (typeof playerRef.current.setVolume === "function") playerRef.current.setVolume(Number(volume));
  }, [muted, volume]);

  useEffect(() => {
    if (!playerRef.current || !safeRef.current) return;
    try {
      playerRef.current.loadVideoById(currentVideoId);
      playerRef.current.playVideo();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Load video error:", err);
    }
  }, [currentVideoId, setIsPlaying]);

  useEffect(() => {
    if (!playerRef.current || !safeRef.current) return;
    const interval = setInterval(() => {
      try {
        setCurrentTime(playerRef.current.getCurrentTime());
      } catch {}
    }, 500);
    return () => clearInterval(interval);
  }, [currentVideoId]);
  // ------------------------------------------------

  if (!hasUserSelectedVideo || !currentVideoId || !currentVideo || !currentVideo.snippet) return null;

  const onReady = (event) => {
    playerRef.current = event.target;
    safeRef.current = true;
    try {
      playerRef.current.unMute();
      playerRef.current.setVolume?.(Number(volume));
      setDuration(playerRef.current.getDuration());
      playerRef.current.playVideo();
      setIsPlaying(true);
      setMuted(false);
    } catch (err) {
      console.warn("onReady error:", err);
    }
  };

  const onStateChange = (event) => {
    if (event?.data === window?.YT?.PlayerState?.ENDED) nextVideo();
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
    }
  };

  const toggleMute = () => setMuted(prev => !prev);
  const onVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    setMuted(v === 0);
  };

  const handleSeek = (e) => {
    if (!playerRef.current || !safeRef.current) return;
    const seekTo = Number(e.target.value);
    playerRef.current.seekTo(seekTo, true);
    setCurrentTime(seekTo);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const thumb =
    currentVideo.snippet?.thumbnails?.medium?.url ||
    currentVideo.snippet?.thumbnails?.default?.url ||
    "/favicon.ico";

  return (
    <>
      <YouTube videoId={currentVideoId} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-3 flex items-center gap-4 z-50">
        {/* Thumbnail and title */}
        <div className="flex items-center gap-3 w-1/3 min-w-0 overflow-hidden">
          <img src={thumb} alt={currentVideo.snippet?.title || "Track"} className="w-14 h-14 rounded object-cover flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{currentVideo.snippet?.title || "Unknown Title"}</p>
            <p className="text-gray-400 text-xs truncate">{currentVideo.snippet?.channelTitle || ""}</p>
          </div>
        </div>

        {/* Current time */}
        <span className="text-xs text-white w-12 tabular-nums">{formatTime(currentTime)}</span>

        {/* Progress slider */}
        <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} className="flex-grow cursor-pointer" aria-label="Seek slider" />

        {/* Total duration */}
        <span className="text-xs text-white w-12 tabular-nums">{formatTime(duration)}</span>

        {/* Controls */}
        <div className="flex items-center gap-5">
          <button onClick={prevVideo} aria-label="Previous" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"><FaStepBackward className="w-5 h-5" /></button>
          <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg">{isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}</button>
          <button onClick={nextVideo} aria-label="Next" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"><FaStepForward className="w-5 h-5" /></button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">{muted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
          <input type="range" min={0} max={100} value={muted ? 0 : volume} onChange={onVolumeChange} className="w-full cursor-pointer" aria-label="Volume slider" />
        </div>
      </div>
    </>
  );
};

export default UnifiedPlayerBar;
