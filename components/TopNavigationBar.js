import React from "react";
import { colors, fontSize } from "../styles/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TopNavigationBar = ({ title }) => {
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettingsPress}>
        <Ionicons
          name="settings-outline"
          size={fontSize.lg}
          color={colors.background}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },
});

export default TopNavigationBar;
