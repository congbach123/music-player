import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthStore } from "./stores/authStore";
import LoginScreen from "./screens/login";
import SongScreen from "./screens/song";
import RegisterScreen from "./screens/register";
import PlaylistScreen from "./screens/playlist";
import HomeTabs from "./screens/homeTabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingsScreen from "./screens/setting";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const App = () => {
  const isLogin = useAuthStore((state) => state.isLogin); // Access the state

  return (
    <NavigationContainer>
      {isLogin ? (
        <AppStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <AppStack.Screen name="Home" component={HomeTabs} />
          <AppStack.Screen
            name="Settings"
            component={SettingsScreen}
          ></AppStack.Screen>
        </AppStack.Navigator>
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
