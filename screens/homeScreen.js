import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import * as tokens from "../styles/tokens";
import { useAuthStore } from "../stores/authStore";
import TopNavigationBar from "../components/TopNavigationBar";
import CategoryButton from "../components/CategoryButton";
import SmallProfile from "../components/SmallProfile";
import SongItem from "../components/SongItem";
import SongList from "../components/SongList";
import { useSongStore } from "../stores/songStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(userProfile);

  const getRecentlyPlayedTracks = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = response.data.items;
      setRecentlyPlayedTracks(tracks);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRecentlyPlayedTracks();
  }, []);
  console.log(recentlyPlayedTracks);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity style={styles.likedSong}>
          <Image
            style={styles.cardThumb}
            source={{ uri: item.track.album.images[0].url }}
          ></Image>
          <View>
            <Text style={styles.cardText}>{item.track.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationBar title="Songs" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.topBar}>
            {userProfile ? (
              <SmallProfile source={{ uri: userProfile.images[1]?.url }} />
            ) : (
              <Text>Loading profile...</Text>
            )}
            <CategoryButton category="All" />
            <CategoryButton category="Music" />
            <CategoryButton category="Podcast" />
          </View>

          <View style={styles.cards}>
            <View style={styles.card}>
              <TouchableOpacity style={styles.likedSong}>
                <LinearGradient
                  colors={["#a8bddd", "#0668f1", "#5f417c"]}
                  style={styles.cardThumb}
                >
                  <Ionicons name="heart" color={"#fff"} size={24}></Ionicons>
                </LinearGradient>
                <Text style={styles.cardText}>Liked Song</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <TouchableOpacity style={styles.likedSong}>
                <LinearGradient
                  colors={["#a8bddd", "#0668f1", "#5f417c"]}
                  style={styles.cardThumb}
                >
                  <Ionicons name="heart" color={"#fff"} size={24}></Ionicons>
                </LinearGradient>
                <Text style={styles.cardText}>Liked Song</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cards}>
            <FlatList
              data={recentlyPlayedTracks}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between", gap: 5 }}
              scrollEnabled={false}
            ></FlatList>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.primary,
  },
  scrollContainer: {
    marginTop: 50,
  },
  listContainer: {
    width: "100%",
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },
  topBar: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: tokens.colors.background,
    width: "100%",
  },
  welcomeText: {
    fontSize: 24,
    color: tokens.colors.text,
    marginBottom: 20,
  },
  cards: {
    alignItems: "center",

    // backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  card: {
    flex: 1,
    marginBottom: 5,
  },
  likedSong: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    backgroundColor: tokens.colors.background,
    borderRadius: 5,
    elevation: 3,
  },
  cardThumb: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: tokens.colors.spotify_white,
    fontSize: tokens.fontSize.xsm,
    fontFamily: tokens.fontFamily.bold,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 5,
  },
  logoutBtn: {
    padding: 10,
    height: 50,
    backgroundColor: tokens.colors.button_primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: 10,
  },
  logoutBtnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: tokens.colors.text,
  },
});

export default HomeScreen;
