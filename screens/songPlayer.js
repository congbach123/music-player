// src/screens/SongPlayerScreen.js

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { colors } from "../styles/tokens";
import TopNavigationBar from "../components/TopNavigationBar";
import { useSongStore } from "../stores/songStore";

const formatTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SongPlayerScreen = () => {
  const route = useRoute();
  const { song } = route.params;
  const {
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
    getCurrentSong,
    isPlaying,
    playbackInstance,
    previousSong,
    nextSong,
  } = useSongStore();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const currentSong = getCurrentSong();

    // Only play the song if it not already or new song
    if (!currentSong || currentSong.id !== song.id) {
      playSong(song.id - 1);
    }

    return () => {
      console.log("SongPlayerScreen unmounted");
      stopSong(); // Stop song when component remove or navigate away
    };
  }, [song, playSong, stopSong, getCurrentSong]);

  useEffect(() => {
    if (status && status.didJustFinish) {
      nextSong();
    }
  }, [status]);

  useEffect(() => {
    if (playbackInstance) {
      playbackInstance.setOnPlaybackStatusUpdate(setStatus);
    }
  }, [playbackInstance]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleSliderValueChange = async (value) => {
    if (playbackInstance) {
      await playbackInstance.setPositionAsync(value * 1000);
      console.log(playbackInstance.positionMillis);
    }
  };

  // const handleNextSong = () => {
  //   const currentSongIndex = getCurrentSong()?.id - 1;
  //   const nextIndex =
  //     currentSongIndex + 1 >= songs.length ? 0 : currentSongIndex + 1;
  //   playSong(nextIndex);
  // };

  // const handlePreviousSong = () => {
  //   const currentSongIndex = getCurrentSong()?.id - 1;
  //   const prevIndex =
  //     currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
  //   playSong(prevIndex);
  // };

  const currentSong = getCurrentSong();

  if (!currentSong) {
    return null; // no song is loaded
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationBar title="Now Playing" />
      <View style={styles.content}>
        <Image source={{ uri: currentSong.image }} style={styles.image} />
        <Text style={styles.text}>Song: {currentSong.name}</Text>
        <Text style={styles.text}>Artist: {currentSong.artist}</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.timestamp}>
            {formatTime(status?.positionMillis || 0)}
          </Text>
          <Slider
            style={styles.slider}
            value={status?.positionMillis / 1000 || 0}
            minimumValue={0}
            maximumValue={status?.durationMillis / 1000 || 1}
            onValueChange={handleSliderValueChange}
          />
          <Text style={styles.timestamp}>
            {formatTime(status?.durationMillis || 0)}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={previousSong} style={styles.controlButton}>
            <Text style={styles.controlText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePlayPause}
            underlayColor="transparent"
          >
            {isPlaying ? (
              <Text style={styles.controlText}>Pause</Text>
            ) : (
              <Text style={styles.controlText}>Play</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={stopSong} underlayColor="transparent">
            <Text style={styles.controlText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextSong} style={styles.controlButton}>
            <Text style={styles.controlText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: colors.text,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  slider: {
    width: "80%",
    height: 40,
    marginTop: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  controlButton: {
    marginHorizontal: 10,
  },
  controlText: {
    fontSize: 18,
    color: colors.accent,
    marginHorizontal: 20,
  },
});

export default SongPlayerScreen;
