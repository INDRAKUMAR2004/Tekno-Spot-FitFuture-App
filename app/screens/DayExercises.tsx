import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const exercises = [
  { title: "Plank Hold", description: "Engages Core and Shoulders", duration: "00:30", image: require("../Components/Images/plank.png") },
  { title: "Bicycle Crunches", description: "Targets Abs & Obliques", duration: "01:00", image: require("../Components/Images/bicycle.png") },
  { title: "Russian Twists", description: "Core Rotation Movement", duration: "01:00", image: require("../Components/Images/russian.png") },
  { title: "Leg Raises", description: "Lower abs & hip flexors", duration: "01:00", image: require("../Components/Images/legraises.png") },
];

export default function DayExercises() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Day 1 – Core Challenge</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push("/screens/ExerciseDetails")}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/ExerciseDetails")}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark background
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#39FF14", // Neon Green
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#111", // Dark card
    marginVertical: 10,
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    shadowColor: "#39FF14",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#39FF14",
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#39FF14",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#ccc",
  },
  duration: {
    fontSize: 12,
    color: "#39FF14",
    marginTop: 6,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#39FF14",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#39FF14",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
