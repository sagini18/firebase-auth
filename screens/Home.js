import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut, updatePassword, deleteUser } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const Home = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace("Login"));
    console.log("Logout", auth?.currentUser?.providerData);
  };
  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      if (newPassword.length >= 6) {
        updatePassword(auth?.currentUser, newPassword)
          .then(() => {
            alert("Password updated");
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("Password must be 6 characters");
      }
    } else {
      alert("Password not match");
    }
  };
  const handleDeleteAccount = () => {
    deleteUser(auth?.currentUser)
      .then(() => {
        alert("Account deleted");
        navigation.replace("Login");
      })
      .catch((err) => alert(err));
  };
  return auth?.currentUser?.emailVerified ? (
    <View style={styles.container}>
      <Image
        source={{ uri: auth?.currentUser?.providerData[0].photoURL }}
        style={styles.profile}
      />
      <Text style={styles.text}> Email: {auth.currentUser?.email}</Text>
      <Text style={styles.text}>
        {" "}
        Name: {auth.currentUser?.providerData[0]?.displayName}
      </Text>
      <TextInput
        placeholder="New Password"
        style={styles.textInput}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry={true}
      ></TextInput>
      <TextInput
        placeholder="Confirm Password"
        style={styles.textInput}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 10,
          rowGap: 10,
        }}
      >
        <Text style={styles.text}>Please check your Email.</Text>
        <Text>The account need to be verified to continue.</Text>
      </View>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "skyblue",
    borderRadius: 10,
    padding: 10,
    borderColor: "blue",
    borderWidth: 2,
    width: 150,
    margin: 10,
  },
  buttonDelete: {
    backgroundColor: "pink",
    borderRadius: 10,
    padding: 10,
    borderColor: "red",
    borderWidth: 2,
    width: 150,
    margin: 10,
  },
  buttonText: {
    alignSelf: "center",
  },
  buttonLogout: {
    backgroundColor: "lightgreen",
    borderRadius: 10,
    padding: 10,
    borderColor: "green",
    borderWidth: 2,
    width: 150,
    margin: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
