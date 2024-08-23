import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as tokens from "../styles/tokens";
import { useSongStore } from "../stores/songStore";

const RecommendationCard = ({ recommendation }) => {
  const { addSong, getCurrentSong, playSong } = useSongStore();

  const handlePress = () => {
    //console.log("RecommendationCard pressed");
    addSong(recommendation);
    const songs = useSongStore.getState().songs;
    const songIndex = songs.findIndex((s) => s.id === recommendation.id);
    playSong(songIndex);
    //console.log(songs);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        style={styles.image}
        source={{ uri: recommendation.album.images[0]?.url }}
      />
      <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
        {recommendation.name}
      </Text>
      <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
        {recommendation.artists[0]?.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 200,
    // marginRight: 40,
    alignItems: "left",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  name: {
    marginTop: 10,
    color: tokens.colors.spotify_white,
    fontSize: tokens.fontSize.xs,
    fontFamily: tokens.fontFamily.bold,
    overflow: "hidden",
  },
  desc: {
    color: tokens.colors.spotify_gray,
    fontSize: tokens.fontSize.xs,
    fontFamily: tokens.fontFamily.medium,
  },
});

export default RecommendationCard;
