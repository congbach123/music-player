import { create } from "zustand";

export const useSongStore = create((set) => ({
  songs: [
    {
      id: 1,
      name: "Song 1",
      artist: "Artist 1",
      image: "https://i.scdn.co/image/ab6761610000e5eb66e0a040a53996e8bf19f9b5",
    },
    {
      id: 2,
      name: "Song 2",
      artist: "Artist 2",
      image: "https://i.scdn.co/image/ab6761610000e5ebae678a70cd3899b2167026ea",
    },
    {
      id: 3,
      name: "Song 3",
      artist: "Artist 3",
      image: "https://i.scdn.co/image/ab6761610000e5ebb97791c136d7354ad7792555",
    },
    // Add more songs as needed
  ],
  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  removeSong: (id) =>
    set((state) => ({ songs: state.songs.filter((song) => song.id !== id) })),
}));
