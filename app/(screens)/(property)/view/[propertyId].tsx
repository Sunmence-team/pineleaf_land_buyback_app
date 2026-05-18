import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StatusType = "eligible" | "not_eligible" | "offer_sent" | "completed" | "pending";

interface PropertyCardProps {
  id: number;
  title: string;
  status: StatusType;
  date: string;
  plots: string | number;
  price: string | number;
  totalPrice: string | number;
}

const propertyDetails = ({ status }: { status: StatusType }) => {

  const statusStyles = {
    eligible: "bg-fadedGreen text-primary",
    not_eligible: "bg-red-100 text-red-600",
    offer_sent: "bg-blue-100 offerText",
    completed: "bg-gray-200 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700"
  };

  const statusLabel = {
    eligible: "Eligible",
    not_eligible: "Not Eligible",
    offer_sent: "Offer Sent",
    completed: "Completed",
    pending: 'Pending'
  };

  const plotDetails = [
    {
      label: "Price/Plot", value: "₦2.4m"
    },
    {
      label: "Total Value", value: "₦8.4m"
    },
    {
      label: "Plots", value: "3 Plots"
    }
  ]

  return (
    <ScrollView className="flex-1 border border-gray-200 bg-white rounded-lg p-4 w-full">
      <View className="flex-row justify-between">
        <View className="mb-4">
          <Text className="text-xl font-bold mb-2">Pineleaf Garden Estate</Text>
          <Text>3 plots . Actual price. Jan 2022</Text>
        </View>

        <View
          className={`px-3 py-1 rounded-lg ${statusStyles[status]}`}
        >
          <Text className="text-xs font-medium">
            {statusLabel[status]}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap justify-between gap-2 mt-4 items-center">
        {
          plotDetails.map((detail, index) => (
            <View key={index} className="bg-fadedGreen flex items-center justify-center rounded-lg w-32 h-24 p-3 text-center">
              <Text className="text-lg mb-4">{detail.label}</Text>
              <Text className="text-xl font-medium text-primary">{detail.value}</Text>
            </View>
          ))
        }

      </View>

      <TouchableOpacity
        className="bg-fadedGreen border border-gray-300 rounded-lg py-6 mt-7 items-center"
        activeOpacity={0.8}>
        <Text>Request Buyback</Text>
      </TouchableOpacity>

      <View className="mt-5 border border-gray-200 rounded-lg p-4">
        <View className="flex justify-center border-b border-gray200">
          <Text className="text-lg font-bold">Name</Text>
          <Text>Otito</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default propertyDetails;
