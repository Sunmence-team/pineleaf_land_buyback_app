import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

const documentsPreparationScreen = () => {
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
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.thirdContainer}>
            <View>
              <Text style={styles.headerText}>
                Please provide the following documents at your selected office
                to complete your buyback process.
              </Text>

              <View style={styles.innerCard}>
                <Text style={styles.requiredText}>Required documents</Text>

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

export default documentsPreparationScreen;

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
    padding: 18,
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
