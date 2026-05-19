import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "../modal/Modal";
import { Image } from "react-native";
import { assets } from "@/assets/assets";

type StatusType = "eligible" | "not_eligible" | "offer_sent" | "completed" | "pending";

interface PropertyCardProps {
  id: number;
  title: string;
  status: StatusType;
  date: string;
  plots: string | number;
  price: string | number;
  totalPrice: string | number;

  propertyId: string;
  offerId?: string;
  onPress: () => void;

  children?: React.ReactNode;
}

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
      return "Track Request"

    default:
      return "View";
  }
};

export default function PropertyCard({
  id,
  title,
  status,
  date,
  plots,
  price,
  totalPrice,
  children,
  onPress,
}: PropertyCardProps) {

  const [openModal, setOpenModal] = React.useState(false)

  const logic = (status: StatusType) => {
    if (status === "eligible") {
      setOpenModal(true);
    }
    else if (status === "not_eligible" || status === "pending" || status === "completed") {
      router.push(`/view/${id}`);
    }
    else if (status === "offer_sent") {
      router.push(`/offer/${id}`);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ width: '100%' }}
      onPress={onPress}
      className="bg-[#E8EFEA1A] border border-gray-200 rounded-lg p-4 mb-4 w-full"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold text-gray-800">
          {title}
        </Text>

        <View
          className={`px-3 py-1 rounded-lg ${statusStyles[status]}`}
        >
          <Text className="text-xs font-medium">
            {statusLabel[status]}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">Purchase: {date}</Text>
        <Text className="text-sm font-medium text-gray-800">
          {plots} plots
        </Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">₦{price}/plot </Text>
        <Text className="text-sm font-medium text-gray-800">
          Total price ₦{totalPrice}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-secondary border border-gray-300 rounded-lg py-3 mt-4 items-center"
        onPress={() => logic(status)}
      >
        <Text className="font-semibold">
          {getButtonText(status)}
        </Text>
      </TouchableOpacity>

      <>
        <Modal onClose={() => setOpenModal(false)} visible={openModal}>
          <Image
            source={assets.mark}
            resizeMode="cover"
            className="w-full h-[80px] rounded-t-[20px]  "
          />

        </Modal>
      </>

      {/* Custom children (buttons, extra actions, etc.) */}
      {children && <View className="mt-2">{children}</View>}
    </TouchableOpacity>

  );
}