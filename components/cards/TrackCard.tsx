import React from "react";
import { Text, View } from "react-native";
import { MyPropertyProps } from "@/lib/interfaces";
import { formatPrettyDate } from "@/helpers/formatterUtility";

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

export default function RequestTracker({ property }: TrackCardProps) {
  if (!property) {
    return null;
  }

  const status = (property.status || "not_eligible") as string;
  const eligibility = property.eligibility || "not_eligible";
  const offerStatus = property.offer_status;

  const isPaid = !!property.paid_at || status === "completed" || status === "paid";
  const isDocsVerified = isPaid || !!property.verified_at || status === "verified";
  const isOfferAccepted = offerStatus === "accepted" || offerStatus === "approved" || status === "verified" || status === "completed" || status === "paid";
  const isDocsSubmitted = isDocsVerified || (isOfferAccepted && (!!property.documents_submitted_at || !!property.deed_of_assignment || !!property.company_receipt));
  const isOfferSent = isOfferAccepted || status === "offer_sent" || status === "verified" || status === "completed" || status === "paid";
  const isRequested = status !== "not_eligible" && status !== "eligible";
  const isEligible = isRequested || eligibility === "Eligible" || status !== "not_eligible";

  const timelineData: TimelineItemProps[] = [
    {
      title: "Property Added",
      subtitle: formatPrettyDate(property?.purchase_date ?? ""),
      status: "completed",
    },
    {
      title: "Eligibility Reached",
      subtitle: isEligible ? formatPrettyDate(property?.eligibility_date ?? "") : "Awaiting eligibility date",
      status: isEligible ? "completed" : "active",
    },
    {
      title: "Buyback Requested",
      subtitle: isRequested 
        ? formatPrettyDate(property?.created_at || property.updated_at) 
        : (status === "eligible" ? "Tap 'Request Buyback' above to begin" : "Upcoming"),
      status: isRequested ? "completed" : (status === "eligible" ? "active" : "upcoming"),
    },
    {
      title: "Offer Sent",
      subtitle: isOfferSent 
        ? (formatPrettyDate(property?.offer_date ?? "") || "Offer received") 
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
        ? (formatPrettyDate(property?.documents_submitted_at ?? "") || "Documents submitted") 
        : (offerStatus === "accepted" ? "Please upload required documents below" : "Upcoming"),
      status: isDocsSubmitted ? "completed" : (offerStatus === "accepted" ? "active" : "upcoming"),
    },
    {
      title: "Documents Verified",
      subtitle: isDocsVerified 
        ? (formatPrettyDate(property?.verified_at ?? "") || "Documents verified") 
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
        ? (formatPrettyDate(property?.paid_at ?? "") || "Paid") 
        : (isDocsVerified ? "Awaiting payment confirmation" : "Upcoming"),
      status: isPaid ? "completed" : (isDocsVerified ? "active" : "upcoming"),
    },
  ];

  return (
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
            <View className={`${isLast ? "" : "pb-8"} flex-1`}>
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
  );
}