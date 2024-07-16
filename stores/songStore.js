import { create } from "zustand";
//import TrackPlayer, { Capability } from "react-native-track-player";
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

  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  removeSong: (id) =>
    set((state) => ({ songs: state.songs.filter((song) => song.id !== id) })),

  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),
  playSong: async (song) => {
    try {
      const { sound } = await Audio.Sound.createAsync(song.url);
      await sound.playAsync();
      set({ currentSong: { ...song, sound } });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  },

  stopSong: async () => {
    try {
      const { currentSong } = get();
      if (currentSong && currentSong.sound) {
        await currentSong.sound.stopAsync();
        await currentSong.sound.unloadAsync();
      }
      set({ currentSong: null });
    } catch (error) {
      console.error("Error stopping song:", error);
    }
  },
}));
