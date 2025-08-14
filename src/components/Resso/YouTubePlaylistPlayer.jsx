import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlaylistPlayer = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      listType: 'playlist',
      list: 'PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI', // Replace with your own playlist ID
      autoplay: 0,
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <YouTube opts={opts} />
    </div>
  );
};

export default YouTubePlaylistPlayer;
