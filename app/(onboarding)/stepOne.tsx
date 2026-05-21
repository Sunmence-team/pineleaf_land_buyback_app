import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingStructure } from '@/components/OnboardingStructure'
import { assets } from '@/assets/assets'

const stepOne = () => {

  const details = {
    title1: "Your Property",
    title2: "Our Promise.",
    subText: "A seamless buyback experience built on trust, transparency and real value for you.",
    imageUrl: assets.onboarding1,
    index: 1
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  )
}

export default stepOne