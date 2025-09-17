import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // <-- update path if needed

const db = getFirestore(app);

export default function NutritionOverview() {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [meals, setMeals] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, carbs: 0, protein: 0, fat: 0 });

  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  // Fetch user meals dynamically
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users", user.uid, "meals"), where("type", "==", activeTab));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedMeals: ((prevState: never[]) => never[]) | { id: string; }[] = [];
      let totalCalories = 0, totalCarbs = 0, totalProtein = 0, totalFat = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMeals.push({ id: doc.id, ...data });

        totalCalories += data.calories || 0;
        totalCarbs += data.carbs || 0;
        totalProtein += data.protein || 0;
        totalFat += data.fat || 0;
      });

      setMeals(fetchedMeals);
      setTotals({ calories: totalCalories, carbs: totalCarbs, protein: totalProtein, fat: totalFat });
    });

    return () => unsubscribe();
  }, [user, activeTab]);

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
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Calories Summary */}
      <View style={styles.caloriesSection}>
        <View>
          <Text style={styles.totalCaloriesLabel}>Total Calories</Text>
          <Text style={styles.totalCaloriesValue}>{totals.calories} Kcal</Text>
        </View>
        <Progress.Circle
          size={80}
          progress={totals.calories / 2000} // assume 2000 kcal daily goal
          showsText={false}
          color="#39FF14"
          unfilledColor="#333"
          borderWidth={0}
        />
      </View>

      {/* Macronutrient Card */}
      <View style={styles.macrosCard}>
        <View style={styles.macroItem}><Text style={styles.macroLabel}>Carbs</Text><Text style={styles.macroValue}>{totals.carbs} g</Text></View>
        <View style={styles.macroItem}><Text style={styles.macroLabel}>Protein</Text><Text style={styles.macroValue}>{totals.protein} g</Text></View>
        <View style={styles.macroItem}><Text style={styles.macroLabel}>Fat</Text><Text style={styles.macroValue}>{totals.fat} g</Text></View>
        <Text style={styles.goalText}>You’ve reached {(totals.protein / 100 * 100).toFixed(1)}% of your daily protein goal.</Text>
      </View>

      {/* Meals List */}
      <View style={styles.mealSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.mealTitle}>{activeTab}</Text>
          <TouchableOpacity onPress={() => router.push("/screens/AddFood")}>
            <Text style={styles.addFoodText}>+ Add food</Text>
          </TouchableOpacity>
        </View>

        {meals.length > 0 ? (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.foodItem}>
                <Text style={styles.foodItemText}>{item.foodName}</Text>
                <Text style={styles.foodItemText}>{item.calories} Kcal</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.placeholderText}>No food added yet. 🍴</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000", paddingVertical: 40 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#39FF14" },
  tabs: { flexDirection: "row", marginBottom: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#333", marginRight: 8 },
  activeTab: { backgroundColor: "#39FF14" },
  tabText: { fontSize: 14, color: "#ccc" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  caloriesSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  totalCaloriesLabel: { fontSize: 18, color: "#39FF14" },
  totalCaloriesValue: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  macrosCard: { backgroundColor: "#1a1a1a", borderRadius: 10, padding: 15, marginBottom: 20 },
  macroItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  macroLabel: { fontWeight: "bold", color: "#39FF14" },
  macroValue: { color: "#fff" },
  goalText: { fontSize: 12, color: "#ccc", marginTop: 10 },
  mealSection: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  mealTitle: { fontSize: 18, fontWeight: "bold", color: "#39FF14" },
  addFoodText: { color: "#39FF14" },
  foodItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#1a1a1a", padding: 10, borderRadius: 10, marginBottom: 10 },
  foodItemText: { color: "#fff" },
  placeholderText: { fontStyle: "italic", color: "#666" },
});
