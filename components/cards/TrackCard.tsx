import React from "react";
import { ScrollView, Text, View } from "react-native";

type TimelineStatus = "completed" | "active" | "upcoming";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  status: TimelineStatus;
}

const timelineData: TimelineItemProps[] = [
  {
    title: "Property Added",
    subtitle: "12 Apr 2025",
    status: "completed",
  },
  {
    title: "Eligibility Reached",
    subtitle: "12 Apr 2025",
    status: "completed",
  },
  {
    title: "Buyback Requested",
    subtitle: "Tap button above to begin",
    status: "active",
  },
  {
    title: "Offer Sent",
    subtitle: "Upcoming",
    status: "upcoming",
  },
  {
    title: "Offer Accepted",
    subtitle: "Upcoming",
    status: "upcoming",
  },
  {
    title: "Documents Submitted",
    subtitle: "Upcoming",
    status: "upcoming",
  },
  {
    title: "Documents Verified",
    subtitle: "Upcoming",
    status: "upcoming",
  },
  {
    title: "Payment Processing",
    subtitle: "Upcoming",
    status: "upcoming",
  },
  {
    title: "Paid",
    subtitle: "Upcoming",
    status: "upcoming",
  },
];

const statusStyles = {
  completed: {
    circle: "bg-primary border-primary",
    line: "border-primary",
    title: "text-primary",
    subtitle: "text-gray-400",
  },

  active: {
    circle: "bg-primary/20 border-primary",
    line: "border-primary/40",
    title: "text-primary font-semibold",
    subtitle: "text-black",
  },

  upcoming: {
    circle: "bg-gray-200 border-gray-200",
    line: "border-gray-200",
    title: "text-gray-400",
    subtitle: "text-gray-400",
  },
};

export default function RequestTracker() {
  return (
    <ScrollView className="flex-1 bg-white py-5">
      <View className="border border-gray-300 rounded-lg p-5">

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