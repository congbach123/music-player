import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as tokens from "../styles/tokens";

const formatFollowers = (count) => {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + "M";
  } else if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + "K";
  } else {
    return count.toString();
  }
};

const TopArtistCard = ({ artist }) => {
  const formattedFollowers = formatFollowers(artist.followers.total);

  return (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={{ uri: artist.images[0]?.url }} />
      <Text style={styles.name}>{artist.name}</Text>
      <Text style={styles.followers}>{formattedFollowers}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    // marginRight: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  name: {
    marginTop: 10,
    color: tokens.colors.spotify_white,
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.bold,
  },
  followers: {
    color: tokens.colors.spotify_gray,
    fontSize: tokens.fontSize.xsm,
    fontFamily: tokens.fontFamily.medium,
  },
});

export default TopArtistCard;
