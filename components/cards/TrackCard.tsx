import React from "react";
import { ScrollView, Text, View } from "react-native";
import { MyPropertyProps } from "@/lib/interfaces";

type TimelineStatus = "completed" | "active" | "upcoming";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  status: TimelineStatus;
}

interface TrackCardProps {
  property?: MyPropertyProps;
}

const statusStyles = {
  completed: {
    circle: "bg-primary border-primary",
    line: "border-primary",
    title: "text-primary font-quickSemiBold",
    subtitle: "text-gray-400 font-quickRegular",
  },

  active: {
    circle: "bg-primary/20 border-primary",
    line: "border-primary/40",
    title: "text-primary font-quickBold",
    subtitle: "text-black font-quickMedium",
  },

  upcoming: {
    circle: "bg-gray-200 border-gray-200",
    line: "border-gray-200",
    title: "text-gray-400 font-quickSemiBold",
    subtitle: "text-gray-400 font-quickRegular",
  },
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

export default function RequestTracker({ property }: TrackCardProps) {
  if (!property) {
    return null;
  }

  const status = property.status || "not_eligible";
  const eligibility = property.eligibility || "not_eligible";
  const offerStatus = property.offer_status;

  const isEligible = eligibility === "Eligible" || status !== "not_eligible";
  const isRequested = status !== "not_eligible" && status !== "eligible";
  const isOfferSent = !!property.offer_date || status === "offer_sent" || offerStatus === "pending" || status === "verified" || status === "completed";
  const isOfferAccepted = offerStatus === "accepted" || status === "verified" || status === "completed";
  const isDocsSubmitted = !!property.documents_submitted_at || status === "verified" || status === "completed";
  const isDocsVerified = !!property.verified_at || status === "completed";
  const isPaid = !!property.paid_at || status === "completed";

  const timelineData: TimelineItemProps[] = [
    {
      title: "Property Added",
      subtitle: formatDate(property.purchase_date),
      status: "completed",
    },
    {
      title: "Eligibility Reached",
      subtitle: isEligible ? formatDate(property.eligibility_date) : "Awaiting eligibility date",
      status: isEligible ? "completed" : "active",
    },
    {
      title: "Buyback Requested",
      subtitle: isRequested 
        ? formatDate(property.created_at || property.updated_at) 
        : (status === "eligible" ? "Tap 'Request Buyback' to begin" : "Upcoming"),
      status: isRequested ? "completed" : (status === "eligible" ? "active" : "upcoming"),
    },
    {
      title: "Offer Sent",
      subtitle: isOfferSent 
        ? (formatDate(property.offer_date) || "Offer received") 
        : (status === "pending" ? "Under review by acquisition team" : "Upcoming"),
      status: isOfferSent ? "completed" : (status === "pending" ? "active" : "upcoming"),
    },
    {
      title: "Offer Accepted",
      subtitle: isOfferAccepted 
        ? "Offer accepted" 
        : (status === "offer_sent" ? "Please review the offer details" : "Upcoming"),
      status: isOfferAccepted ? "completed" : (status === "offer_sent" ? "active" : "upcoming"),
    },
    {
      title: "Documents Submitted",
      subtitle: isDocsSubmitted 
        ? (formatDate(property.documents_submitted_at) || "Documents submitted") 
        : (offerStatus === "accepted" ? "Please upload required documents below" : "Upcoming"),
      status: isDocsSubmitted ? "completed" : (offerStatus === "accepted" ? "active" : "upcoming"),
    },
    {
      title: "Documents Verified",
      subtitle: isDocsVerified 
        ? (formatDate(property.verified_at) || "Documents verified") 
        : (isDocsSubmitted ? "Verification in progress" : "Upcoming"),
      status: isDocsVerified ? "completed" : (isDocsSubmitted ? "active" : "upcoming"),
    },
    {
      title: "Payment Processing",
      subtitle: isPaid 
        ? "Payment completed" 
        : (isDocsVerified ? "Processing payment" : "Upcoming"),
      status: isPaid ? "completed" : (isDocsVerified ? "active" : "upcoming"),
    },
    {
      title: "Paid",
      subtitle: isPaid 
        ? (formatDate(property.paid_at) || "Paid") 
        : (isDocsVerified ? "Awaiting payment confirmation" : "Upcoming"),
      status: isPaid ? "completed" : (isDocsVerified ? "active" : "upcoming"),
    },
  ];

  return (
    <ScrollView className="flex-1 py-5">
      <View className="bg-secondary border border-gray-300 rounded-lg p-5">
        {timelineData.map((item, index) => {
          const isLast = index === timelineData.length - 1;

          return (
            <View
              key={index}
              className="flex-row"
            >
              {/* LEFT SIDE */}
              <View className="items-center mr-4">
                {/* CIRCLE */}
                <View
                  className={`
                    w-7 h-7 rounded-full border-4
                    ${statusStyles[item.status].circle}
                  `}
                />

                {/* LINE */}
                {!isLast && (
                  <View
                    className={`
                      w-[1px] flex-1 border-l border-dashed
                      ${statusStyles[item.status].line}
                    `}
                  />
                )}
              </View>

              {/* RIGHT SIDE */}
              <View className="pb-8 flex-1">
                <Text
                  className={`
                    text-lg
                    ${statusStyles[item.status].title}
                  `}
                >
                  {item.title}
                </Text>

                <Text
                  className={`
                    text-base mt-1
                    ${statusStyles[item.status].subtitle}
                  `}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}