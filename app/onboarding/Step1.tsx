import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Step1({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Avatar</Text>
      <View style={styles.avatars}>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>👨 Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>👩 Female</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#39FF14", marginBottom: 20 },
  avatars: { flexDirection: "row", gap: 20, marginBottom: 40 },
  avatar: { borderWidth: 2, borderColor: "#39FF14", borderRadius: 10, padding: 20 },
  avatarText: { fontSize: 20, color: "#fff" },
  button: { backgroundColor: "#39FF14", padding: 15, borderRadius: 8 },
  buttonText: { color: "#000", fontWeight: "bold" },
});
