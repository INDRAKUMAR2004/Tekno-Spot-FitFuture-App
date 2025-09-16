import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signup(email, password);
      router.replace("/onboarding"); // go to onboarding first time
    } catch (err) {
      Alert.alert("Signup Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#000" },
  title: { fontSize: 28, fontWeight: "bold", color: "#0f0", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#0f0", borderRadius: 8, padding: 12, marginVertical: 8, color: "#fff" },
  button: { backgroundColor: "#0f0", padding: 15, borderRadius: 8, marginTop: 15 },
  buttonText: { textAlign: "center", color: "#000", fontWeight: "bold" }
});
