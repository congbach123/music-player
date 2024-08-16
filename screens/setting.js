import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useAuthStore } from "../stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    //navigation.navigate("Login");
  };

  const handleDarkModeToggle = () => {
    // not implemented
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDarkModeToggle}>
        <Text style={styles.label}>Dark Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.label}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
