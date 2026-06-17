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
      <View style={styles.avatarCont} className="bg-tertiary rounded-full">
        <Image source={assets.avatar} className="w-full h-full object-contain" />
      </View>

      <AppText style={styles.name}>{first_name ?? ""} {last_name ?? ""}</AppText>
      <AppText style={styles.email}>{email ?? ""}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarCont: {
    width: 80,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "black",
    fontFamily: "quickSemiBold",
  },
  email: {
    fontSize: 14,
    color: "#666"
  },
});

export default ProfileCard