import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useAuthStore } from "../stores/authStore";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const logout = useAuthStore((state) => state.logout);

  const handleDarkModeToggle = () => {
    // Handle dark mode toggle logic here
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleDarkModeToggle} style={styles.button}>
          <Ionicons name="moon-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Dark Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
