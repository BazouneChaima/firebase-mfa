// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJkSqbmqXbk8OnHhrJpoLNcsBk-z2fGRI",
  authDomain: "test-8b5b8.firebaseapp.com",
  projectId: "test-8b5b8",
  storageBucket: "test-8b5b8.firebasestorage.app",
  messagingSenderId: "856839729676",
  appId: "1:856839729676:web:4799455208769aa88bf429"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // i add this line to get auth instance