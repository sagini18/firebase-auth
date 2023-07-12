import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Email sent"))
      .catch((error) => alert(error.message));
  };
  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <TouchableNativeFeedback
        onPress={handleReset}
        background={TouchableNativeFeedback?.Ripple("skyblue", false)}
      >
        <View style={styles.button}>
          <Text style={styles.text}>Reset Password</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  button: {
    borderColor: "blue",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    color: "black",
    alignSelf: "center",
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
