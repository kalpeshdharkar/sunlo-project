import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const YouTubeContext = createContext();

export const useYouTube = () => useContext(YouTubeContext);

export const YouTubeProvider = ({ children }) => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';

  const [videos, setVideos] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserSelectedVideo, setHasUserSelectedVideo] = useState(false); // New flag

  const searchVideos = async (query) => {
    if (!query) return;
    try {
      const res = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          maxResults: 20,
          q: query,
          key: API_KEY,
          type: 'video',
          videoCategoryId: 10,
        },
      });
      setVideos(res.data.items);
      setQueue(res.data.items.map((v) => v.id.videoId));
      setCurrentIndex(0);
      // Do not auto-set currentVideoId on search, keep player hidden until user selects video
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const trending = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'IN',
          videoCategoryId: 10,
          key: API_KEY,
        },
      });
      setVideos(res.data.items);
      setQueue(res.data.items.map((v) => v.id));
      setCurrentIndex(0);
      // Do not auto-set currentVideoId on trending fetch
    } catch (error) {
      console.error('Trending fetch error:', error);
    }
  };

  const playVideoById = (videoId) => {
    const index = queue.indexOf(videoId);
    if (index !== -1) setCurrentIndex(index);
    setCurrentVideoId(videoId);
    setIsPlaying(true);
    setHasUserSelectedVideo(true); // Mark as user has selected video
  };

  const nextVideo = () => {
    if (queue.length === 0) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    setCurrentVideoId(queue[nextIndex]);
    setIsPlaying(true);
    setHasUserSelectedVideo(true);
  };

  const prevVideo = () => {
    if (queue.length === 0) return;
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(prevIndex);
    setCurrentVideoId(queue[prevIndex]);
    setIsPlaying(true);
    setHasUserSelectedVideo(true);
  };

  const value = {
    videos,
    currentVideoId,
    isPlaying,
    setIsPlaying,
    searchVideos,
    trending,
    setCurrentVideoId: playVideoById,
    nextVideo,
    prevVideo,
    hasUserSelectedVideo,
  };

  return <YouTubeContext.Provider value={value}>{children}</YouTubeContext.Provider>;
};
