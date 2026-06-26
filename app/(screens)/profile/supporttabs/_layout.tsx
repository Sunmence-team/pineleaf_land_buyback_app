import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function supportTabsLayout() {
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
        headerTitleAlign: "center"
      }}
    >
      <Stack.Screen
        name="faqScreen"
        options={{ title: "Support" }}
      ></Stack.Screen>
      <Stack.Screen
        name="buyBackExplanationScreen"
        options={{ title: "Buyback explanation" }}
      ></Stack.Screen>

      <Stack.Screen
        name="documentsPreparationScreen"
        options={{ title: "Document" }}
      ></Stack.Screen>

      <Stack.Screen
        name="contactScreen"
        options={{ title: "Contact team" }}
      ></Stack.Screen>

      <Stack.Screen
        name="timelineExpectationsScreen"
        options={{ title: "Timeline explanation" }}
      ></Stack.Screen>

      <Stack.Screen
        name="contacttabs/liveChatScreen"
        options={{ title: "Live Chat" }}
      ></Stack.Screen>
    </Stack>
  );
}
