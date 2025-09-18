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
import { useAuth } from "@/context/AuthContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading } = useProfile();
  const { logout } = useAuth();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#39FF14" />
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
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
        <FontAwesome name="arrow-left" size={20} color="#39FF14" />
      </TouchableOpacity>

      <Text style={styles.header}>My Profile</Text>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/20.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>

      {/* Info Boxes */}
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

      {/* Menu Items */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/screens/ProfileEditScreen")}
      >
        <Ionicons name="person" size={20} color="#39FF14" />
        <Text style={styles.menuText}>Edit Profile</Text>
        <Ionicons name="chevron-forward" size={20} color="#39FF14" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="star" size={20} color="#39FF14" />
        <Text style={styles.menuText}>Favorite</Text>
        <Ionicons name="chevron-forward" size={20} color="#39FF14" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="lock-closed" size={20} color="#39FF14" />
        <Text style={styles.menuText}>Work Settings</Text>
        <Ionicons name="chevron-forward" size={20} color="#39FF14" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="settings" size={20} color="#39FF14" />
        <Text style={styles.menuText}>Settings</Text>
        <Ionicons name="chevron-forward" size={20} color="#39FF14" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        onPress={async () => {
          try {
            await logout();
            router.replace("/auth/login");
          } catch (error) {
            console.log(error);
          }
        }}
        style={styles.menuItem}
      >
        <Ionicons name="log-out" size={20} color="#EF4444" />
        <Text style={[styles.menuText, { color: "#EF4444" }]}>Logout</Text>
        <Ionicons name="chevron-forward" size={20} color="#39FF14" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingTop: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  header: {
    fontSize: 22,
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#222",
  },
  menuText: { marginLeft: 12, fontSize: 15, fontWeight: "500", color: "#39FF14" },
  errorText: { fontSize: 16, color: "red", marginBottom: 10 },
  loginButton: { backgroundColor: "#39FF14", padding: 12, borderRadius: 8 },
  loginButtonText: { color: "#000", fontWeight: "bold" },
});
