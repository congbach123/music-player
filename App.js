import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthStore } from "./stores/authStore";
import LoginScreen from "./screens/login";
import SongScreen from "./screens/song";
import RegisterScreen from "./screens/register";
import PlaylistScreen from "./screens/playlist";
import HomeTabs from "./screens/homeTabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingsScreen from "./screens/setting";
import SongPlayerScreen from "./screens/songPlayer";
import CustomDrawerContent from "./screens/setting_test";
import { FloatingPlayer } from "./components/FloatingPlayer";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="HomeTabs"
        screenOptions={{ headerShown: false, drawerPosition: "right" }}
      >
        <Drawer.Screen name="HomeTabs" component={HomeTabs} />
      </Drawer.Navigator>
    </>
  );
};

const App = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const [loaded, error] = useFonts({
    "Circular-Black": require("./assets/fonts/CircularSpotifyText-Black.otf"),
    "Circular-Bold": require("./assets/fonts/CircularSpotifyText-Bold.otf"),
    "Circular-Medium": require("./assets/fonts/CircularSpotifyText-Medium.otf"),
    "Circular-Light": require("./assets/fonts/CircularSpotifyText-Light.otf"),
    "Gotham-Black": require("./assets/fonts/GothamBlack.otf"),
    "Gotham-Bold": require("./assets/fonts/GothamBold.otf"),
    "Gotham-Regular": require("./assets/fonts/GothamRegular.otf"),
    "Gotham-Book": require("./assets/fonts/GothamBook.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLogin ? (
        <>
          <AppStack.Navigator
            initialRouteName="Drawer"
            screenOptions={{ headerShown: false }}
          >
            <AppStack.Screen name="Drawer" component={DrawerNavigator} />
            <AppStack.Screen
              name="SongPlayerScreen"
              component={SongPlayerScreen}
            ></AppStack.Screen>
          </AppStack.Navigator>
          {/* <FloatingPlayer /> */}
        </>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
