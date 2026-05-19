import { OverviewCardProps } from "@/lib/interfaces";
import React from "react";
import { View } from "react-native";
import { AppText } from "../AppText";

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, label, value }) => {
  return (
    <View className="w-full flex flex-col gap-2 bg-white rounded-xl p-3 relative pt-[50px]">
      <View className="absolute right-3 top-3 flex items-center justify-end flex-row bg-primary/5 w-15 p-2 rounded-full">
        {icon}
      </View>
      <View className="flex flex-col gap-1">
        <AppText className="font-semibold">{value}</AppText>
        <AppText className="font-semibold">{label}</AppText>
      </View>
    </View>
  );
};

export default OverviewCard;
