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
  const profile = useProfile();

  return (
    <SafeAreaView>
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
                <Text
                  style={styles.username}
                >
                 Hi, {profile.profile.name}
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
        <TouchableOpacity onPress={() => router.push("/screens/Notifications")}>
          <View style={styles.profileIcon}>
            <FontAwesome name='bell' size={24}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/screens/Profile")}>
          <View style={styles.profileIcon}>
            <FontAwesome name='user' size={24}/>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "stretch",
    paddingHorizontal: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: 270,
  },
  locationTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  description: {
    fontSize: 12,
    color: 'gray',
    paddingVertical: 5
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  profileText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Header;
