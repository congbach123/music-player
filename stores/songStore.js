// src/stores/songStore.js

import { create } from "zustand";
import { Audio } from "expo-av";
import { getRecommendationForSong } from "../services/apiController"; // hypothetical API methods

export const useSongStore = create((set, get) => ({
  songs: [
    // {
    //   id: 1,
    //   name: "LẦN CUỐI (đi bên em xót xa người ơi)",
    //   artist: "Ngọt",
    //   image: "https://i.scdn.co/image/ab6761610000e5eb66e0a040a53996e8bf19f9b5",
    //   url: require("../assets/songs/song-1.mp3"),
    // },
    // {
    //   id: 2,
    //   name: "Vùng Kí Ức",
    //   artist: "Chillies",
    //   image: "https://i.scdn.co/image/ab6761610000e5ebae678a70cd3899b2167026ea",
    //   url: require("../assets/songs/song-2.mp3"),
    // },
    // {
    //   id: 3,
    //   name: "Anh Đã Ổn Hơn",
    //   artist: "MCK",
    //   image: "https://i.scdn.co/image/ab6761610000e5ebb97791c136d7354ad7792555",
    //   url: require("../assets/songs/song-3.mp3"),
    // },
  ],

  currentSongIndex: -1,
  isPlaying: false,
  playbackInstance: null,
  status: null,

  playSong: async (index) => {
    const { songs, playbackInstance } = get();

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
      }

      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: songs[index].preview_url,
        },
        {
          shouldPlay: true,
        }
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        console.log("this runs");
        if (status.didJustFinish) {
          const nextIndex =
            currentSongIndex + 1 >= songs.length ? 0 : currentSongIndex + 1;
          playSong(nextIndex);
          console.log("this runs2");
        }
      });

      set({
        playbackInstance: sound,
        currentSongIndex: index,
        isPlaying: true,
      });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  },

  addSong: (newSong) => {
    set((state) => ({
      songs: [...state.songs, newSong],
    }));
  },

  pauseSong: async () => {
    const { playbackInstance } = get();
    if (playbackInstance) {
      await playbackInstance.pauseAsync();
      set({ isPlaying: false });
    }
  },

  resumeSong: async () => {
    const { playbackInstance } = get();
    if (playbackInstance) {
      await playbackInstance.playAsync();
      set({ isPlaying: true });
    }
  },

  stopSong: async () => {
    const { playbackInstance } = get();
    if (playbackInstance) {
      await playbackInstance.stopAsync();
      await playbackInstance.unloadAsync();
      set({ playbackInstance: null, currentSongIndex: -1, isPlaying: false });
    }
  },
  nextSong: () => {
    const { currentSongIndex, songs, playSong } = get();
    const nextIndex =
      currentSongIndex + 1 >= songs.length ? 0 : currentSongIndex + 1;
    playSong(nextIndex);
  },

  previousSong: () => {
    const { currentSongIndex, songs, playSong } = get();
    const prevIndex =
      currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
    playSong(prevIndex);
  },
  getCurrentSong: () => {
    const { currentSongIndex, songs } = get();
    return currentSongIndex !== -1 ? songs[currentSongIndex] : null;
  },
  setStatus: (status) => set({ status }),
}));
