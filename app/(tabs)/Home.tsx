import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useProfile } from "../../context/ProfileContext";
import ChallengeCard from "../Components/Elements/challengeCard";
import ExerciseCard from "../Components/Elements/ExerciseCard";
import Header from "../Components/Elements/Header";
import HomeBanner from "../Components/Elements/HomeBanner";
import WorkoutCard from "../Components/Elements/WorkoutCard";

export default function Home() {
  const [text, setText] = useState("");
  const profile = useProfile();

  const workouts = [
    {
      title: "Full-Body Circuit",
      description: "Balanced strength and cardio moves.",
      details: "30 minutes/8 exercises (5 strength + 3 cardio)",
      image: require("../Components/Images/fbc.jpg"),
    },
    {
      title: "Morning Energy Flow",
      description: "Gentle stretches and light cardio.",
      details: "20 minutes/5 exercises (stretch & mobility focus)",
      image: require("../Components/Images/mef.jpg"),
    },
    {
      title: "Strength Challenge",
      description: "Balanced strength and cardio moves.",
      details: "30 minutes/8 exercises (upper, lower, core)",
      image: require("../Components/Images/sc.jpg"),
    },
    {
      title: "Cardio Blast",
      description: "High-energy moves to boost heart rate.",
      details: "25 minutes/6 exercises (cardio mix)",
      image: require("../Components/Images/cb.jpg"),
    },
    {
      title: "Lower-Body Power",
      description: "Targets legs and glutes.",
      details: "30 minutes/7 exercises (squats, lunges, bridges)",
      image: require("../Components/Images/lbp.jpg"),
    },
    {
      title: "Upper-Body Sculpt",
      description: "Focuses on arms, chest, back.",
      details: "30 minutes/7 exercises (push-ups, rows, presses)",
      image: require("../Components/Images/ubs.jpg"),
    },
  ];

  const tophits = [
    {
      title: "Power HIIT Blast",
      description: "Fast, high-intensity intervals to torch calories and boost stamina.",
      details: "25 minutes. 6 Exercise",
      image: require("../Components/Images/hiit.jpg"),
    },
    {
      title: "Morning Yoga Flow",
      description: "Gentle stretches and breathing to wake up your body and mind.",
      details: "25 minutes. 6 Exercise",
      image: require("../Components/Images/myf.jpg"),
    },
    {
      title: "Cardio Kickboxing",
      description: "Punch and kick your way through a high-energy cardio session.",
      details: "25 minutes. 6 Exercise",
      image: require("../Components/Images/ckb.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Header />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: 25 }}>
          <View style={styles.searchBoxContainer}>
            <FontAwesome name="search" size={18} style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              value={text}
              onChangeText={setText}
              style={styles.input}
              placeholderTextColor="#39FF14"
            />
          </View>
        </View>

        {/* Banner */}
        <View style={{ paddingTop: 20 }}>
          <HomeBanner />
        </View>

        {/* Challenges Section */}
        <View style={{ flex: 1, alignItems: "flex-start", marginTop: 20 }}>
          <Text style={styles.title}>Challenges</Text>
          <ScrollView
            style={{ marginTop: -40 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.bannercontainer}
          >
            <ChallengeCard
              days="14-Day"
              title="Core Challenge"
              points={["5-10 min abs workout daily", "Planks, crunches, leg raises"]}
              goal="Stronger core & better posture"
              image={require("../Components/Images/girl1.png")}
              imageStyle={{
                width: 200,
                height: 200,
                bottom: 42,
                right: -170,
                transform: [{ rotate: "42deg" }],
              }}
              targetScreen="./screens/CoreChallenge"
            />
            <ChallengeCard
              days="7-Day"
              title="Full Body Burn"
              points={["15-20 min workouts", "Squats, pushups, burpees"]}
              goal="Boost stamina & burn calories"
              image={require("../Components/Images/workout.png")}
              imageStyle={{
                width: 150,
                height: 100,
                right: -120,
                bottom: 10,
                transform: [{ rotateY: "-180deg" }],
              }}
              targetScreen="./screens/CoreChallenge"
            />
            <ChallengeCard
              days="30-Day"
              title="Yoga Flow"
              points={["20 min daily yoga", "Improve flexibility & calmness"]}
              goal="Improve Mobility"
              image={require("../Components/Images/bend.png")}
              imageStyle={{
                width: 170,
                height: 150,
                top: 15,
                right: -100,
                transform: [{ rotateX: "40deg" }],
              }}
              targetScreen="./screens/CoreChallenge"
            />
            <ChallengeCard
              days="21-Day"
              title="Strength Challenge"
              points={["Progressive push-ups", "Jump squats, sprints"]}
              goal="Build Strength & muscle tone"
              image={require("../Components/Images/arms.png")}
              imageStyle={{
                width: 100,
                height: 150,
                bottom: 0,
                right: -160,
                transform: [{ rotateY: "-180deg" }],
              }}
              targetScreen="./screens/CoreChallenge"
            />
          </ScrollView>
        </View>

        {/* Made for You Section */}
        <View style={{ flex: 1, alignItems: "flex-start", marginTop: -50 }}>
          <Text style={styles.title}>Made for You</Text>
          <Text style={styles.subtitle}>
            Personalized workouts to match your goals.
          </Text>
        </View>

        <FlatList
          data={workouts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <WorkoutCard
              title={item.title}
              description={item.description}
              details={item.details}
              image={item.image}
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Our Favourites Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Our Favourites</Text>
          <Text style={styles.subtitle}>
            Curated workouts we love and know you’ll enjoy too.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <ExerciseCard
              title="Squat Exercise"
              duration="12 Minutes"
              calories="120 Kcal"
              image={require("../Components/Images/squat.jpg")}
            />
            <ExerciseCard
              title="Core Crusher"
              duration="25 Minutes"
              calories="180 Kcal"
              image={require("../Components/Images/corecrusher.jpg")}
            />
            <ExerciseCard
              title="Cardio Kick"
              duration="25 Minutes"
              calories="200 Kcal"
              image={require("../Components/Images/cardio.jpg")}
            />
          </ScrollView>
        </View>

        {/* Top Hits Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Top Hits</Text>
          <Text style={styles.subtitle}>
            Your must-try workouts everyone's loving right now.
          </Text>
          <FlatList
            data={tophits}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <WorkoutCard
                title={item.title}
                description={item.description}
                details={item.details}
                image={item.image}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000", flex: 1 },
  header: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#39FF14",
  },
  searchIcon: { color: "#39FF14", marginRight: 10 },
  input: {
    flex: 1,
    fontWeight: "300",
    fontSize: 15,
    color: "#39FF14",
  },
  title: { paddingHorizontal: 40, fontWeight: "700", fontSize: 25, color: "#39FF14" },
  subtitle: { paddingVertical: 5, paddingHorizontal: 40, fontWeight: "400", fontSize: 12, color: "#39FF14" },
  bannercontainer: { paddingVertical: 60, paddingHorizontal: 30 },
  sectionContainer: { marginTop: 20 },
  sectionTitle: { paddingHorizontal: 40, fontWeight: "700", fontSize: 20, color: "#39FF14" },
});
