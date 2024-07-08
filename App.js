import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "./stores/authStore";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import RegisterScreen from "./screens/register";

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
          <AppStack.Screen name="Home" component={HomeScreen} />
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
