import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

const timelineExpectationsScreen = () => {
  const documents = [
    {
      title: "Request Review",
      description: "1–3 business days",
    },
    {
      title: "Offer Sent",
      description: "Within 3–5 business days after review",
    },
    {
      title: "Document Submission",
      description: "Based on your availability",
    },
    {
      title: "Document Verification",
      description: "3–7 business days after submission",
    },
    {
      title: "Payment Processing",
      description: "5–10 business days after approval",
    },
  ];
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.thirdContainer}>
            <View>
              <Text style={styles.headerText}>
                The buyback process takes a few steps and may take some time to
                complete. Here’s a general timeline:
              </Text>

              <View style={styles.innerCard}>
                <Text style={styles.requiredText}>Timeline Breakdown</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                  {documents.map((item, index) => (
                    <View key={index} style={styles.documentItem}>
                      <View style={styles.row}>
                        <Entypo name="dot-single" size={45} color="black" />

                        <View style={styles.textContainer}>
                          <Text style={styles.title}>{item.title}</Text>
                          <Text style={styles.description}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default timelineExpectationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  thirdContainer: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  headerText: {
    fontSize: 20,
    color: "black",
    lineHeight: 27,
  },

  innerCard: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 15,
    padding: 15,
    paddingHorizontal:18,
    marginTop: 25,
    // backgroundColor: "#F4F6F1",
  },

  requiredText: {
    fontSize: 24,
    color: "#111111",
    marginBottom: 20,
  },

  documentItem: {
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    color: "#111111",
    marginBottom: 6,
    fontFamily: " quickSemiBold",
  },

  description: {
    fontSize: 18,
    color: "#555555",
    lineHeight: 26,
  },
});
