import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSKbDmogPaSiRaKk2GhTox18CNU0NcDQ8",
  authDomain: "chatapp-8b7ea.firebaseapp.com",
  projectId: "chatapp-8b7ea",
  storageBucket: "chatapp-8b7ea.firebasestorage.app",
  messagingSenderId: "803999987814",
  appId: "1:803999987814:web:ffe6678a694d47e7b1d5a7",
  measurementId: "G-64ZKWN0DG4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
