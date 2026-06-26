import React from "react";
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText } from "@/components/AppText";
import StepProgress from "@/components/StepProgress";
import ActionButton from "@/components/buttons/ActionButton";
import { AddPropertyProvider, useAddProperty } from "@/context/AddPropertyContext";

function AddPropertyLayoutContent() {
  const {
    currentStep,
    hasSubmit,
    resetAddPropertyFlow,
    isStepValid,
    touchStepFields,
    formik,
  } = useAddProperty();
  const router = useRouter();

  const handleClose = () => {
    resetAddPropertyFlow();
    router.replace("/(tabs)");
  };

  const handleBack = () => {
    router.back();
  };

  const stepRoutes = ["stepOne", "stepTwo", "stepThree", "stepFour"];

  const handleNext = () => {
    touchStepFields(currentStep);
    if (!isStepValid(currentStep)) return;

    if (currentStep === 4) {
      formik.submitForm();
      return;
    }

    const nextRoute = stepRoutes[currentStep];
    router.push(`/(screens)/(property)/add/${nextRoute}` as any);
  };

  const steps = [
    {
      label: "Details",
      status: currentStep > 1 ? ("done" as const) : currentStep === 1 ? ("current" as const) : ("todo" as const),
    },
    {
      label: "Value",
      status: currentStep > 2 ? ("done" as const) : currentStep === 2 ? ("current" as const) : ("todo" as const),
    },
    {
      label: "Documents",
      status: currentStep > 3 ? ("done" as const) : currentStep === 3 ? ("current" as const) : ("todo" as const),
    },
    {
      label: "Reviews",
      status: hasSubmit ? ("done" as const) : currentStep === 4 ? ("current" as const) : ("todo" as const),
    },
  ];

  const isValid = isStepValid(currentStep);

  return (
    <SafeAreaView className="flex-col justify-between flex-1 bg-secondary">
      {/* Shared Header */}
      <View className="flex-row items-center justify-between px-5 pt-4">
        {currentStep <= 1 || hasSubmit ? (
          <TouchableOpacity className="w-[10%]" onPress={handleClose}>
            <Ionicons name="close" size={32} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="w-[10%]" onPress={handleBack}>
            <Ionicons name="chevron-back-outline" size={32} color="black" />
          </TouchableOpacity>
        )}
        <AppText className="text-xl" style={{ fontFamily: "quickSemiBold" }}>
          Add Property
        </AppText>
        <View className="w-6" />
      </View>

      {/* Shared Progress Indicator */}
      <View className="px-5 w-full">
        <StepProgress steps={steps} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >

        {/* Standalone child step screens */}
        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 15 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        {/* Shared Footer Actions */}
        {!hasSubmit && (
          <View className="bg-secondary px-5 pt-4 border-t border-gray-100">
            <ActionButton
              name={currentStep === 4 ? "Submit" : "Next"}
              action={handleNext}
              disabled={!isValid}
              optStyle={{
                backgroundColor: !isValid ? "#BDBDBD" : "#154A22",
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function AddPropertyLayout() {
  return (
    <AddPropertyProvider>
      <AddPropertyLayoutContent />
    </AddPropertyProvider>
  );
}
