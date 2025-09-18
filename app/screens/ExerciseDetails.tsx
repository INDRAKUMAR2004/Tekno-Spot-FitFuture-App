import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ExerciseDetail() {
    return (
        <ScrollView style={styles.container}>
            <Image source={require("../Components/Images/plank.png")} style={styles.image} />

            <Text style={styles.exerciseTitle}>Plank Hold</Text>
            <Text style={styles.duration}>00:30</Text>

            <Text style={styles.sectionHeader}>Key Details</Text>
            <Text style={styles.detailText}>• Duration: 30 Seconds</Text>
            <Text style={styles.detailText}>• Calories Burned: ~5 kcal</Text>
            <Text style={styles.detailText}>• Difficulty: Beginner/Intermediate</Text>

            <Text style={styles.sectionHeader}>Step-by-Step Guide</Text>
            <Text style={styles.detailText}>• How to set up: Elbows under shoulders, body in straight line.</Text>
            <Text style={styles.detailText}>• Maintain form: Engage core, don’t drop hips.</Text>
            <Text style={styles.detailText}>• Avoid mistakes: Don’t hold breath during plank.</Text>

            <Text style={styles.sectionHeader}>Safety Tips</Text>
            <Text style={styles.detailText}>• Keep core tight to avoid arching or sagging lower back.</Text>
            <Text style={styles.detailText}>• Align shoulders over elbows to prevent shoulder strain.</Text>
            <Text style={styles.detailText}>• Stop if sharp pain occurs.</Text>

            <Text style={styles.sectionHeader}>Breathing Tips</Text>
            <Text style={styles.detailText}>• Inhale through nose for slow count of four.</Text>
            <Text style={styles.detailText}>• Exhale through mouth for slow count of four, keeping core tight.</Text>
            <Text style={styles.detailText}>• Maintain steady rhythm.</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
    paddingTop: 30,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#39FF14", // Neon Green border
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#39FF14",
    marginBottom: 5,
    textAlign: "center",
  },
  duration: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#39FF14",
    marginTop: 20,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#ccc",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#39FF14",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#39FF14",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
