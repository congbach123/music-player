import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const fetchProfile = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchRecentlyPlayedTracks = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=6",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getTopArtists = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getFeaturedPlaylists = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.playlists.items;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getRecommendations = async (recentlyPlayedTracks) => {
  try {
    const accessToken = await getAccessToken();
    const artistIds = [
      ...new Set(
        recentlyPlayedTracks.flatMap((item) =>
          item.track.artists.map((artist) => artist.id)
        )
      ),
    ];
    if (artistIds.length === 0) return [];

    const shuffledArtistIds = artistIds.sort(() => 0.5 - Math.random());

    const seedArtists = shuffledArtistIds.slice(0, 5);

    const response = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          seed_artists: seedArtists.join(","),
          limit: 10,
          target_popularity: 70,
        },
      }
    );
    return response.data.tracks;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
