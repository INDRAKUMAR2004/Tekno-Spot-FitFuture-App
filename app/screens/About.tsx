import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>About FitFuture</Text>
        <Text style={styles.text}>
          FitFuture is a completely free platform built to support teen and
          student athletes in school and college. Our mission is simple: empower
          the next generation of athletes by providing AI-powered personalized
          diet and workout plans tailored to their goals, sport, and training
          schedule. By combining advanced technology with sports science,
          FitFuture helps athletes train smarter, recover better, and reach
          their full potential — without any cost.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.heading}>About the Creator</Text>
        <Text style={styles.text}>
          FitFuture was created by Ahsan Kaja, a passionate student-athlete,
          innovator, and researcher. Ahsan is a state-level football and
          badminton player, a national-level archer, and a tech creator with
          multiple patents in AI-based solutions. His dedication to sports and
          technology inspired him to design FitFuture as a way to give back to
          the athletic community — making AI-driven, elite-level training
          support accessible to every student-athlete.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#39FF14",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 22,
    marginBottom: 20,
  },
  divider: {
    borderBottomColor: "#39FF14",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
