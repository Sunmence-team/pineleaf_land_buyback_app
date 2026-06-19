// components/EmptyStateCard.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface EmptyStateCardProps {
  image?: string | number | React.ReactNode;
  title: string;
  description?: string;
}

export default function EmptyStateCard({
  image = (
    <AntDesign
      name="shopping"
      size={40}
      style={{ opacity: 0.25 }}
      color="black"
    />
  ),
  title,
  description,
}: EmptyStateCardProps) {
  const isImageSource = typeof image === "string" || typeof image === "number";

  return (
    <View className="items-center justify-center px-5">
      {isImageSource ? (
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={{ width: 150, height: 80 }}
          resizeMode="cover"
        />
      ) : (
        image
      )}

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