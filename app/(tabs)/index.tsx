import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import OverviewCard from "@/components/cards/OverviewCard";
import MapTabsSection from "@/components/MapTabsSection";
import { useAuth } from "@/context/AuthContext";
import { OverviewCardProps } from "@/lib/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuth();
  console.log("user", user);
  const [activeTab, setActiveTab] = useState<
    "all" | "myProperties" | "eligible"
  >("all");

  const metrics: OverviewCardProps[] = [
    {
      label: "Total Properties",
      value: user?.stats.total_properties ?? 0,
      icon: <Ionicons name="home-outline" size={20} color="black" />,
    },
    {
      label: "Eligible",
      value: user?.stats.eligible_properties ?? 0,
      icon: <Ionicons name="checkmark-circle-outline" size={20} color="black" />,
    },
    {
      label: "Pending",
      value: user?.stats.pending_offers ?? 0,
      icon: <Ionicons name="time-outline" size={20} color="black" />,
    },
    {
      label: "Completed",
      value: user?.stats.completed_buybacks ?? 0,
      icon: <Ionicons name="checkmark-done-outline" size={20} color="black" />,
    },
  ];

  return (
    <SafeAreaView className="bg-[#F4F6F1]">
      <ScrollView showsVerticalScrollIndicator={false}>
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
                <AppText className="font-bold">{user?.first_name}</AppText>
              </View>
            </View>
            <View className="flex flex-row items-center">
              <TouchableOpacity onPress={() => router.push("/alerts")}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
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
          <View className="flex flex-col gap-3 bg-white rounded-xl p-3 w-full overflow-auto flex-shrink">
            <AppText className="text-lg font-quickBold">Quick Actions</AppText>
            <View className="flex flex-row justify-between gap-3 w-full">
              <TouchableOpacity className="bg-primary/10 rounded-xl px-3 py-3 flex flex-row items-center gap-3 min-w-0 flex-1">
                <View className="bg-white p-3 rounded-full">
                  <MaterialCommunityIcons
                    name="shield-plus-outline"
                    size={20}
                    color="black"
                  />
                </View>
                <AppText className="text-md flex-1 shrink">
                  Request buyback
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/addproperty")}
                className="bg-primary/10 rounded-xl px-3 py-3 flex flex-row items-center gap-3 min-w-0 flex-1"
              >
                <View className="bg-white p-3 rounded-full">
                  <Ionicons name="add" size={20} color="black" />
                </View>
                <AppText className="text-md flex-1 shrink">
                  Add Property
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
