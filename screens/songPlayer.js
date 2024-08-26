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
import * as tokens from "../styles/tokens";
import { Ionicons } from "@expo/vector-icons";
import { getArtist } from "../services/apiController";

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
    status,
    setStatus,
  } = useSongStore();
  // const [status, setStatus] = useState(null);

  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const loadArtist = async () => {
      const artist = await getArtist(song.artists[0].id);
      setArtist(artist);
    };
    loadArtist();
  }, [song]);

  useEffect(() => {
    const currentSong = getCurrentSong();
    // Only play the song if it not already or new song
    if (!currentSong || currentSong.id !== song.id) {
      playSong(song.id - 1);
    }

    // return () => {
    //   console.log("SongPlayerScreen unmounted");
    //   stopSong(); // Stop song when component remove or navigate away
    // };
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
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentSong.album.images[0]?.url }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {currentSong.name}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {artist?.name}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            value={status?.positionMillis / 1000 || 0}
            minimumValue={0}
            maximumValue={status?.durationMillis / 1000 || 1}
            onValueChange={handleSliderValueChange}
            // thumbTintColor="black"
          />
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>
              {formatTime(status?.positionMillis || 0)}
            </Text>
            <Text style={styles.timestamp}>
              {formatTime(status?.durationMillis || 0)}
            </Text>
          </View>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={previousSong} style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={36}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePlayPause}
            underlayColor="transparent"
          >
            {isPlaying ? (
              <Ionicons name="pause-circle" size={84}></Ionicons>
            ) : (
              <Ionicons name="play-circle" size={84}></Ionicons>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={nextSong} style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={36}></Ionicons>
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
    // marginHorizontal: 10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 25,
    // backgroundColor: "black",
    paddingTop: 40,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    borderRadius: 8,
    elevation: 10,
    marginBottom: 40,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    // marginBottom: 20,
    borderRadius: 8,
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    // backgroundColor: "black",
  },
  title: {
    fontSize: tokens.fontSize.base,
    color: colors.text,
    fontFamily: tokens.fontFamily.black,
    overflow: "hidden",
    height: 32,
  },
  artist: {
    fontSize: tokens.fontSize.sm,
    color: colors.text,
    fontFamily: tokens.fontFamily.medium,
  },
  sliderContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginVertical: 0,
    // backgroundColor: "black",
  },
  slider: {
    width: "109%",
    height: 40,
    marginTop: 15,
    marginBottom: -12,
  },
  timestampContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginHorizontal: -10,
  },
  timestamp: {
    fontSize: tokens.fontSize.xs,
    color: colors.text,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  controlButton: {
    marginHorizontal: 24,
  },
  controlText: {
    fontSize: 18,
    color: colors.accent,
    marginHorizontal: 20,
  },
});

export default SongPlayerScreen;
