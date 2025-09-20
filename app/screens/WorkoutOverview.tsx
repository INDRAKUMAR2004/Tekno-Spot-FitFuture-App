import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const exercises = [
  { title: "High Knees", description: "Run in place lifting knees high", duration: "00:45", img: require("../Components/Images/bicycle.jpg") },
  { title: "Mountain Climbers", description: "Cardio + core move", duration: "01:00", img: require("../Components/Images/plank.jpg") },
  { title: "Plank Shoulder Taps", description: "Plank with alternate taps", duration: "00:45", img: require("../Components/Images/russian.jpg") },
  { title: "Side Plank Hip Dips", description: "Strengthen obliques", duration: "00:45", img: require("../Components/Images/legraises.jpg") },
];

export default function WorkoutOverview() {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => router.push("/screens/WorkoutDetails")}
        >
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
          <Image source={require("../Components/Images/plank.jpg")} style={styles.banner} />
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
      style={{ backgroundColor: darkBg }}
    />
  );
}

const neonGreen = "#39FF14";
const darkBg = "#0d0d0d";

const styles = StyleSheet.create({
  banner: { 
    width: "100%", 
    height: 200, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderWidth: 2, 
    borderColor: neonGreen 
  },
  title: { fontSize: 22, fontWeight: "bold", color: neonGreen, marginTop: 10 },
  subTitle: { fontSize: 14, color: "#aaa", marginBottom: 20 },
  card: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#1a1a1a", 
    borderRadius: 12, 
    padding: 10, 
    marginVertical: 6, 
    borderWidth: 1, 
    borderColor: neonGreen 
  },
  image: { 
    width: 70, 
    height: 70, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: neonGreen 
  },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: neonGreen },
  cardDesc: { fontSize: 13, color: "#ccc" },
  duration: { fontSize: 12, color: neonGreen },
  button: { 
    backgroundColor: neonGreen, 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center", 
    marginVertical: 20 
  },
  buttonText: { color: darkBg, fontWeight: "bold", fontSize: 16 },
});
