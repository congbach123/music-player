// HomeTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../styles/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import SongScreen from "./song";
import PlaylistScreen from "./playlist";
import FavoriteScreen from "./favorite";
import ArtistScreen from "./artist";
import { FloatingPlayer } from "../components/FloatingPlayer";
import { View } from "react-native";
import HomeScreen from "./homeScreen";

const Tab = createBottomTabNavigator();

const iconMap = {
  Songs: ["musical-notes-outline", "musical-notes"],
  Playlist: ["list-outline", "list"],
  Favorites: ["heart-outline", "heart"],
  Artist: ["person-outline", "person"],
  Home: ["home-outline", "home-sharp"],
};

const HomeTabs = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Songs"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const [iconNameInactive, iconNameActive] = iconMap[route.name];
            const iconName = focused ? iconNameActive : iconNameInactive;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.button_primary,
          tabBarInactiveTintColor: colors.background,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Songs" component={SongScreen} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} />
        <Tab.Screen name="Artist" component={ArtistScreen} />
      </Tab.Navigator>

      <FloatingPlayer />
    </View>
  );
};

export default HomeTabs;
