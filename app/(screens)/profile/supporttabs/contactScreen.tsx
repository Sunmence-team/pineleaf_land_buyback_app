import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const contactScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.card}>
            <Text style={styles.heading}>Need help?</Text>

            <Text style={styles.description}>
              If you have any questions about your buyback process or document
              submission, our support team is here to help.
            </Text>

            <View style={styles.supportCard}>
              <View style={styles.item}>
                <View style={styles.iconContainer}>
                  <Ionicons name="call-outline" size={26} color="#111" />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Call Support</Text>
                  <Text style={styles.subText}>09083383883</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContainer}>
                  <Ionicons name="mail-outline" size={26} color="#111" />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Email Support</Text>

                  <Text style={styles.subText}>
                    Send us your questions and we’ll respond as soon as
                    possible.
                  </Text>

                  <Text style={styles.email}>
                    pineleafestatebuyback@gmail.com
                  </Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={26}
                    color="#111"
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Live Chat</Text>

                  <Text style={styles.subText}>
                    Get quick answers and real-time assistance.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default contactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    padding: 14,
  },

  heading: {
    fontSize: 28,
    color: "#111",
    marginBottom: 16,
  },

  description: {
    fontSize: 18,
    lineHeight: 25,
    color: "#222",
    marginBottom: 24,
  },

  supportCard: {
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 20,
    padding: 18,
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  iconContainer: {
    marginRight: 16,
    marginTop: 4,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    color: "#111",
    marginBottom: 8,
  },

  subText: {
    fontSize: 18,
    lineHeight: 18,
    color: "#333",
  },

  email: {
    fontSize: 18,
    color: "#111",
    marginTop: 8,
  },
});
