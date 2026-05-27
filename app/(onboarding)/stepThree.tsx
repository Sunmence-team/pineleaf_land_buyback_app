import { assets } from "@/assets/assets";
import { OnboardingStructure } from "@/components/OnboardingStructure";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const stepThree = () => {
  const details = {
    title1: "Simple Process",
    title2: "Faster Payouts.",
    subText:
      "Request buyback, submit documents and get paid all in a few easy steps with full support.",
    imageUrl: assets.onboarding3,
    position: 2,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  );
};

export default stepThree;
