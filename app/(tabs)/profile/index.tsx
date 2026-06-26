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

  const menuItems = [
    {
      key: "view",
      label: "View profile",
      onPress: () => router.push("/profile/editScreen?edit=false"),
      icon: (color: string) => <FontAwesome5 name="user" size={22} color={color} />,
    },
    {
      key: "bank",
      label: "Bank details",
      onPress: () => router.push("/profile/bankDetailsScreen"),
      icon: (color: string) => <Feather name="credit-card" size={22} color={color} />,
      subText: user?.bank_account_number ? maskNumber(user.bank_account_number, { stripNonNumeric: true }) : null,
    },
    {
      key: "security",
      label: "Security",
      onPress: () => router.push("/profile/passwordChangeScreen"),
      icon: (color: string) => <AntDesign name="lock" size={22} color={color} />,
    },
    {
      key: "support",
      label: "Support",
      onPress: () => router.push("/profile/supportScreen"),
      icon: (color: string) => <MaterialCommunityIcons name="headset" size={22} color={color} />,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.secondContainer} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}>
        <ProfileCard user={user ?? undefined} />

        <BankDetailsAlertCard user={user ?? undefined} />

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const isLast = index === menuItems.length - 1;
            return (
              <React.Fragment key={item.key}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuLeft}>
                    {item.icon("#111")}
                    <View>
                      <AppText style={styles.menuText}>{item.label}</AppText>
                      {item.subText && <AppText style={styles.subText}>{item.subText}</AppText>}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="black" />
                </TouchableOpacity>
                {!isLast && <View style={styles.horizontalLine} />}
              </React.Fragment>
            );
          })}
        </View>
        
        <ActionButton
          name={"Logout"} 
          action={signOut}
          optStyle={{
            height: 45,
            marginTop: 20
          }}
        />

      </ScrollView>
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
