import { useBreakpoints } from "@/hooks/useBreakpoints";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

export default function TabLayout() {
  const { isSmaller } = useBreakpoints();
  const pathname = usePathname();

  // Define logic for when to hide specific tabs
  const isAddPropertyActive = pathname === "/addproperty";

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "#154A22",
        tabBarInactiveTintColor: "#000000",
        headerStyle: {
          backgroundColor: "#F4F6F1",
          height: 100,
          elevation: 0,
          shadowColor: "transparent",
        },
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 75 : 88,
          paddingBottom: Platform.OS === "android" ? 12 : 30,
          paddingTop: 5,
          backgroundColor: "#F4F6F1",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          display: isAddPropertyActive ? "none" : "flex",
        },
        tabBarLabel: ({ focused, children }) => (
          <Text
            style={{
              fontFamily: focused ? "quickSemiBold" : "quickRegular",
              fontSize: 12,
              color: focused ? "#154A22" : "#000000",
              opacity: focused ? 1 : 0.4,
            }}
          >
            {children}
          </Text>
        ),
        tabBarItemStyle: {
<<<<<<< HEAD
          justifyContent: 'center'
=======
          justifyContent: "center",
>>>>>>> b4ffb0c449b2eff03b240ede29b5a1ddaae63a0e
        },
        headerTitleAlign: "center",
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // headerLeft: () => (
          //   <View className="w-10 h-10 rounded-full border-0 border-white items-center justify-center">
          //     <Text className="text-2xl font-bold uppercase">SA</Text>
          //   </View>
          // ),
          // headerShown: false,
          headerTitle: () => null,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={25}
              color={focused ? "#154A22" : "#000000"}
              opacity={focused ? 1 : 0.3}
            />
          ),
          headerShown: false,
        }}
      />
      {/* Properties */}
      <Tabs.Screen
        name="properties/index"
        options={{
          title: "Properties",
          headerShown: false,
          headerTitle: () => (
<<<<<<< HEAD
            <Text className="text-2xl font-medium text-black">Properties</Text>
=======
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Properties
            </Text>
>>>>>>> b4ffb0c449b2eff03b240ede29b5a1ddaae63a0e
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="golf-outline"
              size={25}
              color={focused ? "#154A22" : "#000000"}
              opacity={focused ? 1 : 0.3}
            />
          ),
        }}
      />

      {/* Add Property */}
      <Tabs.Screen
        name="addproperty/index"
        options={{
          headerTitle: () => null,
          tabBarShowLabel: false,
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#154A22" : "#FFFFFF",
                borderRadius: "100%",
                height: 52,
                width: 52,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather
                name="plus"
                size={32}
                color={focused ? "#FFFFFF" : "#000000"}
                style={{ opacity: focused ? 1 : 0.6 }}
              />
            </View>
          ),
        }}
      />

      {/* Alerts */}
      <Tabs.Screen
        name="alerts/index"
        options={{
          title: "Alerts",
          headerShown: false,
          headerTitle: () => (
<<<<<<< HEAD
            <Text className="text-2xl font-medium text-black text-center">Alerts</Text>
=======
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Alerts
            </Text>
>>>>>>> b4ffb0c449b2eff03b240ede29b5a1ddaae63a0e
          ),
          // headerRight: () => (
          //   <ReferralLevelDropdown />
          // ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="alert-triangle"
              size={22}
              color={focused ? "#154A22" : "#000000"}
              opacity={focused ? 1 : 0.3}
            />
          ),
        }}
      />
      {/* Profile */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Profile
            </Text>
          ),
          headerLeft: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="person-outline"
              size={25}
              color={focused ? "#154A22" : "#000000"}
              opacity={focused ? 1 : 0.3}
            />
          ),
        }}
      />
    </Tabs>
  );
}
