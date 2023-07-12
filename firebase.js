// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjPM1gKt1sYjhJ6K4iPRX5gYEmaA8CWKM",
  authDomain: "fir-auth-847e8.firebaseapp.com",
  projectId: "fir-auth-847e8",
  storageBucket: "fir-auth-847e8.appspot.com",
  messagingSenderId: "516312231751",
  appId: "1:516312231751:web:a4e2dab93aaa3890a36662",
};

// in version 8.10.0
// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }
const auth = getAuth(app);
export { auth };

// in latest version
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-0ZzQ4Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3",
//   authDomain: "fir-auth-847e8.firebaseapp.com",
//   projectId: "fir-auth-847e8",
//   storageBucket: "fir-auth-847e8.appspot.com",
//   messagingSenderId: "516312231751",
//   appId: "1:516312231751:web:a4e2dab93aaa3890a36662",
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// export { auth };
