import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useAuthStore } from "../stores/authStore";
import { colors } from "../styles/tokens";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

const CLIENT_ID = "1d932a3c9e8e419cbea771f033e32043";
const REDIRECT_URI = "exp://192.168.162.46:8081/--/callback";
const CLIENT_SECRET = "b8e1e29b4bfe4524b79323fce69a792f";
const AUTH_URL =
  `https://accounts.spotify.com/authorize?` +
  `client_id=${CLIENT_ID}&` +
  `response_type=code&` +
  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
  `scope=${encodeURIComponent(
    "streaming user-read-email user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public"
  )}`;

const LoginScreen = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
      scopes: [
        "streaming",
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
      ],
      responseType: AuthSession.ResponseType.Token,
      //authorizationEndpoint: "https://accounts.spotify.com/authorize",
    },
    discovery
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const checkTokenValid = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expireDate = await AsyncStorage.getItem("expireDate");
      console.log("accessToken", accessToken);
      console.log("expireDate", expireDate);

      if (accessToken && expireDate) {
        if (new Date(parseInt(expireDate)) > new Date()) {
          login(); //ADD THIS LATER!
          //navigation.navigate("Home"); replace?
        } else {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expireDate");
        }
      }
    };
    checkTokenValid();
  }, []);

  // async function authenticate() {
  //   const config = {
  //     issuer: "https://accounts.spotify.com",
  //     clientId: "1d932a3c9e8e419cbea771f033e32043",
  //     scopes: [
  //       "streaming", //
  //       "user-read-email",
  //       "user-library-read",
  //       "user-read-recently-played",
  //       "user-top-read",
  //       "playlist-read-private",
  //       "playlist-read-collaborative",
  //       "playlist-modify-public",
  //     ],
  //     redirectUrl: "exp://localhost:8081/--/callback",
  //   };
  //   const result = await AuthSession.startAsync(config);
  //   console.log(result);
  //   // need to check token, if token is there then show main directly, else need login
  //   if (result.accessToken) {
  //     const expireDate = new Date(result.accessTokenExpirationDate).getTime();
  //     AsyncStorage.setItem("token", result.accessToken);
  //     AsyncStorage.setItem("expireDate", expireDate.toString());
  //     login();
  //     //navigation.navigate("Home");
  //   }
  // }

  useEffect(() => {
    if (response?.type === "success") {
      console.log("response", response);
      const { access_token, expires_in } = response.params;
      if (access_token) {
        const expireDate = new Date().getTime() + expires_in * 1000;
        AsyncStorage.setItem("token", access_token);
        AsyncStorage.setItem("expireDate", expireDate.toString());
        login();
      } else {
        console.log("No token found");
      }
    }
  }, [response]);

  const handleLogin = async () => {
    if (request) {
      console.log("Prompting auth request...");
      await promptAsync(); // Trigger the authentication process
    } else {
      console.error("Auth request is not initialized");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#be264c" barStyle="light-content" />
      <View style={styles.root}>
        <Image
          style={styles.logo}
          source={require("../assets/musica-logo.png")}
          resizeMode="contain"
        ></Image>
        <TextInput
          style={styles.username_input}
          placeholder="Email or Username"
          onChangeText={setUsername}
        ></TextInput>
        <TextInput
          style={styles.password_input}
          placeholder="Password"
          onChangeText={setPassword}
        ></TextInput>
        <TouchableOpacity>
          <Text style={styles.forgot_pass_text}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sign_in_btn} onPress={handleLogin}>
          <Text style={styles.sign_in_btn_text}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sign_up_btn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.sign_up_btn_text}>Sign Up</Text>
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
  root: {
    padding: 30,
  },
  logo: {
    marginTop: 30,
    width: "50%",
    height: "50%",
    alignSelf: "center",
  },
  username_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    height: 50,
    padding: 10,
    marginBottom: 10,
  },
  password_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    height: 50,
    padding: 10,
    marginBottom: 10,
  },
  forgot_pass_text: {
    textDecorationLine: "underline",
    padding: 5,
    marginTop: 5,
    textAlign: "right",
    color: colors.text,
  },
  sign_in_btn: {
    padding: 10,
    height: 50,
    backgroundColor: colors.button_primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginVertical: 10,
  },
  sign_in_btn_text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  sign_up_btn: {
    padding: 10,
    height: 50,
    backgroundColor: colors.button_primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  sign_up_btn_text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginScreen;
