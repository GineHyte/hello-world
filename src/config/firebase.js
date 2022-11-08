// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcBY941DUZPxFjqf_pOhHz592SS8NskKk",
  authDomain: "todo-ce5af.firebaseapp.com",
  databaseURL: "https://todo-ce5af-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-ce5af",
  storageBucket: "todo-ce5af.appspot.com",
  messagingSenderId: "449166939604",
  appId: "1:449166939604:web:02629c34c66b0715557241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);