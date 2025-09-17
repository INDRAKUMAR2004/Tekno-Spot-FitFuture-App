import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Notification = {
  id: string;
  title: string;
  date: string;
  time: string;
};

type NotificationSection = {
  section: string;
  data: Notification[];
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<NotificationSection[]>([]);

  useEffect(() => {
    // Simulate fetching from backend (replace with Firebase/Node API later)
    const fetchNotifications = async () => {
      const userData: NotificationSection[] = [
        {
          section: "Today",
          data: [
            { id: "1", title: "New Workout Is Available", date: "Sept 17", time: "10:00 AM" },
            { id: "2", title: "Don’t Forget To Drink Water", date: "Sept 17", time: "8:00 AM" },
          ],
        },
        {
          section: "Yesterday",
          data: [
            { id: "3", title: "Upper Body Workout Completed!", date: "Sept 16", time: "6:00 PM" },
            { id: "4", title: "Remember Your Exercise Session", date: "Sept 16", time: "3:00 PM" },
          ],
        },
      ];
      setNotifications(userData);
    };

    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/(tabs)/Home")} style={styles.backBtn}>
        <FontAwesome name="arrow-left" size={20} color="#39FF14" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Notifications</Text>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.section}</Text>
            {item.data.map((notif) => (
              <TouchableOpacity key={notif.id} style={styles.card}>
                <Ionicons name="notifications-circle" size={28} color="#39FF14" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.title}>{notif.title}</Text>
                  <Text style={styles.time}>
                    {notif.date} - {notif.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 16,
    paddingTop: 50,
  },
  backBtn: {
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#39FF14",
    textShadowColor: "#39FF14",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#39FF14",
    textShadowColor: "#39FF14",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111", // Dark card
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#39FF14", // Neon border
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  time: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 2,
  },
});
