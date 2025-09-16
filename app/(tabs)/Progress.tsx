import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";

export default function ProgressTracking() {
  const [modalVisible, setModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState([
    { kcal: 120, title: "Upper Body Workout", duration: "30 Mins" },
    { kcal: 130, title: "Pull Out", duration: "30 Mins" },
  ]);

  // Fake data for chart
  const chartData = [
    { day: 10, duration: 2 },
    { day: 12, duration: 1 },
    { day: 14, duration: 5 },
    { day: 16, duration: 3 },
    { day: 18, duration: 4 },
    { day: 20, duration: 5 },
    { day: 22, duration: 1 },
    { day: 24, duration: 3 },
    { day: 26, duration: 2 },
    { day: 28, duration: 5 },
    { day: 30, duration: 1 },
  ];

  // Input fields for modal
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [kcal, setKcal] = useState("");

  const handleAddActivity = () => {
    if (activity && duration && kcal) {
      setWorkouts((prev) => [
        ...prev,
        { title: activity, duration: `${duration} Mins`, kcal: parseInt(kcal) },
      ]);
      setActivity("");
      setDuration("");
      setKcal("");
      setModalVisible(false);
    }
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Header */}
      <Text style={styles.header}>Progress Tracking</Text>

      {/* Profile */}
      <View style={styles.profile}>
        <View>
          <Text style={styles.name}>Pavithra</Text>
          <Text style={styles.age}>Age: 28</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>75 Kg</Text>
            <Text style={[styles.stat, { marginLeft: 15 }]}>1.65 m</Text>
          </View>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.avatar}
        />
      </View>

      {/* Week Selector */}
      <View style={styles.weekRow}>
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dayBtn, i === 1 && styles.activeDay]}
          >
            <Text style={[styles.dayText, i === 1 && styles.activeDayText]}>
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dates Row */}
      <View style={styles.dateRow}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View
            key={i}
            style={[styles.dateCircle, i === 4 && styles.activeDate]}
          >
            <Text style={[styles.dateText, i === 4 && styles.activeDateText]}>
              {i + 1}
            </Text>
          </View>
        ))}
      </View>

      {/* Custom Duration Chart */}
      <Text style={styles.subHeader}>Duration</Text>
      <View style={styles.chartContainer}>
        {chartData.map((item, index) => {
          const maxHeight = 120; // px max height for bars
          const barHeight = (item.duration / 5) * maxHeight; // scale duration (max 5 here)
          return (
            <View key={index} style={styles.barWrapper}>
              <View style={[styles.bar, { height: barHeight }]} />
              <Text style={styles.barLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>

      {/* Workouts */}
      <Text style={styles.subHeader}>Aug 2025</Text>
      <FlatList
        data={workouts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.workoutCard}>
            <View style={styles.iconCircle}>
              <Text style={{ color: "#fff", fontSize: 18 }}>🏃</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutTitle}>{item.title}</Text>
              <Text style={styles.workoutDesc}>{item.kcal} Kcal</Text>
            </View>
            <Text style={styles.workoutTime}>{item.duration}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      {/* Add Activity Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Activity</Text>
      </TouchableOpacity>

      {/* Add Activity Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Activity</Text>
            <TextInput
              style={styles.input}
              placeholder="Activity name"
              value={activity}
              onChangeText={setActivity}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration (min)"
              value={duration}
              keyboardType="numeric"
              onChangeText={setDuration}
            />
            <TextInput
              style={styles.input}
              placeholder="Calories"
              value={kcal}
              keyboardType="numeric"
              onChangeText={setKcal}
            />
            <TouchableOpacity style={[styles.modalButton, {paddingBottom: 10}]} onPress={handleAddActivity}>
              <Text style={styles.modalButtonText}>Add Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingVertical: 40, },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  name: { fontSize: 20, fontWeight: "bold" },
  age: { fontSize: 14, color: "#555" },
  statsRow: { flexDirection: "row", marginTop: 5 },
  stat: {
    fontSize: 14,
    backgroundColor: "#f2f2f2",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 10 },
  activeDay: { backgroundColor: "#2E8BFF" },
  dayText: { fontSize: 12 },
  activeDayText: { color: "#fff", fontWeight: "bold" },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDate: { backgroundColor: "#2E8BFF" },
  dateText: { fontSize: 12, color: "#333" },
  activeDateText: { color: "#fff", fontWeight: "bold" },
  subHeader: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },

  // Chart
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginVertical: 20,
    height: 140,
  },
  barWrapper: { alignItems: "center", flex: 1 },
  bar: {
    width: 18,
    backgroundColor: "#2E8BFF",
    borderRadius: 6,
    marginBottom: 5,
  },
  barLabel: { fontSize: 10, color: "#444" },

  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2E8BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  workoutTitle: { fontSize: 15, fontWeight: "bold" },
  workoutDesc: { fontSize: 13, color: "#666" },
  workoutTime: { fontSize: 13, fontWeight: "bold", color: "#444" },
  addButton: {
    backgroundColor: "#2E8BFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#2E8BFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});
