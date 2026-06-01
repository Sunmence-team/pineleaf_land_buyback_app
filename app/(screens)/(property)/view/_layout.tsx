import { Stack } from "expo-router";
import React from "react";

export default function ViewLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[propertyId]"
        options={{
          title: "Property details",
        }}
      />
    </Stack>
  );
}
