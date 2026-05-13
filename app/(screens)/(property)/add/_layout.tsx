import { Stack } from 'expo-router'
import React from 'react'

export default function AddPropertyLayout () {
  return (
    <Stack>
      <Stack.Screen name='stepOne'></Stack.Screen>
      <Stack.Screen name='stepTwo'></Stack.Screen>
      <Stack.Screen name='stepThree'></Stack.Screen>
      <Stack.Screen name='stepFour'></Stack.Screen>
    </Stack>
  )
}