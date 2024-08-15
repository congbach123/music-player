import React from "react";
import { FlatList, StyleSheet } from "react-native";
import SongItem from "./SongItem";
import { useNavigation } from "@react-navigation/native";

const SongList = ({ songs }) => {
  // const navigation = useNavigation();

  // const handleSongPress = (song) => {
  //   navigation.navigate("SongPlayerScreen", { song });
  // };

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        // <SongItem song={item} handleSongPress={handleSongPress} />
        <SongItem song={item} />
      )}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  },
});

export default SongList;
