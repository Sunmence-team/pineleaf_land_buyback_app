import { assets } from "@/assets/assets";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View className="flex item-center justify-between p-10">
        <View className="flex flex-col bg-tertiary w-20 h-20 rounded-full">
          <Image
            source={assets.avatar}
            alt="profile-avatar"
            className="w-full h-full object-contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
