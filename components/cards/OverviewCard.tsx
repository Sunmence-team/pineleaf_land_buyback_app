import { OverviewCardProps } from "@/lib/interfaces";
import React from "react";
import { View } from "react-native";
import { AppText } from "../AppText";

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, label, value }) => {
  return (
    <View className="w-full flex flex-col bg-white rounded-xl p-4">
      <View className="flex-row justify-end">
        <View className="bg-primary/5 p-2 rounded-full ms-auto">
          {icon}
        </View>
      </View>
      <View className="flex flex-col gap-1">
        <AppText className="text-2xl" style={{ fontFamily: "quickBold" }}>{value}</AppText>
        <AppText className="" style={{ fontFamily: "quickMedium" }}>{label}</AppText>
      </View>
    </View>
  );
};

export default OverviewCard;
