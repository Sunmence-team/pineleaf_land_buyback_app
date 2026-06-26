import { AppText } from "@/components/AppText";
import {
  Feather,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.menuContainer}>
          <View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/profile/supporttabs/faqScreen")}
            >
              <View style={styles.menuLeft}>
                <Feather name="message-circle" size={24} color="black" />

                <AppText style={styles.menuText}>FAQ</AppText>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.horizontalLine} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                router.push("/profile/supporttabs/buyBackExplanationScreen")
              }
            >
              <View style={styles.menuLeft}>
                <Foundation name="clipboard-notes" size={22} color="#111" />

                <View>
                  <AppText style={styles.menuText}>Buyback</AppText>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.horizontalLine} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                router.push("/profile/supporttabs/documentsPreparationScreen")
              }
            >
              <View style={styles.menuLeft}>
                <Ionicons name="document-outline" size={22} color="#111" />

                <AppText style={styles.menuText}>Document</AppText>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.horizontalLine} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                router.push("/profile/supporttabs/timelineExpectationsScreen")
              }
            >
              <View style={styles.menuLeft}>
                <Ionicons name="time-outline" size={22} color="#111" />

                <AppText style={styles.menuText}>Timeline expectation</AppText>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.horizontalLine} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/profile/supporttabs/contactScreen")}
            >
              <View style={styles.menuLeft}>
                <MaterialIcons name="contact-page" size={22} color="#111" />

                <AppText style={styles.menuText}>Contact</AppText>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
    paddingVertical: 20,
  },
  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  smallCard: {
    backgroundColor: "#E8EFEA",
    padding: 18,
    borderRadius: 15,
  },
  smallHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallFlex: {
    flexDirection: "row",
    gap: 120,
    alignItems: "center",
    width: "100%",
  },
  smallTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "quickSemiBold",
  },
  smallText: {
    fontSize: 16,
    color: "#45464D",
    lineHeight: 22,
    width: "80%",
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  progressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },

  progressFill: {
    width: "76%",
    height: "100%",
    backgroundColor: "#175326",
    borderRadius: 20,
  },

  percent: {
    fontSize: 16,
    color: "black",
  },

  menuContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 22,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  menuText: {
    fontSize: 18,
    color: "#111",
    fontWeight: "500",
  },

  subText: {
    marginTop: 4,
    color: "#777",
    fontSize: 14,
  },

  horizontalLine: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "90%",
    marginLeft: 14,
  },

  button: {
    height: Platform.select({
      ios: 60,
      android: 53,
    }),
    textAlign: "center",
    backgroundColor: "#144520",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
