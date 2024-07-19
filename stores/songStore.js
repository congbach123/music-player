// src/stores/songStore.js

import { create } from "zustand";
import { Audio } from "expo-av";

export const useSongStore = create((set, get) => ({
  songs: [
    {
      id: 1,
      name: "Song 1",
      artist: "Artist 1",
      image: "https://i.scdn.co/image/ab6761610000e5eb66e0a040a53996e8bf19f9b5",
      url: require("../assets/songs/song-1.mp3"),
    },
    {
      id: 2,
      name: "Song 2",
      artist: "Artist 2",
      image: "https://i.scdn.co/image/ab6761610000e5ebae678a70cd3899b2167026ea",
      url: require("../assets/songs/song-1.mp3"),
    },
    {
      id: 3,
      name: "Song 3",
      artist: "Artist 3",
      image: "https://i.scdn.co/image/ab6761610000e5ebb97791c136d7354ad7792555",
      url: require("../assets/songs/song-1.mp3"),
    },
  ],

  currentSongIndex: -1,
  isPlaying: false,
  playbackInstance: null,

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
        if (status.didJustFinish) {
          const nextIndex = index + 1;
          if (nextIndex < songs.length) {
            set({ currentSongIndex: nextIndex });
            get().playSong(nextIndex);
          } else {
            set({ currentSongIndex: -1, isPlaying: false });
          }
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

  getCurrentSong: () => {
    const { currentSongIndex, songs } = get();
    return currentSongIndex !== -1 ? songs[currentSongIndex] : null;
  },
}));
