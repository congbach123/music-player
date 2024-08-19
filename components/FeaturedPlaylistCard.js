import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as tokens from "../styles/tokens";

const FeaturedPlaylistCard = ({ playlist }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={{ uri: playlist.images[0]?.url }} />
      <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
        {playlist.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    // marginRight: 40,
    alignItems: "left",
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
  },
  name: {
    marginTop: 10,
    color: tokens.colors.spotify_white,
    fontSize: tokens.fontSize.xs,
    fontFamily: tokens.fontFamily.bold,
  },
  desc: {
    color: tokens.colors.spotify_gray,
    fontSize: tokens.fontSize.xsm,
    fontFamily: tokens.fontFamily.medium,
  },
});

export default FeaturedPlaylistCard;
