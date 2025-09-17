import { useProfile } from '@/context/ProfileContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  const router = useRouter();
  const { profile } = useProfile(); // Get profile data from ProfileContext

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            alignContent: "space-between",
          }}
        >
          <View style={styles.leftContainer}>
            <View>
              <View style={styles.locationTopRow}>
                <Text style={styles.username}>
                  Hi, {profile?.name || "Guest"}
                </Text>
              </View>

              <Text
                style={styles.description}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                It's time to challenge your limits.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Info Button */}
        <TouchableOpacity onPress={() => router.push("/screens/About")}>
          <View style={styles.profileIcon}>
            <FontAwesome name="info-circle" size={24} color="#39FF14" />
          </View>
        </TouchableOpacity>

        {/* Notifications Button */}
        <TouchableOpacity onPress={() => router.push("/screens/Notifications")}>
          <View style={styles.profileIcon}>
            <FontAwesome name="bell" size={24} color="#39FF14" />
          </View>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity onPress={() => router.push("/screens/Profile")}>
          <View style={styles.profileIcon}>
            <FontAwesome name="user" size={24} color="#39FF14" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: 240,
  },
  locationTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#39FF14",
    marginRight: 5,
  },
  description: {
    fontSize: 12,
    color: "#39FF14",
    paddingVertical: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
});

export default Header;
