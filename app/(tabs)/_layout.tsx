import { Tabs } from "expo-router";
import HomeIcon from "../SvgTags/home";
import FoodIcon from "../SvgTags/food";
import DirectionIcon from "../SvgTags/directions";
import ProgressIcon from "../SvgTags/progress";
import SupportIcon from "../SvgTags/support";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2CA0FF",
        tabBarInactiveTintColor: "#bfbfbf",
        tabBarLabelStyle: { fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="Nutrition"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FoodIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <DirectionIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <ProgressIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="Chatbot"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SupportIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
