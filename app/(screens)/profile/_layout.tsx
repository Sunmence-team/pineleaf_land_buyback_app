import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native';

export default function ProfileLayout () {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable
            onPress={() =>router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="editScreen" options={{ title: "Profile" }}></Stack.Screen>
      <Stack.Screen name="bankDetailsScreen"></Stack.Screen>
      <Stack.Screen name="passwordChangeScreen"></Stack.Screen>
      <Stack.Screen name="supportScreen"></Stack.Screen>
    </Stack>
  );
}