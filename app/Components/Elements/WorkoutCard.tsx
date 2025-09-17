import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  description: string;
  details: string;
  image: any;
}

const WorkoutCard: React.FC<Props> = ({ title, description, details, image }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Left Image */}
      <Image source={image} style={styles.image} />

      {/* Right Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#000", // Black background
    borderRadius: 20,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 22,
    alignItems: "center",

    // Shadow for iOS
    shadowColor: "#39FF14", // Neon green shadow
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // Shadow for Android
    elevation: 5,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 15,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#39FF14", // Neon green text
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#39FF14", // Neon green text
    marginBottom: 6,
  },
  details: {
    fontSize: 12,
    color: "#39FF14", // Neon green text
  },
});

export default WorkoutCard;
