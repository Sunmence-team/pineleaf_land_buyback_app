import { AppText } from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.card}>
          <AppText style={styles.heading}>Need help?</AppText>

          <AppText style={styles.description}>
            If you have any questions about your buyback process or document
            submission, our support team is here to help.
          </AppText>

          <View style={styles.innerCard}>
            <View style={styles.item}>
              <Ionicons name="call-outline" size={20} className="mt-2" />

              <View style={{ flex: 1 }}>
                <AppText style={styles.title}>Call Support</AppText>

                <AppText style={styles.subText}>09083383883</AppText>
              </View>
            </View>

            <View style={styles.item}>
              <Ionicons name="mail-outline" size={20} className="mt-2" />

              <View style={{ flex: 1 }}>
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
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                className="mt-2"
              />

              <View style={{ flex: 1 }}>
                <AppText style={styles.title}>Live Chat</AppText>

                <AppText style={styles.subText}>
                  Get quick answers and real-time assistance.
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactScreen;

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

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    padding: 16,
  },

  heading: {
    fontSize: 18,
    marginBottom: 8,
    color: "#111",
    fontFamily: "quickSemiBold",
  },
  
  description: {
    fontFamily: "quickMedium",
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
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: "#111",
    marginBottom: 4,
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
    marginTop: 4,
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
