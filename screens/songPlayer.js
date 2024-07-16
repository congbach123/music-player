// src/screens/SongPlayerScreen.js
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { colors } from "../styles/tokens";
import TopNavigationBar from "../components/TopNavigationBar";
import { useSongStore } from "../stores/songStore";

const SongPlayerScreen = () => {
  const route = useRoute();
  const { song } = route.params;
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);
  const { currentSong, setCurrentSong } = useSongStore();

  useEffect(() => {
    const loadSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(song.url);
      setSound(newSound);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate(setStatus);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [song]);

  useEffect(() => {
    setCurrentSong(song);
  }, [song]);

  const handleSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationBar title="Now Playing" />
      <View style={styles.content}>
        <Image source={{ uri: song.image }} style={styles.image} />
        <Text style={styles.text}>Song: {song.name}</Text>
        <Text style={styles.text}>Artist: {song.artist}</Text>
        <Slider
          style={styles.slider}
          value={status?.positionMillis / 1000 || 0}
          minimumValue={0}
          maximumValue={status?.durationMillis / 1000 || 1}
          onValueChange={handleSliderValueChange}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {new Date(status?.positionMillis || 0).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.timeText}>
            {new Date(status?.durationMillis || 0).toISOString().substr(14, 5)}
          </Text>
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
  slider: {
    width: "80%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  timeText: {
    color: colors.text,
  },
});

export default SongPlayerScreen;
