// src/stores/songStore.js

import { create } from "zustand";
import { Audio } from "expo-av";
import { getRecommendationForSong } from "../services/apiController"; // hypothetical API methods

export const useSongStore = create((set, get) => ({
  songs: [],

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
        songs[index].url,
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

  addSong: (song) => {
    const { songs } = get();
    const updatedSongs = [...songs, song];

    set({ songs: updatedSongs }, () => {});
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
