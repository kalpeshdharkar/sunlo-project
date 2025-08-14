import axios from 'axios';

const YOUTUBE_API_KEY = 'AIzaSyBoiW6hToj0rtnSGm4QOIEuH59yeT_z_Bg'; // Replace with your API key

export const fetchTrendingVideos = async () => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 20,
        key: YOUTUBE_API_KEY,
      },
    }
  );
  return response.data.items;
};
