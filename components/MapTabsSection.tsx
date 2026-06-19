import MapScreen from "@/app/(screens)/map";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import ActionButton from "./buttons/ActionButton";

interface MapTabsSectionProps {
  activeTab: "all" | "myProperties" | "eligible";
  onTabChange: (tab: "all" | "myProperties" | "eligible") => void;
}

const MapTabsSection: React.FC<MapTabsSectionProps> = ({
  activeTab,
  onTabChange,
}) => {
  const filterOptions = [
    { label: "All Properties", value: "all" as const },
    { label: "My Properties", value: "myProperties" as const },
    { label: "Eligible Only", value: "eligible" as const },
  ];

  return (
    <View className="flex flex-col gap-4 w-full">
      {/* Filter Pills */}
      <View className="flex-row justify-center gap-2 px-1">
        {filterOptions.map((opt) => {
          const isActive = activeTab === opt.value;
          return (
            <ActionButton
              key={opt.value}
              name={opt.label}
              action={() => onTabChange(opt.value)}
              hasBG={isActive}
              optStyle={{
                height: 40,
                flex: 1,
              }}
              optStyle2={{
                fontSize: 14,
                fontFamily: "quickSemiBold",
              }}
            />
          );
        })}
      </View>

      <View className="relative rounded-xl h-64 overflow-hidden w-full">
        <View className="w-full h-full">
          <MapScreen
            isMini={true}
            filter={activeTab === "myProperties" ? "mine" : activeTab}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(screens)/map")}
          className="absolute inset-0 bg-transparent"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </View>
    </View>
  );
};

export default MapTabsSection;
