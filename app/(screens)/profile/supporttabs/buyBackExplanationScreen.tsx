import { AppText } from "@/components/AppText";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

const ListItem: React.FC<{ title: string; text: string; digit: number }> = ({
  title,
  text,
  digit,
}) => {
  return (
    <View>
      <AppText style={{ fontFamily: "quickSemiBold" }} className="text-lg mb-1">
        {digit}. {title}
      </AppText>
      <AppText style={{ fontFamily: "quickMedium" }} className="text-lg">
        {text}
      </AppText>
    </View>
  );
};

const buyBackExplanationScreen = () => {
  const explanations = [
    {
      title: "Eligibility",
      text: "The property must meet certain conditions before it can be sold back.",
    },
    {
      title: "Request Buyback",
      text: "The user signals interest in selling the property.",
    },
    {
      title: "Company Review & Offer",
      text: "The company evaluates the property and sends a non-negotiable offer.",
    },
    {
      title: "Accept or Decline",
      text: "The user decides whether to proceed.",
    },
    {
      title: "Document Submission",
      text: "If accepted, the user submits required documents (physically at an office).",
    },
    {
      title: "Verification & Payment",
      text: "The company verifies the documents and processes payment.",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <ScrollView className="flex-1" contentContainerStyle={styles.thirdContainer}>
          <AppText className="text-[17px]" style={{ fontFamily: "quickMedium" }}>
            Buyback is a feature that allows a user to sell their property back to the company through a structured process.
          </AppText>
          <AppText className="text-[17px]" style={{ fontFamily: "quickMedium" }}>
            Instead of finding a buyer themselves, the company reviews the property and makes a fixed offer. If the user accepts, they complete a few required steps, and the company handles the payout.
          </AppText>
          <AppText
            style={{ fontFamily: "quickSemiBold" }}
            className="text-lg mt-6"
          >
            How It Works
          </AppText>
          <View className="flex-col gap-8 mt-4">
            {explanations.map((explanation, index) => (
              <ListItem {...explanation} digit={index+1} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default buyBackExplanationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#F4F6F1",
  },

  secondContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  thirdContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
});
