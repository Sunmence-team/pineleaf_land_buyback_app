import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingStructure } from '@/components/OnboardingStructure'
import { assets } from '@/assets/assets'

const stepTwo = () => {

  const details = {
    title1: "Track. Manage",
    title2: "Stay Informed",
    subText: "See your property status, eligibility and buyback progress  all in real time, always clear.",
    imageUrl: assets.onboarding2,
    position: 1,
    resizeType: "contain" as const,
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  )
}

export default stepTwo