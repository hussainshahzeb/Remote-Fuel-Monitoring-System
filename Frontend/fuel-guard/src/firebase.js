// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "authDomain",
  databaseURL: "https://fy-project-6c752-default-rtdb.firebaseio.com",
  projectId: "your projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "senderid",
  appId: "app-id",
  measurementId: "measurement-id"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };