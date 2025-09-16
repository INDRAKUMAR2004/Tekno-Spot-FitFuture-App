// firebaseConfig.tsx
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIdYwPsH-7lO1gvmkzHtzXDx_xKtd7DHU",
  authDomain: "dummy-project-f0086.firebaseapp.com",
  projectId: "dummy-project-f0086",
  storageBucket: "dummy-project-f0086.appspot.com", // ⚠️ fixed (.app → .appspot.com)
  messagingSenderId: "227831768525",
  appId: "1:227831768525:web:1552506a85f6cb602c5084",
  measurementId: "G-BT14PBK6S5",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
