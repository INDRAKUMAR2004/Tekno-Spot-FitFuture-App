// app/_layout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ProfileProvider } from "../context/ProfileContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setRedirectTo("/auth/login"); 
        setChecking(false);
        return;
      }

      // check onboarding status
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      if (!hasOnboarded) {
        setRedirectTo("/onboarding");  // ✅ lowercase path
      } else {
        setRedirectTo("/(tabs)");
      }
      setChecking(false);
    });

    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2CA0FF" />
      </View>
    );
  }

  if (redirectTo) {
    return <Redirect href={redirectTo} />;
  }

  // Default layout
  return (
    <AuthProvider>
      <ProfileProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
        </Stack>
      </ProfileProvider>
    </AuthProvider>
  );
}
