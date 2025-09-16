import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const foodItems = [
  { name: "Apple", calories: 87 },
  { name: "Banana Ripe", calories: 117 },
  { name: "Roti/Chapathy", calories: 117 },
];

export default function AddFood() {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      {/* Tabs */}
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* Food List */}
      <FlatList
        data={foodItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodRow}>
            <Text>{item.name}</Text>
            <Text>{item.calories} cal</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Manual Add Section */}
      <View style={styles.manualAddCard}>
        <Text style={styles.manualTitle}>Add Manually</Text>
        <TextInput placeholder="Food Name" style={styles.manualInput} />
        <TextInput placeholder="Serving Size (grams)" style={styles.manualInput} keyboardType="numeric" />
        <TextInput placeholder="Calories" style={styles.manualInput} keyboardType="numeric" />
        <TouchableOpacity style={styles.manualAddButton}>
          <Text style={styles.manualAddButtonText}>Add Breakfast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fafafa", paddingVertical: 40 },
  tabs: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20,},
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#eee" },
  activeTab: { backgroundColor: "#3B82F6" },
  tabText: { fontSize: 14, color: "#333" },
  activeTabText: { color: "#fff" },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 20 },
  searchInput: { marginLeft: 10, flex: 1 },
  foodRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 10 },
  addButton: { backgroundColor: "#3B82F6", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 },
  addButtonText: { color: "#fff" },
  manualAddCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginTop: 20 },
  manualTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  manualInput: { backgroundColor: "#eee", padding: 10, borderRadius: 8, marginBottom: 10 },
  manualAddButton: { backgroundColor: "#3B82F6", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  manualAddButtonText: { color: "#fff", fontWeight: "bold" },
});
