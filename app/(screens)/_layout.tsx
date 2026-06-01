import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function PropertyLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
        ),
        headerShown: false,
      }}
    >
      <Stack.Screen name="map"></Stack.Screen>
      <Stack.Screen 
        name="(property)/view"
      ></Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{
        }}
      ></Stack.Screen>
    </Stack>
  );
}
