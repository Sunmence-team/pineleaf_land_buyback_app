// components/EmptyStateCard.tsx
import React from "react";
import { View, Text , Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { assets } from "@/assets/assets";

interface EmptyStateCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function EmptyStateCard({
  icon = "bag-handle-outline",
  title,
  description,
}: EmptyStateCardProps) {
  return (
    <View className="items-center justify-center px-5">
      <Image source={assets.empty} style={{ width: 150, height: 80 }} resizeMode="cover" />

      <Text className="text-lg text-center font-semibold mt-3">
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