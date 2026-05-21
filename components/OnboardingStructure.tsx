import React from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import ActionButton from "./buttons/ActionButton";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, RelativePathString, router } from "expo-router";

interface OnboardingStructureProps {
  title1: string;
  title2: string;
  subText: string;
  index: number;
  imageUrl: ImageSourcePropType;
  nextPageURL: string;
}

export const OnboardingStructure: React.FC<OnboardingStructureProps> = ({
  title1,
  title2,
  subText,
  index,
  imageUrl
}) => {

  const onboardingNavigations = [
    {
      path: "/(onboarding)/stepOne"
    },
    {
      path: "/(onboarding)/stepTwo"
    },
    {
      path: "/(onboarding)/stepThree"
    }
  ]

  const handleAction = () => {
    router.push(onboardingNavigations[index-1])
  }
  const handleSkip = () => {
    router.push("/(auth)/")
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={imageUrl}
        resizeMode="contain"
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['#F4F6F1', 'transparent', '#F4F6F1']}
          locations={[0.2, 0.5, 1.0]}
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginBottom: 50 }}>
            <View
              className="flex-row"
              style={{
                justifyContent: "flex-end",
                gap: 6,
                marginBottom: 20,
              }}
            >
              {onboardingNavigations.map(({ path }, i) => {
                const pageNumber = i + 1;
                
                return (
                  <Link
                    href={path}
                    style={[
                      styles.pageTabs, 
                      pageNumber === index && styles.pageTabsActive
                    ]}
                    key={i}
                  >
                  </Link>
                );
              })}
            </View>
            <AppText
              style={{
                fontFamily: "quickSemiBold",
                fontSize: 32,
              }}
            >
              {title1}
            </AppText>
            <AppText
              style={{
                fontFamily: "quickSemiBold",
                fontSize: 32,
              }}
            >
              {title2}
            </AppText>
            <AppText style={{ fontSize: 16, marginTop: 10 }}>{subText}</AppText>
          </View>
          <View className="flex-col gap-6">
            <ActionButton name="Next" action={handleAction} />
            {index <= 2 && (
              <ActionButton name="Skip" hasBG={false} optStyle={{ marginTop: 10 }} action={handleSkip} />
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

};

const styles = StyleSheet.create({
  pageTabs: {
    height: 8,
    width: 50,
    backgroundColor: "#E8EFEA",
    borderRadius: 20,
  },
  pageTabsActive: {
    backgroundColor: "#154A22"
  }
})
