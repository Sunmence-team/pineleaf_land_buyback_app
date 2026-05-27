import React from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet, View, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";
import ActionButton from "./buttons/ActionButton";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";

interface OnboardingStructureProps {
  title1: string;
  title2: string;
  subText: string;
  position: number;
  imageUrl: ImageSourcePropType;
  resizeType?: "cover" | "contain" | "stretch" | "center";
}

export const OnboardingStructure: React.FC<OnboardingStructureProps> = ({
  title1,
  title2,
  subText,
  position,
  imageUrl,
  resizeType
}) => {

  const onboardingNavigations: { path: any }[] = [
    { path: "/(onboarding)/stepOne" },
    { path: "/(onboarding)/stepTwo" },
    { path: "/(onboarding)/stepThree" },
    { path: "/(auth)/register" }
  ];

  const handleAction = () => {
    const nextRoute = onboardingNavigations[position + 1]?.path;
    if (nextRoute) {
      router.push(nextRoute);
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/register");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={imageUrl}
        resizeMode={resizeType || "cover"}
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
          <View>
            <View
              className="flex-row"
              style={{
                justifyContent: "flex-end",
                gap: 6,
                marginBottom: 20,
              }}
            >
              {onboardingNavigations.slice(0, 3).map(({ path }, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (i !== position) {
                      router.push(path);
                    }
                  }}
                  style={[
                    styles.pageTabs,
                    i === position && styles.pageTabsActive,
                    {
                      paddingVertical: 4, 
                    }
                  ]}
                />
              ))}
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

          {/* Bottom Section: Navigation Buttons */}
          <View className="flex-col gap-2" style={{ marginBottom: 15 }}>
            <ActionButton 
              name={position === 2 ? "Get Started" : "Next"} 
              action={handleAction} 
            />
            {position < 2 && (
              <ActionButton name="Skip" hasBG={false} action={handleSkip} />
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
});