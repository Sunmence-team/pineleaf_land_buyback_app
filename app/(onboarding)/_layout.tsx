import { AppText } from '@/components/AppText';
import { Stack } from 'expo-router'
import React from 'react'
import { ImageBackground, View } from 'react-native';

export default function OnboardingLayout () {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='stepOne'></Stack.Screen>
      <Stack.Screen name='stepTwo'></Stack.Screen>
      <Stack.Screen name='stepThree'></Stack.Screen>
    </Stack>
  )
}