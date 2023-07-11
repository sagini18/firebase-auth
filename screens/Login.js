import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Register with", user.email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login with", user.email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={(mail) => setEmail(mail)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true} //it gives .... in password input
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(styles.button, styles.buttonOutline)}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonTextOutline}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    margin: 3,
    padding: 10,
    width: 300,
    backgroundColor: "pink",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 3,
    backgroundColor: "skyblue",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "skyblue",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 700,
    color: "white",
  },
  buttonTextOutline: {
    fontSize: 16,
    fontWeight: 700,
    color: "skyblue",
  },
});
