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
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import ActionButton from "@/components/buttons/ActionButton";
import ProfileCard from "@/components/cards/ProfileCard";
import BankDetailsAlertCard from "@/components/cards/BankDetailsAlertCard";
import { maskNumber } from "@/helpers/formatterUtility";

const ProfileScreen = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <ProfileCard user={user ?? undefined} />

        <BankDetailsAlertCard user={user ?? undefined} />

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

                  {user?.bank_account_number && (<AppText style={styles.subText}>{maskNumber(user?.bank_account_number ?? "")}</AppText>)}
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
          optStyle={{
            height: 45,
            marginTop: 20
          }}
        />

      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
    padding: 20,
    paddingTop: 0,
  },

  secondContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  menuContainer: {
    borderRadius: 15,
    marginBottom: 10,
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
