import { formatUnderScores } from "@/helpers/formatterUtility";
import { StatusType } from "@/lib/interfaces";
import { View, Text } from "react-native";

const StatusCard = ({
  currentStatus,
  displayText,
}: {
  currentStatus: StatusType;
  displayText?: string;
}) => {
  const statusStyles = {
    all: {
      bg: "",
      text: ""
    },
    // Blue guys
    offer_sent: {
      bg: "bg-[#E3EFFE]",
      text: "text-[#025FD6]"
    },
    verified: {
      bg: "bg-[#E3EFFE]",
      text: "text-[#025FD6]"
    },
    // Yellow guys
    pending: {
      bg: "bg-[#F9DF75]/25",
      text: "text-[#B59201]"
    },
    buyback_requested: {
      bg: "bg-[#F9DF75]/25",
      text: "text-[#B59201]"
    },
    // Green guys
    eligible: {
      bg: "bg-[#94F975]/25",
      text: "text-[#1A8701]"
    },
    completed: {
      bg: "bg-[#94F975]/25",
      text: "text-[#1A8701]"
    },
    approved: {
      bg: "bg-[#94F975]/25",
      text: "text-[#1A8701]"
    },
    accepted: {
      bg: "bg-[#94F975]/25",
      text: "text-[#1A8701]"
    },
    // Red guys
    declined: {
      bg: "bg-[#F6E7E6]",
      text: "text-[#A80B00]"
    },
    rejected: {
      bg: "bg-[#F6E7E6]",
      text: "text-[#A80B00]"
    },
    not_eligible: {
      bg: "bg-[#F6E7E6]",
      text: "text-[#A80B00]"
    },
    // Purple guys
    payment_processing: {
      bg: "bg-[#6633992a]",
      text: "text-[#663399]",
    },
  };

  const style = statusStyles[currentStatus as keyof typeof statusStyles] || {
    bg: "bg-gray-100",
    text: "text-gray-600"
  };

  const finalDisplayText = currentStatus === "verified" 
    ? "documents_verified"
    : displayText 
      ? displayText 
      : currentStatus;

  return (
    <View
      className={`px-3 py-2 rounded-lg inline-flex ${style.bg}`}
    >
      <Text className={`text-xs font-medium ${style.text}`}>
        {formatUnderScores(finalDisplayText, true)}
      </Text>
    </View>
  );
};

export default StatusCard;
