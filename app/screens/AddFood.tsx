import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // adjust path if needed

const db = getFirestore(app);

const foodItems = [
  { name: "Apple", calories: 87, carbs: 22, protein: 0, fat: 0 },
  { name: "Banana Ripe", calories: 117, carbs: 30, protein: 1, fat: 0 },
  { name: "Roti/Chapathy", calories: 117, carbs: 25, protein: 3, fat: 2 },
];

export default function AddFood() {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [searchText, setSearchText] = useState("");
  const [manualFood, setManualFood] = useState({
    name: "",
    size: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
  });

  const auth = getAuth();
  const user = auth.currentUser;

  // Filter search results
  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Save food to Firestore
  const handleAddFood = async (food) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "meals"), {
        type: activeTab, // ✅ Will reflect correct tab now
        foodName: food.name,
        calories: food.calories,
        carbs: food.carbs || 0,
        protein: food.protein || 0,
        fat: food.fat || 0,
        createdAt: new Date(),
      });
      alert(`${food.name} added to ${activeTab}`);
    } catch (error) {
      console.log("Error adding food:", error);
    }
  };

  // Save manually entered food
  const handleManualAdd = () => {
    if (!manualFood.name || !manualFood.calories) {
      alert("Please enter at least food name and calories");
      return;
    }
    handleAddFood({
      name: manualFood.name,
      calories: parseInt(manualFood.calories) || 0,
      carbs: parseInt(manualFood.carbs) || 0,
      protein: parseInt(manualFood.protein) || 0,
      fat: parseInt(manualFood.fat) || 0,
    });
    setManualFood({ name: "", size: "", calories: "", carbs: "", protein: "", fat: "" });
  };

  return (
    <View style={styles.container}>
      {/* ✅ Meal Tabs */}
      <View style={styles.tabs}>
        {["Breakfast", "Morning Snack", "Lunch", "Evening Snack", "Dinner"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)} // ✅ correctly updates activeTab
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#39FF14" />
        <TextInput
          placeholder="Search food..."
          placeholderTextColor="#777"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* Food List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodRow}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodCalories}>{item.calories} cal</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddFood(item)}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Manual Add Section */}
      <View style={styles.manualAddCard}>
        <Text style={styles.manualTitle}>Add Manually</Text>
        <TextInput
          placeholder="Food Name"
          placeholderTextColor="#777"
          style={styles.manualInput}
          value={manualFood.name}
          onChangeText={(t) => setManualFood({ ...manualFood, name: t })}
        />
        <TextInput
          placeholder="Serving Size (grams)"
          placeholderTextColor="#777"
          style={styles.manualInput}
          keyboardType="numeric"
          value={manualFood.size}
          onChangeText={(t) => setManualFood({ ...manualFood, size: t })}
        />
        <TextInput
          placeholder="Calories"
          placeholderTextColor="#777"
          style={styles.manualInput}
          keyboardType="numeric"
          value={manualFood.calories}
          onChangeText={(t) => setManualFood({ ...manualFood, calories: t })}
        />
        <TextInput
          placeholder="Carbs (g)"
          placeholderTextColor="#777"
          style={styles.manualInput}
          keyboardType="numeric"
          value={manualFood.carbs}
          onChangeText={(t) => setManualFood({ ...manualFood, carbs: t })}
        />
        <TextInput
          placeholder="Protein (g)"
          placeholderTextColor="#777"
          style={styles.manualInput}
          keyboardType="numeric"
          value={manualFood.protein}
          onChangeText={(t) => setManualFood({ ...manualFood, protein: t })}
        />
        <TextInput
          placeholder="Fat (g)"
          placeholderTextColor="#777"
          style={styles.manualInput}
          keyboardType="numeric"
          value={manualFood.fat}
          onChangeText={(t) => setManualFood({ ...manualFood, fat: t })}
        />
        <TouchableOpacity style={styles.manualAddButton} onPress={handleManualAdd}>
          <Text style={styles.manualAddButtonText}>Add to {activeTab}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000", paddingVertical: 40 },
  tabs: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#222",
    marginRight: 8,
    marginBottom: 8,
  },
  activeTab: { backgroundColor: "#39FF14" },
  tabText: { fontSize: 14, color: "#ccc" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: { marginLeft: 10, flex: 1, color: "#fff" },
  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodName: { color: "#fff", fontWeight: "bold" },
  foodCalories: { color: "#39FF14", marginRight: 10 },
  addButton: { backgroundColor: "#39FF14", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 },
  addButtonText: { color: "#000", fontWeight: "bold" },
  manualAddCard: { backgroundColor: "#111", padding: 15, borderRadius: 10, marginTop: 20 },
  manualTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10, color: "#39FF14" },
  manualInput: { backgroundColor: "#222", padding: 10, borderRadius: 8, marginBottom: 10, color: "#fff" },
  manualAddButton: { backgroundColor: "#39FF14", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  manualAddButtonText: { color: "#000", fontWeight: "bold" },
});
