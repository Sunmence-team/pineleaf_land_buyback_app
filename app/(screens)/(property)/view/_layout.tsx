import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function ViewLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: "#F4F6F1",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="[propertyId]"
        options={{
          title: "Property details",
        }}
      />
    </Stack>
  );
}
