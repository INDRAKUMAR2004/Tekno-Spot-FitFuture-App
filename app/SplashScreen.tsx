import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start from 0 opacity

  useEffect(() => {
    // Fade in FitFuture text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigate to Home after 4 seconds
    const timeout = setTimeout(() => {
      router.replace("/(tabs)/Home");
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require("../assets/images/splash-icon.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />

      {/* Animated Text */}
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Text style={styles.subtext}>
          Your Personal Fitness and Lifestyle Assistant
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: width * 0.6,   // 60% of screen width
    height: width * 0.6,  // Maintain square ratio
    marginBottom: 20,     // Add spacing before text
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#39FF14", // Neon Green
    textShadowColor: "#39FF14",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtext: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#39FF14",
    marginTop: 8,
    opacity: 0.8,
  },
});
