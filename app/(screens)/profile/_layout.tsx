import { Stack } from 'expo-router'
import React from 'react'

export default function ProfileLayout () {
  return (
    <Stack>
      <Stack.Screen name='editScreen'></Stack.Screen>
      <Stack.Screen name='stepTwo'></Stack.Screen>
      <Stack.Screen name='stepThree'></Stack.Screen>
      <Stack.Screen name='stepFour'></Stack.Screen>
    </Stack>
  )
}