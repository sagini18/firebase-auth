import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const Home = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace("Login"));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Email: {auth.currentUser?.email} </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "skyblue",
    borderRadius: 10,
    padding: 10,
    borderColor: "blue",
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 20,
  },
});
