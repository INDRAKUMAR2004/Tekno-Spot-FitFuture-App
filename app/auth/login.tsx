import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("../(tabs)/Home");
    } catch (err) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#0f0" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#0f0" secureTextEntry onChangeText={setPassword} value={password} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="./signup"><Text style={styles.link}>Create Account</Text></Link>
      <Link href="./forgotPassword"><Text style={styles.link}>Forgot Password?</Text></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#000" },
  title: { fontSize: 28, fontWeight: "bold", color: "#0f0", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#0f0", borderRadius: 8, padding: 12, marginVertical: 8, color: "#fff" },
  button: { backgroundColor: "#0f0", padding: 15, borderRadius: 8, marginTop: 15 },
  buttonText: { textAlign: "center", color: "#000", fontWeight: "bold" },
  link: { color: "#0f0", textAlign: "center", marginTop: 10 }
});
