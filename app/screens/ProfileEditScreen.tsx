import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useProfile } from "../../context/ProfileContext";

export default function ProfileEditScreen() {
  const { profile, setProfile } = useProfile();
  const router = useRouter();

  const [name, setName] = useState(profile?.name);
  const [email, setEmail] = useState(profile?.email);
  const [phone, setPhone] = useState(profile?.phone);
  const [weight, setWeight] = useState(profile?.weight);
  const [height, setHeight] = useState(profile?.height);

  const handleUpdate = () => {
    setProfile({ name, email, phone, weight, height });
    router.back(); // go back to Profile screen
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => router.push("/screens/Profile")}><FontAwesome name="arrow-left" size={20}/></TouchableOpacity>
      <Text style={styles.header}>My Profile</Text>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/20.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{weight}</Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>28</Text>
          <Text style={styles.infoLabel}>Years Old</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{height}</Text>
          <Text style={styles.infoLabel}>Height</Text>
        </View>
      </View>

     <KeyboardAvoidingView>
         <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full Name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Mobile Number" />
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Weight" />
      <TextInput style={styles.input} value={height} onChangeText={setHeight} placeholder="Height" />

      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>
     </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
  header: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  avatar: { width: 90, height: 90, borderRadius: 45, alignSelf: "center" },
  name: { fontSize: 18, fontWeight: "600", textAlign: "center", marginTop: 10 },
  email: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 },
  infoRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  infoBox: { alignItems: "center", backgroundColor: "#3B82F6", padding: 12, borderRadius: 8, minWidth: 80 },
  infoText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  infoLabel: { fontSize: 12, color: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 12 },
  updateBtn: { backgroundColor: "#3B82F6", padding: 14, borderRadius: 30, alignItems: "center", marginTop: 10 },
  updateText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
