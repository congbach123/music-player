import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { useSongStore } from "../stores/songStore";
import * as tokens from "../styles/tokens";
import transparentThumb from "../assets/thumb.png";
import { Ionicons } from "@expo/vector-icons";
import { pause } from "react-native-track-player/lib/src/trackPlayer";

export const FloatingPlayer = () => {
  const navigation = useNavigation();
  // const {
  //   isPlaying,
  //   getCurrentSong,
  //   playbackInstance,
  //   status,
  //   setStatus,
  //   pauseSong,
  //   resumeSong,
  //   nextSong,
  // } = useSongStore();
  const isPlaying = useSongStore((state) => state.isPlaying);
  const getCurrentSong = useSongStore((state) => state.getCurrentSong);
  const playbackInstance = useSongStore((state) => state.playbackInstance);
  const status = useSongStore((state) => state.status);
  const setStatus = useSongStore((state) => state.setStatus);
  const pauseSong = useSongStore((state) => state.pauseSong);
  const resumeSong = useSongStore((state) => state.resumeSong);
  const nextSong = useSongStore((state) => state.nextSong);

  // (state) => ({
  //   isPlaying: state.isPlaying,
  //   getCurrentSong: state.getCurrentSong,
  // })

  const [visible, setVisible] = useState(true); //before this was true
  // const [status, setStatus] = useState(null);
  useEffect(() => {
    console.log("FloatingPlayer is rendered");
  }, []);

  useEffect(() => {
    const currentSong = getCurrentSong();
    setVisible(isPlaying || currentSong);
  }, [isPlaying, getCurrentSong]);

  useEffect(() => {
    if (playbackInstance) {
      console.log("Setting onPlaybackStatusUpdate");
      playbackInstance.setOnPlaybackStatusUpdate(setStatus);
    }
  }, [playbackInstance]);

  const displayedTrack = getCurrentSong();

  const handlePress = () => {
    navigation.navigate("SongPlayerScreen", { song: displayedTrack });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleNext = () => {
    nextSong();
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
        <Text style={styles.trackTitle} numberOfLines={1}>
          {displayedTrack.name ?? "Unknown Track"}
        </Text>
        <Text style={styles.trackArtist}>
          {displayedTrack.artist ?? "Unknown Track"}
        </Text>
      </View>

      <View style={styles.trackControlsContainer}>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.controlButton}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        value={status?.positionMillis / 1000 || 0}
        minimumValue={0}
        maximumValue={status?.durationMillis / 1000 || 1}
        // to make this slider untouchable
        onSlidingStart={() => {}}
        onSlidingComplete={() => {}}
        //
        thumbImage={transparentThumb} //hack to remove the thumb
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        // onValueChange={handleSliderValueChange}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.colors.background,
    padding: 8,
    margin: 10,
    borderRadius: 8,
    paddingVertical: 10,
    position: "absolute",
    bottom: 50,
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
    fontSize: tokens.fontSize.xsm,
    fontWeight: "600",
    paddingLeft: 10,
    color: "#fff",
    fontFamily: tokens.fontFamily.bold,
  },
  trackArtist: {
    fontSize: tokens.fontSize.xs,
    fontWeight: "600",
    paddingLeft: 10,
    color: "#fff",
    fontFamily: tokens.fontFamily.medium,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginRight: 16,
    paddingLeft: 16,
  },
  controlButton: {
    padding: 8,
  },
  slider: {
    position: "absolute",
    width: "109%",
    height: 40,
    bottom: -19,
    left: -8,
  },
});
