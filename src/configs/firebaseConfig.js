import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmJIST_3q53Eprs1eC7E44unroxCO9NtY",
  authDomain: "tree-book-ee899.firebaseapp.com",
  projectId: "tree-book-ee899",
  storageBucket: "tree-book-ee899.appspot.com",
  messagingSenderId: "1030916655198",
  appId: "1:1030916655198:web:3ce24e47d745593e7ecccf",
  measurementId: "G-SCDFFF0VRY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, signOut };
