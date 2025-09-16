import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function WorkoutDetails() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Card */}
      <View style={styles.topCard}>
        <Image source={require("../Components/Images/plank.png")} style={styles.cardImage} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.cardTitle}>Core & Cardio Fusion</Text>
          <Text style={styles.cardDesc}>Run in Place Lifting Knees High</Text>
          <Text style={styles.duration}>00:45</Text>
        </View>
      </View>

      {/* Sections */}
      <Text style={styles.sectionHeader}>Key Details</Text>
      <Text style={styles.text}>• Duration: 45 Seconds</Text>
      <Text style={styles.text}>• Estimated Calories: 6 kcal</Text>
      <Text style={styles.text}>• Difficulty: Beginner/Intermediate</Text>

      <Text style={styles.sectionHeader}>Step-By-Step Guide</Text>
      <Text style={styles.text}>• Stand Tall With Feet Hip-Width Apart.</Text>
      <Text style={styles.text}>• Engage Your Core And Keep Your Chest Lifted.</Text>

      <Text style={styles.sectionHeader}>Safety Tips</Text>
      <Text style={styles.text}>• Warm Up Before Starting To Prevent Injury.</Text>
      <Text style={styles.text}>• Land Softly On Balls Of Feet To Reduce Joint Impact.</Text>
      <Text style={styles.text}>• Maintain Upright Posture, Avoid Leaning Forward.</Text>

      <Text style={styles.sectionHeader}>Breathing Tips</Text>
      <Text style={styles.text}>• Inhale Through Nose, Exhale Through Mouth Steadily.</Text>
      <Text style={styles.text}>• Match Breathing With Steps.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  topCard: { flexDirection: "row", backgroundColor: "#f9f9f9", borderRadius: 15, padding: 10, marginBottom: 20 },
  cardImage: { width: 80, height: 80, borderRadius: 12 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardDesc: { fontSize: 13, color: "#666" },
  duration: { fontSize: 12, color: "#444", marginTop: 6 },
  sectionHeader: { fontSize: 18, fontWeight: "bold", marginVertical: 12 },
  text: { fontSize: 14, color: "#333", marginBottom: 6 },
  button: { backgroundColor: "#2E8BFF", padding: 15, borderRadius: 12, alignItems: "center", marginVertical: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
