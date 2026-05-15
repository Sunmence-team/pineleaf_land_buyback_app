// components/EmptyState.tsx

import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = "bag-handle-outline",
  title,
  description,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center mt-10 px-5">
      <Ionicons
        name={icon}
        size={30}
        color="#154A22"
      />

      <Text className="text-lg font-semibold mt-3">
        {title}
      </Text>

      {description && (
        <Text className="text-center text-gray-500 mt-2">
          {description}
        </Text>
      )}
    </View>
  );
}