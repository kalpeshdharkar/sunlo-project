import React, { useEffect, useRef } from 'react';
import { useYouTube } from 'context/YouTubeContext';

// Make sure iframe API loads once
const loadYouTubeAPI = () => {
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
};

const YouTubePlayer = () => {
  const { currentVideoId, isPlaying, setIsPlaying, nextVideo } = useYouTube();
  const playerRef = useRef(null);
  const ytPlayer = useRef(null);

  useEffect(() => {
    loadYouTubeAPI();

    window.onYouTubeIframeAPIReady = () => {
      ytPlayer.current = new window.YT.Player(playerRef.current, {
        height: '0', // hidden player
        width: '0',
        videoId: currentVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
        },
        events: {
          onReady: (event) => {
            if (isPlaying) event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              nextVideo();
            }
          },
        },
      });
    };
  }, []);

  // Sync play/pause
  useEffect(() => {
    if (!ytPlayer.current) return;
    if (isPlaying) {
      ytPlayer.current.playVideo();
    } else {
      ytPlayer.current.pauseVideo();
    }
  }, [isPlaying]);

  // Load new video when currentVideoId changes
  useEffect(() => {
    if (!ytPlayer.current || !currentVideoId) return;
    ytPlayer.current.loadVideoById(currentVideoId);
    if (isPlaying) {
      ytPlayer.current.playVideo();
    }
  }, [currentVideoId]);

  return (
    <div style={{ display: 'none' }}>
      <div ref={playerRef} />
    </div>
  );
};

export default YouTubePlayer;
