import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  title: string;
  duration: string;
  calories: string;
  image: any;
}

const ExerciseCard: React.FC<Props> = ({ title, duration, calories, image }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <FontAwesome name="clock-o" size={14} color="#2CA0FF" />
          <Text style={styles.infoText}>{duration}</Text>
        </View>

        <View style={styles.infoItem}>
          <FontAwesome name="fire" size={14} color="#2CA0FF" />
          <Text style={styles.infoText}>{calories}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 8,
    width: 200,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});

export default ExerciseCard;
