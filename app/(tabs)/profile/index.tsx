import { assets } from "@/assets/assets";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileCard = () => {
  return (
    <View style={styles.profileCard}>
      <Image source={assets.profileImage} style={styles.profileImage} />

      <Text style={styles.name}>Otitio Nzekwisi</Text>
      <Text style={styles.email}>otita@gmail.com</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <ProfileCard />

        <View style={styles.smallCard}>
          <View style={styles.smallHeader}>
            <View>
              <View style={styles.smallFlex}>
                <Text style={styles.smallTitle}>Bank details missing</Text>
                <AntDesign name="plus" size={22} color="#000" />
              </View>

              <Text style={styles.smallText}>
                Add your account details to receive buyback payment.
              </Text>
            </View>
          </View>

          <View style={styles.progressWrapper}>
            <View style={styles.progressBackground}>
              <View style={styles.progressFill} />
            </View>

            <Text style={styles.percent}>76%</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/editScreen")}
          >
            <View style={styles.menuLeft}>
              <FontAwesome5 name="user" size={24} color="black" />
              <Text style={styles.menuText}>Edit profile</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
  },
  secondContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  profileCard: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },

  name: {
    fontSize: 25,
    color: "black",
    fontFamily: " quickSemiBold",
  },

  email: {
    fontSize: 18,
    color: "#666",
    marginTop: 8,
  },

  smallCard: {
    backgroundColor: "#E8EFEA",
    padding: 18,
    marginBottom: 20,
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
    color: "",
    marginBottom: 8,
    fontFamily: " quickSemiBold",
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
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 15,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
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
});
