import { Text, View } from "react-native";
import "./globals.css";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "quickBold",
        }}
      >
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text className="text-red-900">Hello</Text>
    </View>
  );
}

