import React from "react";
import { Image, StyleSheet, View } from "react-native";

function SmallProfile({ source }) {
  return (
    <View style={styles.container}>
      {source ? (
        <Image source={source} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 5,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

export default SmallProfile;
