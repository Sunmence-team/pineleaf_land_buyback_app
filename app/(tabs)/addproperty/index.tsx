import { AppText } from "@/components/AppText";
import StepProgress from "@/components/StepProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Add Property Screen - Multi-Step Form Wizard
 *
 * USAGE GUIDE:
 * ============
 *
 * 1. Track the current step with state:
 *    const [currentStep, setCurrentStep] = useState(1);
 *
 * 2. Build the step status array for StepProgress component:
 *    - Each step needs { label, status: "done" | "current" | "todo" }
 *    - "done": Step completed (shows green checkmark)
 *    - "current": Current step (shows step number with green border)
 *    - "todo": Not yet reached (shows gray step number)
 *
 *    Example:
 *    const steps = [
 *      { label: "Details", status: currentStep > 1 ? "done" : currentStep === 1 ? "current" : "todo" },
 *      { label: "Value", status: currentStep > 2 ? "done" : currentStep === 2 ? "current" : "todo" },
 *      { label: "Documents", status: currentStep > 3 ? "done" : currentStep === 3 ? "current" : "todo" },
 *      { label: "Reviews", status: currentStep === 4 ? "current" : "todo" },
 *    ];
 *
 * 3. Implement your form content in renderStepContent():
 *    - Add form inputs for each step (TextInput, Picker, etc)
 *    - Manage form state with useState hooks
 *    - Return different JSX based on currentStep value
 *
 * 4. Update step navigation:
 *    - Back button: decrements currentStep
 *    - Next button: increments currentStep (changes to "Submit" on step 4)
 *
 * COMPONENTS USED:
 * - StepProgress: Displays the multi-step indicator with 4 steps
 * - AppText: Custom text component with font "quickRegular"
 * - SafeAreaView, ScrollView, View, TouchableOpacity: React Native base components
 */

const AddProperty = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // TODO: Build your step status array for the progress indicator
  const steps: { label: string; status: "done" | "current" | "todo" }[] = [
    {
      label: "Details",
      status: currentStep > 1 ? "done" : currentStep === 1 ? "current" : "todo",
    },
    {
      label: "Value",
      status: currentStep > 2 ? "done" : currentStep === 2 ? "current" : "todo",
    },
    {
      label: "Documents",
      status: currentStep > 3 ? "done" : currentStep === 3 ? "current" : "todo",
    },
    {
      label: "Reviews",
      status: currentStep === 4 ? "current" : "todo",
    },
  ];

  // TODO: Implement your step content rendering
  // Add form inputs, state management, and logic for each step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="flex-1 items-center justify-center">
            <AppText className="text-base text-gray-600">
              Details Step - Implement here
            </AppText>
          </View>
        );
      case 2:
        return (
          <View className="flex-1 items-center justify-center">
            <AppText className="text-base text-gray-600">
              Value Step - Implement here
            </AppText>
          </View>
        );
      case 3:
        return (
          <View className="flex-1 items-center justify-center">
            <AppText className="text-base text-gray-600">
              Documents Step - Implement here
            </AppText>
          </View>
        );
      case 4:
        return (
          <View className="flex-1 items-center justify-center">
            <AppText className="text-base text-gray-600">
              Review Step - Implement here
            </AppText>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with close button and title */}
      <View className="flex-row items-center justify-between border-b border-gray-200 px-5 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <AppText className="text-base font-semibold">Add Property</AppText>
        <View className="w-6" />
      </View>

      {/* Step Progress Indicator - Shows current progress through 4 steps */}
      <View className="px-5">
        <StepProgress steps={steps} />
      </View>

      {/* Main Content Area - Scrollable step content */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <AppText className="mb-6 text-xl font-bold">
          {["Details", "Value", "Documents", "Reviews"][currentStep - 1]}
        </AppText>
        {renderStepContent()}
      </ScrollView>

      {/* Navigation Buttons - Back and Next/Submit buttons */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-5 py-4">
        <View className="flex-row items-center justify-between gap-3">
          <TouchableOpacity
            onPress={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="flex-1 rounded-3xl border border-gray-200 bg-white px-5 py-4"
          >
            <AppText className="text-center text-sm text-gray-600">
              Back
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
            className="flex-1 rounded-3xl bg-primary px-5 py-4"
          >
            <AppText className="text-center text-sm font-semibold text-white">
              {currentStep === 4 ? "Submit" : "Next"}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProperty;
