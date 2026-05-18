import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      "You may need to submit your ID card, proof of address, and bank details.",
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
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <View>
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
                  <Text style={styles.question}>{item.question}</Text>

                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-forward"}
                    size={22}
                    color="#333"
                  />
                </View>

                {isOpen && <Text style={styles.answer}>{item.answer}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
  },

  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingBottom: 10,
  },

  faqBox: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 18,
    backgroundColor: "#fff",
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    fontSize: 20,
    fontWeight: "500",
    color: "#111",
    flex: 1,
    paddingRight: 10,
  },

  answer: {
    marginTop: 15,
    fontSize: 15,
    lineHeight: 22,
    color: "black",
  },
});
