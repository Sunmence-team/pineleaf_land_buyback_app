import { assets } from "@/assets/assets";
import { StyleSheet } from "react-native";
import { View, Image } from "react-native";
import { AppText } from "../AppText";
import { UserProps } from "@/lib/interfaces";

type ProfileCardProps = {
  user?: UserProps;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  if (!user) {
    return null;
  }
  const { first_name, last_name, email } = user;
  return (
    <View style={styles.profileCard}>
      <Image source={assets.avatar} style={styles.avatar} />

      <AppText style={styles.name}>{first_name ?? ""} {last_name ?? ""}</AppText>
      <AppText style={styles.email}>{email ?? ""}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },

  avatar: {
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
});

export default ProfileCard