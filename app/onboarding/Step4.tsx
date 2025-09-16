import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Step4({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.container}>
      <Image source={require("../Components/Images/onboarding4.png")} style={styles.image} />

      <Text style={styles.title}>Workout Demonstrations</Text>
      <Text style={styles.description}>
        Watch short video demonstrations to learn exercises with correct form.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: 250, height: 250, marginBottom: 30, resizeMode: "contain" },
  title: { fontSize: 26, fontWeight: "bold", color: "#39FF14", textAlign: "center", marginBottom: 15 },
  description: { fontSize: 16, color: "#bfbfbf", textAlign: "center", marginBottom: 30 },
  button: { backgroundColor: "#39FF14", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
});
