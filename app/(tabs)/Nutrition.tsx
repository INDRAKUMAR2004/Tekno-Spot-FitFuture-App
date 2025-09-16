import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { useRouter } from "expo-router";

const foodItems = [
  { name: "Apple", calories: 87 },
  { name: "Banana Ripe", calories: 117 },
  { name: "Roti/Chapathy", calories: 117 },
];

export default function NutritionOverview() {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
       {/* Header */}
            <Text style={styles.header}>Nutrition</Text>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tabs}>
        {["Breakfast", "Morning Snack", "Lunch", "Evening Snack", "Dinner"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab, ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>

      {/* Total Calories + Pie Chart */}
      <View style={styles.caloriesSection}>
        <View>
          <Text style={styles.totalCaloriesLabel}>Total Calories</Text>
          <Text style={styles.totalCaloriesValue}>450 Kcal</Text>
        </View>
        <Progress.Circle
          size={80}
          progress={0.65}
          showsText={false}
          color="#3B82F6"
          unfilledColor="#ddd"
          borderWidth={0}
        />
      </View>

      {/* Macronutrient Card */}
      <View style={styles.macrosCard}>
        <View style={styles.macroItem}><Text style={styles.macroLabel}>Carbs</Text><Text>50 g</Text></View>
        <View style={styles.macroItem}><Text style={styles.macroLabel}>Protein</Text><Text>30 g</Text></View>
        <View style={styles.macroItem}><Text style={styles.macroLabel}>Fat</Text><Text>18 g</Text></View>
        <Text style={styles.goalText}>You’ve reached 35% of your daily protein goal.</Text>
      </View>

      {/* Meals */}
      {["Breakfast", "Morning Snack", "Lunch"].map((section) => (
        <View key={section} style={styles.mealSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.mealTitle}>{section}</Text>
            <TouchableOpacity onPress={() => router.push("/screens/AddFood")}>
              <Text style={styles.addFoodText}>Add food</Text>
            </TouchableOpacity>
          </View>

          {section === "Breakfast" ? (
            <>
              <View style={styles.foodItem}>
                <Text>Oats with milk (1 Cup)</Text>
                <Text>250 Kcal</Text>
              </View>
              <View style={styles.foodItem}>
                <Text>Banana (1 Medium)</Text>
                <Text>100 Kcal</Text>
              </View>
              <View style={styles.foodItem}>
                <Text>Almonds (10 Pieces)</Text>
                <Text>100 Kcal</Text>
              </View>
            </>
          ) : (
            <Text style={styles.placeholderText}>
              Fuel the gap between sunrise and lunch. 🍴
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fafafa", paddingVertical: 40, },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  tabs: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20,},
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#eee", },
  activeTab: { backgroundColor: "#3B82F6",  },
  tabText: { fontSize: 14, color: "#333" },
  activeTabText: { color: "#fff" },
  caloriesSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  totalCaloriesLabel: { fontSize: 18 },
  totalCaloriesValue: { fontSize: 32, fontWeight: "bold" },
  macrosCard: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 20 },
  macroItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  macroLabel: { fontWeight: "bold" },
  goalText: { fontSize: 12, color: "#555", marginTop: 10 },
  mealSection: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  mealTitle: { fontSize: 18, fontWeight: "bold" },
  addFoodText: { color: "#3B82F6" },
  foodItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 10 },
  placeholderText: { fontStyle: "italic", color: "#999" },
});
