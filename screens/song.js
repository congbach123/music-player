import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { colors } from "../styles/tokens";
import { useAuthStore } from "../stores/authStore";
import TopNavigationBar from "../components/TopNavigationBar";
import SongItem from "../components/SongItem";
import SongList from "../components/SongList";
import { useSongStore } from "../stores/songStore";

const SongScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const songs = useSongStore((state) => state.songs);

  // const handleSongPress = (song) => {
  //   console.log(song.id);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationBar title="Songs" />
      <View style={styles.content}>
        {/* <FlatList
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSongPress(item)}>
              <SongItem song={item} />
            </TouchableOpacity>
          )}
          style={styles.listContainer}
        /> */}
        <SongList songs={songs}></SongList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
  welcomeText: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 20,
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

export default SongScreen;
