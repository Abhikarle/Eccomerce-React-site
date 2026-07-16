// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnLG2Dj8XC8V_6_AWSDUsm7qfRPoMDBW8",
  authDomain: "react-eccomerce-78e6d.firebaseapp.com",
  projectId: "react-eccomerce-78e6d",
  storageBucket: "react-eccomerce-78e6d.firebasestorage.app",
  messagingSenderId: "139056165802",
  appId: "1:139056165802:web:bde66c68a08fb5f78e31d3",
  measurementId: "G-8ZWVB7R0GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const { auth } = getAuth(app);

export { auth };
