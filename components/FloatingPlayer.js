import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSongStore } from "../stores/songStore";

export const FloatingPlayer = () => {
  const navigation = useNavigation(); // Get the navigation object
  const { isPlaying, getCurrentSong } = useSongStore((state) => ({
    isPlaying: state.isPlaying,
    getCurrentSong: state.getCurrentSong,
  }));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log("FloatingPlayer is rendered");
  }, []);

  useEffect(() => {
    const currentSong = getCurrentSong();
    setVisible(isPlaying && currentSong);
  }, [isPlaying, getCurrentSong]);

  const displayedTrack = getCurrentSong();

  const handlePress = () => {
    navigation.navigate("SongPlayerScreen");
  };

  if (!visible || !displayedTrack) return null;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={styles.container}
    >
      <Image
        source={{ uri: displayedTrack.image ?? unknownTrackImageUri }}
        style={styles.trackArtworkImage}
      />

      <View style={styles.trackTitleContainer}>
        <Text
          style={styles.trackTitle}
          text={displayedTrack.name ?? ""}
          animationThreshold={25}
        />
      </View>

      <View style={styles.trackControlsContainer}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    zIndex: 1000,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
