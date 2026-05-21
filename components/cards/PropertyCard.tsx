import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Modal from "../modal/Modal";

import { assets } from "@/assets/assets";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

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
      return "Request under review"

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
const [currentStatus, setCurrentStatus] = React.useState<StatusType>(status);

  const logic = (status: StatusType) => {
    if (status === "eligible") {
      setOpenModal(true);
    }
    else if (status === "not_eligible" || status === "completed") {
      router.push(`/view/${id}`);
    }
    else if (status === "offer_sent") {
      router.push(`/offer/${id}`);
    }

    return (null)
  };

  const handleToast = () => {
    setOpenModal(false);

    setTimeout(() => {
       setCurrentStatus("pending"); 

      Toast.show({
        type: "success",
        text1: "Request Submitted",
        text2: "Your Buyback request for pine leaf phase 2 is being processed.",
      });
    }, 500); // delay in ms
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
            {title}
          </Text>

          <View
            className={`px-3 py-1 rounded-lg ${statusStyles[currentStatus]}`}
          >
            <Text className="text-xs font-medium">
              {statusLabel[currentStatus]}
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
          onPress={() => logic(currentStatus)}
        >
          <Text className="font-semibold">
            {getButtonText(currentStatus)}
          </Text>
        </TouchableOpacity>

        {/* Custom children (buttons, extra actions, etc.) */}
        {children && <View className="mt-2">{children}</View>}
      </TouchableOpacity>

      <Modal onClose={() => setOpenModal(false)} visible={openModal} showClose={true}>
        <View className="flex-1 items-center px-5 pt-15">
          <Image
            source={assets.microphone}
            style={{ width: 140, height: 140 }}
            resizeMode="contain"
          />
          <Text className="font-medium w-2/3 mb-10 text-center">Are you sure you want to request for
            buyback.
          </Text>
          <>
            {/* Step 1 */}
            <View className="flex-row gap-3 mb-5">
              <Ionicons
                name="sparkles-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Company Review Process
                </Text>

                <Text className="text-gray-600 text-sm">
                  By confirming you are requesting a formal review of your property by our cooperate aquisition team .
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row gap-3 mb-5">
              <Ionicons
                name="locate-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Fixed Valuation Offer
                </Text>

                <Text className="text-gray-600 text-sm">
                  An approved review result in a non-negotiable fixed prce offer based on current market metrics.
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row gap-3 mb-10">
              <Ionicons
                name="card-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Not Immediate Payment
                </Text>

                <Text className="text-gray-600 text-sm">
                  This is the initail stage of a transaction. Payment is not immediate.
                </Text>
              </View>
            </View>

            {/* Step 4 */}
            <View className="flex-row gap-3 mb-10">
              <Ionicons
                name="card-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Documentation Requirements
                </Text>

                <Text className="text-gray-600 text-sm">
                  Further financial and structural document may be required to finalize the valuation.
                </Text>
              </View>

            </View>
          </>

          <TouchableOpacity
            onPress={handleToast}
            activeOpacity={0.8}
            className="bg-primary items-center py-5 rounded-lg mb-5 w-full">
            <Text className="text-white font-semibold"> Confirm Request</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Text className="text-gray-600 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>


      </Modal>
    </>

  );
}