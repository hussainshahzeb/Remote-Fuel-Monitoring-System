// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP8Ni3mLi2vb7zxVLdLkFFcXSPLLhEDAU",
  authDomain: "fy-project-6c752.firebaseapp.com",
  databaseURL: "https://fy-project-6c752-default-rtdb.firebaseio.com",
  projectId: "fy-project-6c752",
  storageBucket: "fy-project-6c752.appspot.com",
  messagingSenderId: "255434912685",
  appId: "1:255434912685:web:8633f43a0075f6ac2a6724",
  measurementId: "G-QTR7124RCR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };