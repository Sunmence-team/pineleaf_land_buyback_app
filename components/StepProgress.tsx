import React from "react";
import { View } from "react-native";
import { AppText } from "./AppText";

interface StepProgressProps {
  steps: {
    label: string;
    status: "done" | "current" | "todo";
  }[];
}

const StepProgress: React.FC<StepProgressProps> = ({ steps }) => {
  return (
    <View className="flex-row items-center justify-between px-1 py-2">
      {steps.map((step, index) => (
        <View key={step.label} className="flex-1 items-center">
          <View className="flex-row items-center w-full">
            <View
              className={`h-9 w-9 rounded-full items-center justify-center border ${
                step.status === "done"
                  ? "bg-primary border-primary"
                  : step.status === "current"
                    ? "bg-white border-primary"
                    : "bg-white border-gray-300"
              }`}
            >
              <AppText
                className={`font-semibold ${
                  step.status === "done" ? "text-white" : "text-black"
                }`}
              >
                {index + 1}
              </AppText>
            </View>
            {index !== steps.length - 1 && (
              <View
                className={`flex-1 h-[2px] ${
                  steps[index + 1].status === "todo"
                    ? "bg-gray-300"
                    : "bg-primary"
                }`}
              />
            )}
          </View>
          <AppText className="mt-2 text-xs text-center text-gray-500">
            {step.label}
          </AppText>
        </View>
      ))}
    </View>
  );
};

export default StepProgress;
