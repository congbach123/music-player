import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontSize } from "../styles/tokens";
import * as tokens from "../styles/tokens";
import { useNavigation } from "@react-navigation/native";
import { useSongStore } from "../stores/songStore";

const SongItem = ({ song }) => {
  const navigation = useNavigation();
  const { playSong, songs } = useSongStore();

  // const handleSongPress = (song) => {
  //   // navigation.navigate("SongPlayerScreen", { song });

  //   playSong(song.id - 1);
  // };

  const handleSongPress = () => {
    const songIndex = songs.findIndex((s) => s.id === song.id);

    if (songIndex !== -1) {
      playSong(songIndex);
    } else {
      console.error("Song not found in array");
    }
  };

  return (
    <TouchableOpacity onPress={() => handleSongPress(song)}>
      <View style={styles.container}>
        <Image
          source={{ uri: song.album.images[0]?.url }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{song.name}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: fontSize.md,
    color: colors.text,
    fontFamily: tokens.fontFamily.bold,
  },
  artist: {
    fontSize: fontSize.xs,
    color: colors.text_secondary,
    fontFamily: tokens.fontFamily.medium,
  },
});

export default SongItem;
