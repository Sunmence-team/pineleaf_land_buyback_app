import {
  formatCompactAmount,
  formatPrettyDate,
} from "@/helpers/formatterUtility";
import { PropertyCardProps, StatusType } from "@/lib/interfaces";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import StatusCard from "./StatusCard";

export const getButtonText = (status: StatusType) => {
  switch (status) {
    case "eligible":
      return "Request Buyback";

    case "not_eligible":
      return "View Property";

    case "offer_sent":
      return "View Offer";

    case "completed":
      return "View Details";

    case "pending":
      return "Request under review";

    default:
      return "View";
  }
};

export default function PropertyCard({
  id,
  status,
  number_of_plots,
  purchase_date,
  price_per_plots,
  total_value,

  property,
  user,

  children,
  onPress,
}: PropertyCardProps) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ width: "100%" }}
        onPress={onPress}
        className="bg-[#E8EFEA1A] border border-gray-200 rounded-lg p-4 w-full"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold text-gray-800">
            {property?.name}
          </Text>

          <StatusCard currentStatus={status} />
        </View>

        {/* Details */}
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">
            Purchase: {formatPrettyDate(purchase_date)}
          </Text>
          <Text className="text-sm font-medium text-gray-800">
            {number_of_plots} plots
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">
            {formatCompactAmount(Number(price_per_plots))}/plot{" "}
          </Text>
          <Text className="text-sm font-medium text-gray-800">
            Total price {formatCompactAmount(Number(total_value))}
          </Text>
        </View>

        <View className="bg-secondary border border-gray-300 rounded-lg py-3 mt-4 items-center">
          <Text className="font-semibold">{getButtonText(status)}</Text>
        </View>

        {/* Custom children (buttons, extra actions, etc.) */}
        {children && <View className="mt-2">{children}</View>}
      </TouchableOpacity>
    </>
  );
}
