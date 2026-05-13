import { Stack } from 'expo-router'
import React from 'react'

export default function OnboardingLayout () {
  return (
    <Stack>
      <Stack.Screen name='stepOne'></Stack.Screen>
      <Stack.Screen name='stepTwo'></Stack.Screen>
      <Stack.Screen name='stepThree'></Stack.Screen>
    </Stack>
  )
}