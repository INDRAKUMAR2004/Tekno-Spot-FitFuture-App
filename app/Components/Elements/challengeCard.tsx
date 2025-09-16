// components/ChallengeCard.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageStyle,
  StyleProp,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";

interface Props {
  days: string;
  title: string;
  points: string[];
  goal: string;
  image: any;
  imageStyle?: StyleProp<ImageStyle>;
  targetScreen: any; 
}

const ChallengeCard: React.FC<Props> = ({ days, title, points, goal, image, imageStyle, targetScreen }) => {

   const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#d4fdd8", "#b6f1e5"]}
        style={styles.gradient}
      >
        {/* Left side text */}
        <View style={styles.textContainer}>
          <Text style={styles.dayText}>{days}</Text>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.bullets}>
            {points.map((point, index) => (
              <Text key={index} style={styles.bullet}>
                • {point}
              </Text>
            ))}
          </View>

          <Text style={styles.goal}>{goal}</Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push(targetScreen)}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>

        {/* Right side image */}
       <View style={styles.imageWrapper}>
    <Image
      source={image}
      style={[imageStyle]}
    />
  </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingHorizontal: 10,
     width: 300,
    overflow: "hidden",
    height: 220,
    // elevation: 5,
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
  },
  gradient: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 60,
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bullets: {
    marginBottom: 8,
  },
  bullet: {
    fontSize: 12,
    color: "#333",
  },
  goal: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2E8BFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageWrapper: {
  position: "absolute",
  right: -0,
  bottom: -10,
  width: "100%",
  height: "100%",
  overflow: "hidden", 
},
//   image: {
    
//   },
});

export default ChallengeCard;
