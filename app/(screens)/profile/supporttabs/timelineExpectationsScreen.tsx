import { AppText } from "@/components/AppText";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TimelineExpectationsScreen = () => {
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
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <View>
            <AppText style={styles.headerText}>
              The buyback process takes a few steps and may take some time to
              complete. Here’s a general timeline:
            </AppText>

            <View style={styles.innerCard}>
              <AppText style={styles.requiredText}>Timeline Breakdown</AppText>

              <ScrollView showsVerticalScrollIndicator={false}>
                {documents.map((item, index) => (
                  <View key={index} style={styles.documentItem}>
                    <View style={styles.row}>
                      <Entypo name="dot-single" size={20} color="black" />

                      <View style={{ flex: 1 }}>
                        <AppText style={styles.title}>{item.title}</AppText>

                        <AppText style={styles.description}>
                          {item.description}
                        </AppText>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimelineExpectationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#F4F6F1",
  },
  secondContainer: {
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

  headerText: {
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

  innerCard: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginTop: 25,
  },

  requiredText: {
    fontSize: 22,
    color: "#111111",
    marginBottom: 20,
    fontFamily: "quickSemiBold",
  },

  documentItem: {
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  title: {
    fontSize: Platform.select({
      ios: 20,
      android: 16,
    }),
    color: "#111111",
    marginBottom: 4,
    fontFamily: "quickSemiBold",
  },

  description: {
    fontSize: Platform.select({
      ios: 18,
      android: 14,
    }),
    color: "#555555",
    lineHeight: Platform.select({
      ios: 27,
      android: 20,
    }),
  },
});
