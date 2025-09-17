import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function ProgressTracking() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [kcal, setKcal] = useState("");

  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData(data);
          setWorkouts(data.workouts || []);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleAddActivity = async () => {
    if (activity && duration && kcal) {
      const newWorkout = {
        title: activity,
        duration: `${duration} Mins`,
        kcal: parseInt(kcal),
      };
      const updatedWorkouts = [...workouts, newWorkout];

      try {
        await updateDoc(doc(db, "users", user.uid), {
          workouts: arrayUnion(newWorkout),
        });
        setWorkouts(updatedWorkouts);
        setActivity("");
        setDuration("");
        setKcal("");
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error", "Failed to add activity.");
      }
    } else {
      Alert.alert("Validation", "Please fill in all fields.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#39FF14" }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      nestedScrollEnabled
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.header}>Progress Tracking</Text>

      {profileData && (
        <View style={styles.profile}>
          <View>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.age}>Age: {profileData.age}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.stat}>{profileData.weight} Kg</Text>
              <Text style={[styles.stat, { marginLeft: 15 }]}>
                {profileData.height} m
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/20.jpg" }}
            style={styles.avatar}
          />
        </View>
      )}

      <Text style={styles.subHeader}>Your Workouts</Text>
      <FlatList
        data={workouts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.workoutCard}>
            <View style={styles.iconCircle}>
              <Text style={{ color: "#000", fontSize: 18 }}>🏃</Text>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Activity</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Activity</Text>
            <TextInput
              style={styles.input}
              placeholder="Activity name"
              placeholderTextColor="#666"
              value={activity}
              onChangeText={setActivity}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration (min)"
              placeholderTextColor="#666"
              value={duration}
              keyboardType="numeric"
              onChangeText={setDuration}
            />
            <TextInput
              style={styles.input}
              placeholder="Calories"
              placeholderTextColor="#666"
              value={kcal}
              keyboardType="numeric"
              onChangeText={setKcal}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddActivity}
            >
              <Text style={styles.modalButtonText}>Add Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingVertical: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#39FF14" },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 15,
  },
  name: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  age: { fontSize: 14, color: "#aaa" },
  statsRow: { flexDirection: "row", marginTop: 5 },
  stat: {
    fontSize: 14,
    backgroundColor: "#1a1a1a",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#39FF14",
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  subHeader: { fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#39FF14" },
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#39FF14",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  workoutTitle: { fontSize: 15, fontWeight: "bold", color: "#fff" },
  workoutDesc: { fontSize: 13, color: "#aaa" },
  workoutTime: { fontSize: 13, fontWeight: "bold", color: "#39FF14" },
  addButton: {
    backgroundColor: "#39FF14",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#000", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#39FF14" },
  input: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: "#fff",
  },
  modalButton: {
    backgroundColor: "#39FF14",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: { color: "#000", fontWeight: "bold" },
});
