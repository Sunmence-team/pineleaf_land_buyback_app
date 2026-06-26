import { useRouter, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { View, ActivityIndicator } from "react-native";

export default function AddPropertyTab() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      // Fallback redirect if they land here directly
      router.replace("/(screens)/(property)/add/stepOne");
    }, [router])
  );

  return (
    <View className="flex-1 items-center justify-center bg-[#F4F6F1]">
      <ActivityIndicator size="large" color="#154A22" />
    </View>
  );
}
