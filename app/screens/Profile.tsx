import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProfile } from "../../context/ProfileContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAuth } from "@/context/AuthContext";


export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading } = useProfile();
  const { logout } = useAuth();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No user profile found. Please log in.</Text>
        <TouchableOpacity
          onPress={() => router.replace("/auth/login")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
        <FontAwesome name="arrow-left" size={20} />
      </TouchableOpacity>

      <Text style={styles.header}>My Profile</Text>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{profile.weight || "N/A"}</Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{profile.age || "N/A"}</Text>
          <Text style={styles.infoLabel}>Age</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{profile.height || "N/A"}</Text>
          <Text style={styles.infoLabel}>Height</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/screens/ProfileEditScreen")}
      >
        <Ionicons name="person" size={20} color="#3B82F6" />
        <Text style={styles.menuText}>Edit Profile</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="star" size={20} color="#3B82F6" />
        <Text style={styles.menuText}>Favorite</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="lock-closed" size={20} color="#3B82F6" />
        <Text style={styles.menuText}>Work Settings</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="settings" size={20} color="#3B82F6" />
        <Text style={styles.menuText}>Settings</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
onPress={async () => {
try {
await logout();
router.replace("/auth/login"); // Navigate to login screen after logout
} catch (error) {

}
}}
style={styles.menuItem}>

<Ionicons name="log-out" size={20} color="#EF4444" /> <Text style={[styles.menuText, { color: "#EF4444" }]}>Logout</Text> <Ionicons name="chevron-forward" size={20} color="#888" style={{ marginLeft: "auto" }} /> </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, alignSelf: "center" },
  name: { fontSize: 18, fontWeight: "600", textAlign: "center", marginTop: 10 },
  email: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  infoBox: {
    alignItems: "center",
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  infoText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  infoLabel: { fontSize: 12, color: "#fff" },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuText: { marginLeft: 12, fontSize: 15, fontWeight: "500", color: "#111" },
  errorText: { fontSize: 16, color: "red", marginBottom: 10 },
  loginButton: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 8,
  },
  loginButtonText: { color: "#fff", fontWeight: "bold" },
});
