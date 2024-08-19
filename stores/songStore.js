// src/stores/songStore.js

import { create } from "zustand";
import { Audio } from "expo-av";
import { getRecommendations } from "../services/apiController"; // hypothetical API methods

export const useSongStore = create((set, get) => ({
  songs: [],

  currentSongIndex: -1,
  isPlaying: false,
  playbackInstance: null,
  status: null,

  playSong: async (songId, context = "default", playlistId = null) => {
    const { playbackInstance, songs } = get();

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
      }

      let updatedSongs = songs;
      // if (context === "playlist" && playlistId) {
      //   updatedSongs = await getPlaylistItems(playlistId);
      // } else
      if (context === "recommendation") {
        updatedSongs = [];
        const recommendations = await getRecommendations(songId);
        updatedSongs.push(
          recommendations.previous,
          recommendations.current,
          recommendations.next
        );
      }

      const songIndex = updatedSongs.findIndex((song) => song.id === songId);

      const { sound, status } = await Audio.Sound.createAsync(
        updatedSongs[songIndex].url,
        {
          shouldPlay: true,
        }
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          const { currentSongIndex, context } = get();
          const nextIndex = currentSongIndex + 1;

          if (context === "playlist") {
            get().playSong(updatedSongs[nextIndex].id, "playlist", playlistId);
          } else if (context === "recommendation") {
            if (nextIndex >= updatedSongs.length) {
              get().addRecommendation("right");
            } else {
              get().playSong(updatedSongs[nextIndex].id, "recommendation");
            }
          }
        }
      });

      set({
        playbackInstance: sound,
        currentSongIndex: songIndex,
        isPlaying: true,
        songs: updatedSongs,
        context,
      });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  },

  addRecommendation: async (side = "right") => {
    const { songs, currentSongIndex } = get();
    const currentSong = songs[currentSongIndex];
    const recommendations = await getRecommendations(currentSong.id);

    if (side === "right") {
      songs.push(recommendations.next);
    } else {
      songs.unshift(recommendations.previous);
      set({ currentSongIndex: currentSongIndex + 1 });
    }

    if (songs.length > 100) {
      const trimmedSongs = [
        songs[currentSongIndex - 1],
        songs[currentSongIndex],
        songs[currentSongIndex + 1],
      ];
      set({ songs: trimmedSongs, currentSongIndex: 1 });
    } else {
      set({ songs });
    }
  },

  nextSong: () => {
    const { currentSongIndex, songs, playSong, context } = get();
    const nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs.length && context === "recommendation") {
      get().addRecommendation("right");
    } else {
      playSong(songs[nextIndex].id, context);
    }
  },

  previousSong: () => {
    const { currentSongIndex, songs, playSong, context } = get();
    const prevIndex = currentSongIndex - 1;
    if (prevIndex < 0 && context === "recommendation") {
      get().addRecommendation("left");
    } else {
      playSong(songs[prevIndex].id, context);
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

  setStatus: (status) => set({ status }),
}));
