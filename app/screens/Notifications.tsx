import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Notification = {
  id: string;
  title: string;
  date: string;
  time: string;
};

const notifications: { section: string; data: Notification[] }[] = [
  {
    section: "Today",
    data: [
      { id: "1", title: "New Workout Is Available", date: "June 10", time: "10:00 AM" },
      { id: "2", title: "Don't Forget To Drink Water", date: "June 10", time: "8:00 AM" },
    ],
  },
  {
    section: "Yesterday",
    data: [
      { id: "3", title: "Upper Body Workout Completed!", date: "June 09", time: "6:00 PM" },
      { id: "4", title: "Remember Your Exercise Session", date: "June 09", time: "3:00 PM" },
    ],
  },
  {
    section: "May 29 - 2025",
    data: [
      { id: "5", title: "You Started A New Challenge!", date: "May 29", time: "9:00 AM" },
      { id: "6", title: "New House Training Ideas!", date: "May 29", time: "8:29 AM" },
      { id: "7", title: "We’ve Detected A Login From A New Device", date: "June 10", time: "5:00 AM" },
    ],
  },
];

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
        <FontAwesome name="arrow-left" size={20}/>
      </TouchableOpacity>
      <Text style={styles.header}>Notification</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.section}</Text>
            {item.data.map((notif) => (
              <TouchableOpacity key={notif.id} style={styles.card}>
                <Ionicons name="notifications-circle" size={28} color="#3B82F6" />
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
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 50 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#444" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  title: { fontSize: 15, fontWeight: "500", color: "#111" },
  time: { fontSize: 13, color: "#666", marginTop: 2 },
});
