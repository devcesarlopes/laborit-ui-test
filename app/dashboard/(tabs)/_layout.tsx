import { router, Tabs } from "expo-router";
import BackButton from "@/components/BackButton";
import HomeIcon from "@/assets/icons/home.svg";
import ChatIcon from "@/assets/icons/chat.svg";
import ClockIcon from "@/assets/icons/clock.svg";
import DotsIcon from "@/assets/icons/dots.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import { useThemeStore } from "@/stores/themeStore";
import { colorPalettes } from "@/color-theme";
import { TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const {theme} = useThemeStore(state => state);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text'],
        tabBarStyle: {
          backgroundColor: theme === 'light' ? colorPalettes.light['--color-background'] : colorPalettes.dark['--color-background'],
          paddingTop: 8,
          borderTopWidth: 1,
        },
        tabBarShowLabel: false, // Hide the labels under the icons
        headerShown: true,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: theme === 'light' ? colorPalettes.light['--color-background'] : colorPalettes.dark['--color-background'],
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          textAlign: "center",
          fontFamily: 'poppins500',
          color: theme === 'light' ? colorPalettes.light['--color-input-text'] : colorPalettes.dark['--color-input-text'],
        },
        headerTitleAlign: "center", // This ensures the title is centered on both iOS and Android
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon width={28} height={28} fill={color} />
          ),
          headerShown: false,
          tabBarStyle: {display: 'none'}
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color }) => (
            <ChatIcon width={28} height={28} fill={color} />
          ),
          headerLeft: () => <View className="ml-4"><BackButton /></View>,
          headerRight: () => (
            <TouchableOpacity className="mr-10" onPress={() => router.replace('/dashboard/profile')}>
              <DotsIcon width={28} height={28} />
            </TouchableOpacity>
          ),
          tabBarStyle: {display: 'none'}
        }}
      />

      <Tabs.Screen
        name="history"
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <ClockIcon width={28} height={28} fill={color} />
          ),
          headerLeft: () => <View className="ml-4"><BackButton /></View>,
          headerRight: () => (
            <TouchableOpacity className="mr-10" onPress={() => router.replace('/dashboard/profile')}>
              <DotsIcon width={28} height={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={28} height={28} fill={color} />
          ),
          headerLeft: () => <View className="ml-4"><BackButton /></View>,
        }}
      />
    </Tabs>
  );
}
