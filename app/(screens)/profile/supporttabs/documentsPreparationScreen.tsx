import { AppText } from "@/components/AppText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <View>
            <AppText style={styles.headerText}>
              Please provide the following documents at your selected office to
              complete your buyback process.
            </AppText>

            <View style={styles.innerCard}>
              <AppText style={styles.requiredText}>Required documents</AppText>

              <ScrollView showsVerticalScrollIndicator={false}>
                {documents.map((item, index) => (
                  <View key={index} style={styles.documentItem}>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="check-box-outline-blank"
                        size={30}
                        color="black"
                      />

                      <View style={styles.textContainer}>
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
    </SafeAreaView>
  );
};

export default DocumentsPreparationScreen;

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
    padding: 18,
    marginTop: 25,
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
