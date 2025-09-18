import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function ChallengeOverview() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
          <FontAwesome name="arrow-left" size={22} color="#39FF14" />
        </TouchableOpacity>
        <Text style={styles.header}>Core Challenge</Text>
      </View>

      <Text style={styles.description}>
        5-10 min abs workout daily • Planks, crunches, leg raises{"\n"}
        <Text style={{ fontWeight: "bold", color: "#39FF14" }}>
          Goal: Stronger core & better posture
        </Text>
      </Text>

      <Progress.Bar
        progress={0.3}
        width={null}
        height={12}
        color="#39FF14"
        unfilledColor="#222"
        borderWidth={0}
        style={styles.progress}
      />

      <View style={styles.timeline}>
        <Text style={styles.timelineHeader}>Week 1</Text>
        <View style={styles.daysRow}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <View key={day} style={styles.dayCircle}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.timelineHeader}>Week 2</Text>
        <View style={styles.daysRow}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <View key={day} style={styles.dayCircle}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/DayExercises")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark background
    padding: 20,
    paddingVertical: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#39FF14",
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 15,
    lineHeight: 22,
  },
  progress: {
    marginBottom: 20,
  },
  timeline: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#39FF14",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  timelineHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#39FF14",
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#39FF14",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#39FF14",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#39FF14",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
