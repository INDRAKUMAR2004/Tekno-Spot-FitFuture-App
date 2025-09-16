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
    backgroundColor: "#fafafa",
    padding: 20,
    paddingTop: 30
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  exerciseTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  duration: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
