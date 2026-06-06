import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "../modal/Modal";

import { assets } from "@/assets/assets";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPropertyBuybackService } from "@/services/propertiesServices";
import { formatCompactAmount, formatUnderScores, formatPrettyDate } from "@/helpers/formatterUtility";
import { PropertyCardProps, StatusType } from "@/lib/interfaces";


const statusStyles = {
  all: "",
  eligible: "bg-fadedGreen text-primary",
  not_eligible: "bg-red-100 text-red-600",
  offer_sent: "bg-blue-100 offerText",
  completed: "bg-gray-200 text-gray-700",
  pending: "bg-yellow-100 text-yellow-700"
};

const getButtonText = (status: StatusType) => {
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
      return "Request under review"

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

  const [currentStatus, setCurrentStatus] = React.useState<StatusType>(status);

  const logic = (status: StatusType) => {
    if (status === "eligible") {
       router.push(`/view/${id}`);
    }
    else if (status === "not_eligible" || status === "completed") {
      router.push(`/view/${id}`);
    }
    else if (status === "offer_sent" || status === "pending") {
      router.push(`/offer/${id}`);
    }


    router.push(`/view/${id}`);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ width: '100%' }}
        onPress={onPress}
        className="bg-[#E8EFEA1A] border border-gray-200 rounded-lg p-4 mb-4 w-full"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold text-gray-800">
            {property?.name}
          </Text>

          <View
            className={`px-3 py-1 rounded-lg ${statusStyles[currentStatus]}`}
          >
            <Text className="text-xs font-medium">
              {formatUnderScores(currentStatus, true)}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Purchase: {formatPrettyDate(purchase_date)}</Text>
          <Text className="text-sm font-medium text-gray-800">
            {number_of_plots} plots
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">{formatCompactAmount(Number(price_per_plots))}/plot </Text>
          <Text className="text-sm font-medium text-gray-800">
            Total price {formatCompactAmount(Number(total_value))}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-secondary border border-gray-300 rounded-lg py-3 mt-4 items-center"
          onPress={() => logic(currentStatus)}
        >
          <Text className="font-semibold">
            {getButtonText(currentStatus)}
          </Text>
        </TouchableOpacity>

        {/* Custom children (buttons, extra actions, etc.) */}
        {children && <View className="mt-2">{children}</View>}
      </TouchableOpacity>

     
    </>

  );
}