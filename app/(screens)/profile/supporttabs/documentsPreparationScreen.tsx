import { AppText } from "@/components/AppText";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

const DocumentsPreparationScreen = () => {
  const documents = [
    {
      title: "Deed of assignment",
      description: "Original signed copy of deed",
    },
    {
      title: "Allocation letter",
      description: "Official letter issued during property acquisition",
    },
    {
      title: "Company-issued receipt",
      description: "Original payment receipt from the company",
    },
    {
      title: "Electronic receipt",
      description: "Print out any digital transaction",
    },
    {
      title: "Any additional docs requested",
      description: "Any other site-specific or legal papers requested",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <AppText className="text-lg" style={{ fontFamily: "quickSemiBold" }}>
            Please provide the following documents at your selected office to
            complete your buyback process.
          </AppText>
          <View style={styles.innerCard}>
            <AppText style={styles.requiredText}>Required documents</AppText>

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
  );
};

export default DocumentsPreparationScreen;

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
  innerCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  requiredText: {
    fontSize: Platform.select({
      ios: 24,
      android: 18,
    }),
    fontFamily: "quickSemiBold",
    color: "#111111",
    marginBottom: 20,
  },

  documentItem: {
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
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
