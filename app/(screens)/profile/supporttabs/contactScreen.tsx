import { AppText } from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.card}>
          <AppText style={styles.heading}>Need help?</AppText>

          <AppText style={styles.description}>
            If you have any questions about your buyback process or document
            submission, our support team is here to help.
          </AppText>

          <View style={styles.supportCard}>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Ionicons name="call-outline" size={26} color="#111" />
              </View>

              <View style={styles.textContainer}>
                <AppText style={styles.title}>Call Support</AppText>

                <AppText style={styles.subText}>09083383883</AppText>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={26} color="#111" />
              </View>

              <View style={styles.textContainer}>
                <AppText style={styles.title}>Email Support</AppText>

                <AppText style={styles.subText}>
                  Send us your questions and we’ll respond as soon as possible.
                </AppText>

                <AppText style={styles.email}>
                  pineleafestatebuyback@gmail.com
                </AppText>
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
                <AppText style={styles.title}>Live Chat</AppText>

                <AppText style={styles.subText}>
                  Get quick answers and real-time assistance.
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 30,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    padding: 16,
  },

  heading: {
    fontSize: 28,
    color: "#111",
    marginBottom: 16,
    fontFamily: "quickSemiBold",
  },

  description: {
    marginBottom: 30,
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
    marginRight: 14,
    marginTop: 4,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    color: "#111",
    marginBottom: 8,
    fontFamily: "quickSemiBold",
  },

  subText: {
    fontSize: Platform.select({
      ios: 19,
      android: 15,
    }),
    color: "#555555",
    lineHeight: Platform.select({
      ios: 27,
      android: 20,
    }),
  },

  email: {
    color: "#111",
    marginTop: 10,
    fontSize: Platform.select({
      ios: 16,
      android: 12,
    }),
    lineHeight: Platform.select({
      ios: 27,
      android: 20,
    }),
    fontFamily: "quickSemiBold",
  },
});
