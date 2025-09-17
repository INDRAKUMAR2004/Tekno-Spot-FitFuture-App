import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert,
ScrollView,
KeyboardAvoidingView,
Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function SignUpScreen() {
const { signup, loading } = useAuth();
const router = useRouter();

const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [age, setAge] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");

const submit = async () => {
if (!name || !phone || !email || !password || !age || !height || !weight) {
Alert.alert("Error", "Please fill in all fields.");
return;
}

try {
  await signup(
    email,
    password,
    name,
    parseInt(age),
    height,
    weight
  );
  router.push("/auth/login");
} catch (err: any) {
  Alert.alert("Signup error", err.message || String(err));
}


};

return (
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
style={[styles.container, { paddingTop: 100 }]}
>
<ScrollView contentContainerStyle={styles.container}>
<Text style={styles.title}>Create Account</Text>

    <TextInput
      style={styles.input}
      placeholder="Full Name"
      placeholderTextColor="#0f0"
      value={name}
      onChangeText={setName}
    />
    <TextInput
      style={styles.input}
      placeholder="Phone Number"
      placeholderTextColor="#0f0"
      value={phone}
      onChangeText={setPhone}
      keyboardType="phone-pad"
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="#0f0"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#0f0"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    <TextInput
      style={styles.input}
      placeholder="Age (years)"
      placeholderTextColor="#0f0"
      value={age}
      onChangeText={setAge}
      keyboardType="numeric"
    />
    <TextInput
      style={styles.input}
      placeholder="Height (e.g., 1.75 m)"
      placeholderTextColor="#0f0"
      value={height}
      onChangeText={setHeight}
    />
    <TextInput
      style={styles.input}
      placeholder="Weight (e.g., 70 kg)"
      placeholderTextColor="#0f0"
      value={weight}
      onChangeText={setWeight}
    />

    <TouchableOpacity
      style={styles.button}
      onPress={submit}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? "Signing up..." : "Sign Up"}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/auth/login")}>
      <Text style={styles.link}>
        Already have an account? Login
      </Text>
    </TouchableOpacity>
  </ScrollView>
</KeyboardAvoidingView>


);
}

const styles = StyleSheet.create({
container: {
flexGrow: 1,
justifyContent: "center",
padding: 20,
backgroundColor: "#000",
},
title: {
fontSize: 28,
fontWeight: "bold",
color: "#0f0",
marginBottom: 20,
textAlign: "center",
},
input: {
borderWidth: 1,
borderColor: "#0f0",
borderRadius: 8,
padding: 12,
marginVertical: 8,
color: "#fff",
},
button: {
backgroundColor: "#0f0",
padding: 15,
borderRadius: 8,
marginTop: 15,
},
buttonText: {
textAlign: "center",
color: "#000",
fontWeight: "bold",
},
link: {
marginTop: 20,
color: "#0f0",
textAlign: "center",
},
});