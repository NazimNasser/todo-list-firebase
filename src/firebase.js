// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHtQJxxk2aK6-6Ou4x3ntkcA7PMYrQjkw",
  authDomain: "todo-list-1da77.firebaseapp.com",
  databaseURL: "https://todo-list-1da77-default-rtdb.firebaseio.com",
  projectId: "todo-list-1da77",
  storageBucket: "todo-list-1da77.appspot.com",
  messagingSenderId: "586168993959",
  appId: "1:586168993959:web:0762907dae5fd787f43382"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();