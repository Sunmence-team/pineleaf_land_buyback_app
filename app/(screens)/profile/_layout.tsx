import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native';

export default function ProfileLayout () {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ paddingLeft: 10 }}>
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
        name="editScreen"
        options={{ title: "Profile" }}
      ></Stack.Screen>
      <Stack.Screen
        name="bankDetailsScreen"
        options={{ title: "Bank details" }}
      ></Stack.Screen>
      <Stack.Screen
        name="passwordChangeScreen"
        options={{ title: "Change password" }}
      ></Stack.Screen>
      <Stack.Screen
        name="supportScreen"
        options={{ title: "Support" }}
      ></Stack.Screen>
      <Stack.Screen
        name="supporttabs"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}