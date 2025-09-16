import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      if (usr) {
        const onboard = await AsyncStorage.getItem("onboardingComplete");
        setOnboardingComplete(onboard === "true");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem("onboardingComplete", "false");
  };
  const logout = () => signOut(auth);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    setOnboardingComplete(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, onboardingComplete, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
