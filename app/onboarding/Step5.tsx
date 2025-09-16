import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Step5({ onFinish }: { onFinish: () => void }) {
  return (
    <View style={styles.container}>
      <Image source={require("../Components/Images/onboarding5.png")} style={styles.image} />

      <Text style={styles.title}>Let’s Get Started!</Text>
      <Text style={styles.description}>
        Sign up and take your first step towards a healthier future with FitFuture.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onFinish}>
        <Text style={styles.buttonText}>Get Started</Text>
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
