import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDE3PUZF4c-AaMxXuAsCs67pp6l65o0jhs",
    authDomain: "weatherapp-b7f88.firebaseapp.com",
    projectId: "weatherapp-b7f88",
    storageBucket: "weatherapp-b7f88.firebasestorage.app",
    messagingSenderId: "407208554289",
    appId: "1:407208554289:web:e3da2619a6aa45905b0a10",
    measurementId: "G-FC0624RFK8"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);