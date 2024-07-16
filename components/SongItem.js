import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontSize } from "../styles/tokens";

const SongItem = ({ song, handleSongPress }) => {
  return (
    <TouchableOpacity onPress={() => handleSongPress(song)}>
      <View style={styles.container}>
        <Image source={{ uri: song.image }} style={styles.image} />
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
    fontWeight: "bold",
    color: colors.text,
  },
  artist: {
    fontSize: fontSize.sm,
    color: colors.text_secondary,
  },
});

export default SongItem;
