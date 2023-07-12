import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../firebaseAuth/screens/Home";
import Login from "../firebaseAuth/screens/Login";
import ForgetPassword from "./screens/ForgetPassword";

const Root = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Login">
        <Root.Screen name="Home" component={Home}></Root.Screen>
        <Root.Screen name="Login" component={Login}></Root.Screen>
        <Root.Screen
          name="ForgetPassword"
          component={ForgetPassword}
        ></Root.Screen>
      </Root.Navigator>
    </NavigationContainer>
  );
}
