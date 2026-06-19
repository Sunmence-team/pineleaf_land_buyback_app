import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";
import { AppText } from "./AppText";

/**
 * StepProgress Component
 *
 * A progress indicator that shows multiple steps with visual status feedback.
 *
 * USAGE:
 * ------
 * import StepProgress from "@/components/StepProgress";
 *
 * const [currentStep, setCurrentStep] = useState(1);
 *
 * const steps = [
 *   { label: "Details", status: "done" },
 *   { label: "Value", status: "current" },
 *   { label: "Documents", status: "todo" },
 *   { label: "Reviews", status: "todo" },
 * ];
 *
 * <StepProgress steps={steps} />
 *
 * STEP STATUSES:
 * ------
 * - "done" (green checkmark circle): Completed steps
 * - "current" (green outline circle): Active/current step
 * - "todo" (gray outline circle): Not yet started
 *
 * FEATURES:
 * ------
 * - Shows circles for each step with checkmark when done
 * - Displays step labels below circles
 * - Connecting lines between steps (green when previous step done, gray when pending)
 * - Responsive layout that grows/shrinks based on number of steps
 */

interface StepProgressProps {
  steps: {
    label: string;
    status: "done" | "current" | "todo";
  }[];
}

const StepProgress: React.FC<StepProgressProps> = ({ steps }) => {
  return (
    <View className="w-full flex flex-row items-center justify-between px-1 pt-4 pb-2">
      {steps.map((step, index) => (
        <View key={step.label} className={`${index !== steps.length - 1 ? "flex-1" : ""}`}>
          <View className="flex-row items-center w-full">
            <View
              className={`h-10 w-10 rounded-full items-center justify-center border-2 ${
                step.status === "done"
                  ? "bg-primary border-primary"
                  : step.status === "current"
                    ? "bg-white border-primary"
                    : "bg-white border-gray-300"
              }`}
            >
              {step.status === "done" ? (
                <Ionicons name="checkmark" size={20} color="white" />
              ) :null}
            </View>

            {index !== steps.length - 1 && (
              <View
                className={`flex-1 h-0.5 ${
                  step.status === "done" ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </View>

          <AppText
            className={`mt-1 text-xs font-medium  ${
              step.status === "current" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {step.label}
          </AppText>
        </View>
      ))}
    </View>
  );
};

export default StepProgress;
