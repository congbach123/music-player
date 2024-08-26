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
import TopArtistCard from "../components/TopArtistCard";
import SongItem from "../components/SongItem";
import SongList from "../components/SongList";
import { useSongStore } from "../stores/songStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import FeaturedPlaylistCard from "../components/FeaturedPlaylistCard";
import RecommendationCard from "../components/RecommendationCard";
import { useNavigation } from "@react-navigation/native";
import {
  fetchProfile,
  fetchRecentlyPlayedTracks,
  getTopArtists,
  getFeaturedPlaylists,
  getRecommendations,
} from "../services/apiController";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  const { playSong, addSong } = useSongStore();
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchProfile();
        setUserProfile(profile);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    const loadRecentlyPlayedTracks = async () => {
      try {
        const tracks = await fetchRecentlyPlayedTracks();
        setRecentlyPlayedTracks(tracks);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadRecentlyPlayedTracks();
  }, []);

  useEffect(() => {
    const loadTopArtists = async () => {
      try {
        const artists = await getTopArtists();
        setTopArtists(artists);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadTopArtists();
  }, []);

  useEffect(() => {
    const loadFeaturedPlaylists = async () => {
      try {
        const playlists = await getFeaturedPlaylists();
        setFeaturedPlaylists(playlists);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadFeaturedPlaylists();
  }, []);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recommendations = await getRecommendations(recentlyPlayedTracks);
        setRecommendedTracks(recommendations);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadRecommendations();
  }, [recentlyPlayedTracks]); // recently play track
  //console.log(recommendedTracks);

  const renderItem = ({ item }) => {
    const song = item.track;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          style={styles.likedSong}
          onPress={() => {
            // console.log("Song added to queue", song);
            // addSong(song);
            //navigation.navigate("SongPlayerScreen", { song });
          }}
        >
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

          <Text style={styles.sectionText}>Your Top Artist</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalList}>
              {topArtists.map((artist) => (
                <TopArtistCard key={artist.id} artist={artist} />
              ))}
            </View>
          </ScrollView>

          <Text style={styles.sectionText}>Featured Playlists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalList}>
              {featuredPlaylists.map((playlist) => (
                <FeaturedPlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </View>
          </ScrollView>

          <Text style={styles.sectionText}>Our Recommendation</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalList}>
              {recommendedTracks.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                />
              ))}
            </View>
          </ScrollView>

          {/* <Text style={styles.sectionText}>Our Recommendation</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalList}>
              {recommendedTracks.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                />
              ))}
            </View>
          </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.spotify_darkBackground,
  },
  scrollContainer: {
    marginTop: 50,
  },
  listContainer: {
    width: "100%",
  },
  content: {
    flex: 1,
    marginHorizontal: 15,
  },
  topBar: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    // backgroundColor: tokens.colors.background,
    width: "100%",
  },
  sectionText: {
    color: tokens.colors.spotify_white,
    fontSize: tokens.fontSize.base,
    fontFamily: tokens.fontFamily.bold,
    marginVertical: 20,
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
  horizontalList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    // marginLeft: -20,
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
