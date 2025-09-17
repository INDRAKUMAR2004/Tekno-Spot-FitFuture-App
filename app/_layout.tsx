// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { ProfileProvider } from "../context/ProfileContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        </Stack>
      </ProfileProvider>
    </AuthProvider>
  );
}
