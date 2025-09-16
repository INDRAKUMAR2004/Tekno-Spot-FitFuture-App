import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router, useRouter } from "expo-router";

const exercises = [
    { title: "Plank Hold", description: "Engages Core and Shoulders", duration: "00:30", image: require("../Components/Images/plank.png") },
    { title: "Bicycle Crunches", description: "Targets Abs & Obliques", duration: "01:00", image: require("../Components/Images/bicycle.png") },
    { title: "Russian Twists", description: "Core Rotation Movement", duration: "01:00", image: require("../Components/Images/russian.png") },
    { title: "Leg Raises", description: "Lower abs & hip flexors", duration: "01:00", image: require("../Components/Images/legraises.png") },
];

export default function DayExercises() {
    const navigation = useNavigation();

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
                            {/* Optional: Progress bar */}
                        </View>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/ExerciseDetails")}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  duration: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

