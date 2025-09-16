import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function DiscoverScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Discover</Text>

      {/* Big Challenge Card */}
      <TouchableOpacity style={styles.heroCard} onPress={() => router.push("/screens/WorkoutOverview")}>
        <Image source={require("../Components/Images/plank.png")} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>30-Days Plank Challenge</Text>
          <Text style={styles.heroSubtitle}>Strengthen Your Core Day By Day With Progressive Planks.</Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Recommended Section */}
      <Text style={styles.sectionTitle}>Recommended For You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { title: "Core & Cardio Fusion", duration: "30 Min • Core", img: require("../Components/Images/bicycle.png") },
          { title: "Sunrise Stretch Flow", duration: "20 Min • Full Body", img: require("../Components/Images/russian.png") },
          { title: "Upper-Body Power", duration: "25 Min • Strength", img: require("../Components/Images/legraises.png") },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.smallCard} onPress={() => router.push("/screens/WorkoutOverview")}>
            <Image source={item.img} style={styles.smallImage} />
            <Text style={styles.smallTitle}>{item.title}</Text>
            <Text style={styles.smallSubtitle}>{item.duration}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Another Banner */}
      <TouchableOpacity style={styles.banner}>
        <Image source={require("../Components/Images/plank.png")} style={styles.bannerImage} />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerText}>Your Muscles Are Ready. Let's Build Strength.</Text>
        </View>
      </TouchableOpacity>

      {/* Next-Level Section */}
      <Text style={styles.sectionTitle}>Next-Level Sessions</Text>
      <ScrollView style={{paddingBottom: 50}} horizontal showsHorizontalScrollIndicator={false}>
        {[
          { title: "Cardio Blast", img: require("../Components/Images/bicycle.png") },
          { title: "Core Burn", img: require("../Components/Images/russian.png") },
          { title: "Endurance Row Circuit", img: require("../Components/Images/legraises.png") },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.smallCard} onPress={() => router.push("/screens/WorkoutOverview")}>
            <Image source={item.img} style={styles.smallImage} />
            <Text style={styles.smallTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingVertical: 40, },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  heroCard: { borderRadius: 15, overflow: "hidden", marginBottom: 20 },
  heroImage: { width: "100%", height: 180, borderRadius: 15 },
  heroOverlay: { position: "absolute", bottom: 20, left: 20, right: 20 },
  heroTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  heroSubtitle: { fontSize: 14, color: "#eee", marginVertical: 4 },
  heroButton: { backgroundColor: "#2E8BFF", paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8, marginTop: 6 },
  heroButtonText: { color: "#fff", fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  smallCard: { marginRight: 12, width: 150 },
  smallImage: { width: "100%", height: 90, borderRadius: 10 },
  smallTitle: { fontWeight: "600", marginTop: 6 },
  smallSubtitle: { fontSize: 12, color: "#666" },
  banner: { marginVertical: 20, borderRadius: 15, overflow: "hidden" },
  bannerImage: { width: "100%", height: 150 },
  bannerOverlay: { position: "absolute", left: 20, right: 20, bottom: 20 },
  bannerText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});
