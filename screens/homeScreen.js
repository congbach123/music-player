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
import { colors } from "../styles/tokens";
import { useAuthStore } from "../stores/authStore";
import TopNavigationBar from "../components/TopNavigationBar";
import CategoryButton from "../components/CategoryButton";
import SmallProfile from "../components/SmallProfile";
import SongItem from "../components/SongItem";
import SongList from "../components/SongList";
import { useSongStore } from "../stores/songStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState();
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContainer: {
    marginTop: 50,
  },
  listContainer: {
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  topBar: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.background,
    width: "100%",
  },
  welcomeText: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 20,
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
    backgroundColor: colors.button_primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  logoutBtnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.text,
  },
});

export default HomeScreen;
