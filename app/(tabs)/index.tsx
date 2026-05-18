import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import OverviewCard from "@/components/cards/OverviewCard";
import MapTabsSection from "@/components/MapTabsSection";
import { OverviewCardProps } from "@/lib/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { navigate } from "expo-router/build/global-state/routing";
import { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [activeTab, setActiveTab] = useState<
    "all" | "myProperties" | "eligible"
  >("all");

  const metrics: OverviewCardProps[] = [
    {
      label: "Total Properties",
      value: 0,
      icon: <Ionicons name="home-outline" size={20} color="black" />,
    },
    {
      label: "Eligible",
      value: 0,
      icon: (
        <Ionicons name="checkmark-circle-outline" size={20} color="black" />
      ),
    },
    {
      label: "Pending",
      value: 0,
      icon: <Ionicons name="time-outline" size={20} color="black" />,
    },
    {
      label: "Completed",
      value: 0,
      icon: <Ionicons name="checkmark-done-outline" size={20} color="black" />,
    },
  ];

  return (
    <SafeAreaView>
      <View className="flex flex-col gap-5 px-5 pt-5 pb-5">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-4">
            <View className="bg-tertiary w-[60px] h-[60px] rounded-full">
              <Image
                source={assets.avatar}
                alt="profile-avatar"
                className="w-full h-full object-contain"
              />
            </View>
            <View className="flex flex-col items-start justify-center gap-2">
              <AppText className="font-semibold">Good Morning</AppText>
              <AppText className="font-bold">Jay</AppText>
            </View>
          </View>
          <View className="flex flex-row items-center">
            <TouchableOpacity
              onPress={() => navigate({ pathname: "/(tabs)/properties" })}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <AppText className="text-base">
            Track your properties and buyback requests
          </AppText>
          <FlatList
            scrollEnabled={false}
            data={metrics}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <View className="w-[48%] mb-6">
                <OverviewCard
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              </View>
            )}
            keyExtractor={(item) => item.label}
          />
        </View>

        <View className="flex flex-col gap-3 bg-white rounded-xl p-3">
          <AppText className="text-lg font-quickBold">Live Map</AppText>
          <MapTabsSection activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      </View>
    </SafeAreaView>
  );
}
