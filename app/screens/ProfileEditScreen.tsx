import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from "react-native";
import { useProfile } from "../../context/ProfileContext";

export default function ProfileEditScreen() {
  const { profile, setProfile } = useProfile();
  const router = useRouter();

  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [weight, setWeight] = useState(profile?.weight || "");
  const [height, setHeight] = useState(profile?.height || "");
  const [age, setAge] = useState(profile?.age || "");

  const handleUpdate = () => {
    setProfile({ name, email, phone, weight, height, age });
    router.back(); // go back to Profile screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/screens/Profile")}>
        <FontAwesome name="arrow-left" size={20} color="#39FF14" />
      </TouchableOpacity>

      <Text style={styles.header}>Edit Profile</Text>

      {/* Avatar */}
      <Image
        source={{ uri: profile?.avatar || "https://randomuser.me/api/portraits/men/20.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      {/* Info boxes */}
      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{weight || "N/A"}</Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{age || "N/A"}</Text>
          <Text style={styles.infoLabel}>Age</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{height || "N/A"}</Text>
          <Text style={styles.infoLabel}>Height</Text>
        </View>
      </View>

      {/* Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Mobile Number"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Weight"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Height"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Age"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingTop: 40 },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#39FF14",
  },
  avatar: { width: 90, height: 90, borderRadius: 45, alignSelf: "center" },
  name: { fontSize: 18, fontWeight: "600", textAlign: "center", marginTop: 10, color: "#39FF14" },
  email: { fontSize: 14, color: "#ccc", textAlign: "center", marginBottom: 20 },
  infoRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  infoBox: {
    alignItems: "center",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#39FF14",
  },
  infoText: { fontSize: 16, fontWeight: "700", color: "#39FF14" },
  infoLabel: { fontSize: 12, color: "#ccc" },
  input: {
    borderWidth: 1,
    borderColor: "#39FF14",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#39FF14",
    backgroundColor: "#111",
  },
  updateBtn: {
    backgroundColor: "#39FF14",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  updateText: { color: "#000", fontSize: 16, fontWeight: "600" },
});
