import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../styles/tokens";
import { useAuthStore } from "../stores/authStore";
import TopNavigationBar from "../components/TopNavigationBar";

const SongScreen = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationBar title="Songs" />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to the Songs Screen!</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
