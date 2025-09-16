import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Stack } from "expo-router";

const exercises = [
  { title: "High Knees", description: "Run in place lifting knees high", duration: "00:45", img: require("../Components/Images/bicycle.png") },
  { title: "Mountain Climbers", description: "Cardio + core move", duration: "01:00", img: require("../Components/Images/plank.png") },
  { title: "Plank Shoulder Taps", description: "Plank with alternate taps", duration: "00:45", img: require("../Components/Images/russian.png") },
  { title: "Side Plank Hip Dips", description: "Strengthen obliques", duration: "00:45", img: require("../Components/Images/legraises.png") },
];

export default function WorkoutOverview() {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push("/screens/WorkoutDetails")}>
          <Image source={item.img} style={styles.image} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
          <Text style={styles.duration}>{item.duration}</Text>
        </TouchableOpacity>
      )}
      ListHeaderComponent={
        <View>
          <Image source={require("../Components/Images/plank.png")} style={styles.banner} />
          <Text style={styles.title}>Core & Cardio Fusion</Text>
          <Text style={styles.subTitle}>5 Exercises • Min Duration</Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      }
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  banner: { width: "100%", height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  subTitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#f8f8f8", borderRadius: 12, padding: 10, marginVertical: 6 },
  image: { width: 70, height: 70, borderRadius: 10 },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  cardDesc: { fontSize: 13, color: "#666" },
  duration: { fontSize: 12, color: "#444" },
  button: { backgroundColor: "#2E8BFF", padding: 15, borderRadius: 12, alignItems: "center", marginVertical: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
