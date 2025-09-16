import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import * as Progress from "react-native-progress" // Create a custom progress bar component
import { useNavigation } from "@react-navigation/native";
import { router, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function ChallengeOverview() {
    const router = useRouter();


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}><TouchableOpacity onPress={() => router.push("/(tabs)/Home")}><FontAwesome name="arrow-left" size={20} />
            </TouchableOpacity> Core Challenge</Text>
            <Text style={styles.description}>
                5-10 min abs workout daily • Planks, crunches, leg raises{'\n'}
                Goal: Stronger core & better posture
            </Text>

            <Progress.Bar progress={0} />

            <View style={styles.timeline}>
                <Text>Week 1</Text>
                {/* Render clickable day indicators */}
                <View style={styles.daysRow}>
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <View key={day} style={styles.dayCircle}>
                            <Text>{day}</Text>
                        </View>
                    ))}
                </View>

                <Text>Week 2</Text>
                <View style={styles.daysRow}>
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <View key={day} style={styles.dayCircle}>
                            <Text>{day}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/DayExercises")}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        padding: 20,
        paddingVertical: 30
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 15,
        lineHeight: 22,
    },
    timeline: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    daysRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#3B82F6",
        alignItems: "center",
        justifyContent: "center",
    },
    dayText: {
        color: "#fff",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#3B82F6",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});
