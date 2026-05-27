import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import { router } from "expo-router";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import ActionButton from "@/components/buttons/ActionButton";

export const ProfileCard = () => {
  return (
    <View style={styles.profileCard}>
      <Image source={assets.profileImage} style={styles.profileImage} />

      <AppText style={styles.name}>Otitio Nzekwisi</AppText>
      <AppText style={styles.email}>otita@gmail.com</AppText>
    </View>
  );
};

const ProfileScreen = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <ProfileCard />

        <View style={styles.smallCard}>
          <View style={styles.smallHeader}>
            <View>
              <View style={styles.smallFlex}>
                <AppText style={styles.smallTitle}>
                  Bank details missing
                </AppText>

                <AntDesign name="plus" size={22} color="#000" />
              </View>

              <AppText style={styles.smallText}>
                Add your account details to receive buyback payment.
              </AppText>
            </View>
          </View>

          <View style={styles.progressWrapper}>
            <View style={styles.progressBackground}>
              <View style={styles.progressFill} />
            </View>

            <AppText style={styles.percent}>76%</AppText>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/profile/editScreen")}
            >
              <View style={styles.menuLeft}>
                <FontAwesome5 name="user" size={22} color="#111" />

                <AppText style={styles.menuText}>Edit profile</AppText>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.horizontalLine} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/profile/bankDetailsScreen")}
            >
              <View style={styles.menuLeft}>
                <Feather name="credit-card" size={22} color="#111" />

                <View>
                  <AppText style={styles.menuText}>Bank details</AppText>

                  <AppText style={styles.subText}>434***</AppText>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.horizontalLine} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/profile/passwordChangeScreen")}
            >
              <View style={styles.menuLeft}>
                <AntDesign name="lock" size={22} color="#111" />

                <AppText style={styles.menuText}>Security</AppText>
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
              onPress={() => router.push("/profile/supportScreen")}
            >
              <View style={styles.menuLeft}>
                <MaterialCommunityIcons name="headset" size={22} color="#111" />

                <AppText style={styles.menuText}>Support</AppText>
              </View>

              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <ActionButton
          name={"Logout"} 
          action={signOut}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
    paddingTop: Platform.OS === "android" ? 30 : 0,
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
    fontFamily: "quickSemiBold",
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  smallTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "quickSemiBold",
  },

  smallText: {
    fontSize: 16,
    color: "#45464D",
    lineHeight: 22,
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
    flex: 1,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 15,
    paddingTop: 10,
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
});
