import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as tokens from "../styles/tokens";
const CategoryButton = ({ category }) => {
  return (
    <TouchableOpacity style={styles.categoryButton}>
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: tokens.colors.spotify_darkGray,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  categoryText: {
    color: tokens.colors.spotify_white,
    fontFamily: tokens.fontFamily.medium,
    fontSize: tokens.fontSize.xs,
    // backgroundColor: tokens.colors.spotify_darkBackground,
    textAlignVertical: "center",
    lineHeight: 14,
  },
});
export default CategoryButton;
