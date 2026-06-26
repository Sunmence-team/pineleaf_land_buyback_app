import { AppText } from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const faqData = [
  {
    id: "1",
    question: "Why is my property not eligible?",
    answer:
      "Your property may not meet the eligibility requirements at the moment.",
  },
  {
    id: "2",
    question: "Why was my request declined?",
    answer:
      "Requests can be declined due to incomplete or incorrect information.",
  },
  {
    id: "3",
    question: "How long does payout take?",
    answer: "Payout usually takes between 24 - 72 hours.",
  },
  {
    id: "4",
    question: "Which documents do I need to submit?",
    answer:
      "You may need to submit your receipt, allocation letter, and some others. See the documents page for more info.",
  },
  {
    id: "5",
    question: "What happens if my profile is incomplete?",
    answer:
      "Incomplete profiles may delay approval or limit access to some features.",
  },
];

const FaqScreen = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setActiveId(activeId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View className="flex-col gap-4">
          {faqData.map((item) => {
            const isOpen = activeId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={styles.faqBox}
                onPress={() => toggleFAQ(item.id)}
              >
                <View style={styles.questionRow}>
                  <AppText style={styles.question}>{item.question}</AppText>

                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-forward"}
                    size={22}
                    color="#333"
                  />
                </View>

                {isOpen && (
                  <AppText style={styles.answer}>{item.answer}</AppText>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
  },

  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  faqBox: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "#fff",
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    fontSize: Platform.select({
      ios: 20,
      android: 15,
    }),
    color: "black",
    lineHeight: Platform.select({
      ios: 27,
      android: 23,
    }),
    flex: 1,
    paddingRight: 10,
    fontFamily: "quickSemiBold",
  },

  answer: {
    marginTop: 15,
    fontSize: Platform.select({
      ios: 20,
      android: 16,
    }),
    color: "black",
    lineHeight: Platform.select({
      ios: 27,
      android: 23,
    }),
  },
});
