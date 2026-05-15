import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StatusType = "eligible" | "not_eligible" | "offer_sent" | "completed";

interface PropertyCardProps {
  title: string;
  status: StatusType;
  date: string;
  plots: string | number;
  price: string | number;
  totalPrice: string | number;
  children?: React.ReactNode;
  onPress?: () => void;
}

const statusStyles = {
  eligible: "bg-green-100 text-green-700",
  not_eligible: "bg-red-100 text-red-600",
  offer_sent: "bg-blue-100 text-blue-600",
  completed: "bg-gray-200 text-gray-700",
};

const statusLabel = {
  eligible: "Eligible",
  not_eligible: "Not Eligible",
  offer_sent: "Offer Sent",
  completed: "Completed",
};

export default function PropertyCard({
  title,
  status,
  date,
  plots,
  price,
  totalPrice,
  children,
  onPress,
}: PropertyCardProps) {
  return (
    <TouchableOpacity
    activeOpacity={0.8}
     style={{ width: '100%'}}
      onPress={onPress}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-4 w-full self-stretch "
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold text-gray-800">
          {title}
        </Text>

        <View
          className={`px-3 py-1 rounded-full ${statusStyles[status]}`}
        >
          <Text className="text-xs font-medium">
            {statusLabel[status]}
          </Text>
        </View>
      </View>

      {/* Date */}
      <Text className="text-xs text-gray-500 mb-3">
        Purchase: {date}
      </Text>

      {/* Details */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">Plots</Text>
        <Text className="text-sm font-medium text-gray-800">
          {plots}
        </Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">Price</Text>
        <Text className="text-sm font-medium text-gray-800">
          ₦{price}
        </Text>
      </View>

      <View className="flex-row justify-between mb-3">
        <Text className="text-sm text-gray-600">Total Price</Text>
        <Text className="text-sm font-semibold text-gray-900">
          ₦{totalPrice}
        </Text>
      </View>

      {/* Custom children (buttons, extra actions, etc.) */}
      {children && <View className="mt-2">{children}</View>}
    </TouchableOpacity>
  );
}