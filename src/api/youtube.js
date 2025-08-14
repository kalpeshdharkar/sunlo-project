// src/api/youtube.js

const API_KEY = "AIzaSyBoiW6hToj0rtnSGm4QOIEuH59yeT_z_Bg"; // 🔁 Replace this with your actual API Key
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Fetch trending videos
export async function fetchTrendingVideos(regionCode = "IN", maxResults = 20) {
  const res = await fetch(
    `${BASE_URL}/videos?part=snippet&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items || [];
}

// Search for videos
export async function searchVideos(query, maxResults = 20) {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&type=video&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items || [];
}

// Fetch items from a playlist
export async function fetchPlaylistItems(playlistId, maxResults = 20) {
  const res = await fetch(
    `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items || [];
}
