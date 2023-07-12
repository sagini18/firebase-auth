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
  updateProfile,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateProfile(auth?.currentUser, {
          displayName: user?.email?.split("@")[0],
          photoURL:
            "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg",
        });
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(auth?.currentUser).then(() =>
          console.log("email sent")
        );
        console.log("Register with", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login with", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
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
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
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
  forgetPassword: {
    color: "skyblue",
    textDecorationLine: "underline",
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

// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import {auth} from '../firebase';

// const handleSignUp = () => {
//   createUserWithEmailAndPassword(auth,email,password)
//   .then((userCredential)=>{
//     const user = userCredential.user;
//     console.log('Register with',user.email);
//}).catch((error)=>{
//   console.log(error.message);
// });
//}

// import {signInWithEmailAndPassword} from 'firebase/auth';

// const handleSignIn = () =>{
//   signInWithEmailAndPassword(auth,email,password)
//    .then((userCredential)=>{
//      const user = userCredential.user;
//      console.log('Login with',user.email);
//    }).catch((error)=>{
//      console.log(error.message);
//    });
//}

// import {onAuthStateChanged} from 'firebase/auth';

// useEffect(()=>{
//   const unsubscribe = onAuthStateChanged(auth,(user)=>{
//     if(user){
//       navigation.replace('Home');
//     }
//   });
//   return unsubscribe;
// },[]);

// import {signOut} from 'firebase/auth';

// const handleLogout = () =>{
//   signOut(auth).then(()=>{
//     navigation.replace('Login');
//   }).catch((error)=>{
//     console.log(error.message);
//   });
// }

// import {getAuth} from 'firebase/auth';

// const user = getAuth().currentUser;
// if(user){
//   console.log(user.email);
//   console.log(user.providerData[0].providerId);
// }else{
//   console.log('No user found');
// }

// import {updateProfile,onAuthStateChanged} from 'firebase/auth';

// useEffect(()=>{
//   const userChanged = onAuthStateChanged(auth,(user)=>{
//     if(user){
//        updateProfile(auth.currentUser,{
//          displayName:user.email.split('@')[0],
//        }).then(()=>console.log("displayName updated"));
//     }
// });
// },[]);

// <Text> Name:{auth.currentUser?.providerData[0].displayName}</Text>

// import {updatePassword} from 'firebase/auth';

// const handleUpdatePassword = () =>{
//   updatePassword(auth.currentUser,password)
//   .then(()=>{
//     console.log('Password updated');
//   }).catch((error)=>{
//     console.log(error.message);
//   });
// }

// import {sendPasswordResetEmail} from "firebase/auth";

// const handleForgetPassword = () =>{
//   sendPasswordResetEmail(auth,Email)
//   .then(()=>{
//     console.log('Password reset email sent');
//   }).catch((error)=>{
//     console.log(error.message);
//   });
// }

// import {deleteUser} from "firebase/auth";

// const handleDeleteUser = () =>{
//   deleteUser(auth.currentUser)
//   .then(()=>{
//     console.log('User deleted');
//   }).catch((error)=>{
//     console.log(error.message);
//   });
// }
