// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIdYwPsH-7lO1gvmkzHtzXDx_xKtd7DHU",
  authDomain: "dummy-project-f0086.firebaseapp.com",
  projectId: "dummy-project-f0086",
  storageBucket: "dummy-project-f0086.appspot.com", 
  messagingSenderId: "227831768525",
  appId: "1:227831768525:web:1552506a85f6cb602c5084",
  measurementId: "G-BT14PBK6S5",
};

// Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firestore
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});