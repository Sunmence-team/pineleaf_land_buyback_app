import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import MapScreen from "@/app/(screens)/map";

interface MapTabsSectionProps {
  activeTab: "all" | "myProperties" | "eligible";
  onTabChange: (tab: "all" | "myProperties" | "eligible") => void;
}

const MapTabsSection: React.FC<MapTabsSectionProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "all", label: "All Activity" },
    { id: "myProperties", label: "My Properties" },
    { id: "eligible", label: "Eligible Only" },
  ];

  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row gap-2">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() =>
              onTabChange(tab.id as "all" | "myProperties" | "eligible")
            }
            className={`flex-1 py-2 px-3 rounded-xl items-center justify-center ${
              activeTab === tab.id ? "bg-primary" : "bg-transparent"
            }`}
          >
            <AppText
              className={`text-sm font-semibold ${
                activeTab === tab.id ? "text-white" : "text-gray-600"
              }`}
            >
              {tab.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex items-center justify-center rounded-xl h-64 border">
        <MapScreen />
      </View>
    </View>
  );
};

export default MapTabsSection;
