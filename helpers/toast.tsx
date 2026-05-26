import { Image, Text, View } from "react-native";
import Toast, { BaseToastProps, ToastConfig } from "react-native-toast-message";

export const showSuccessToast = (message: string) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "top",
    topOffset: 50,
    visibilityTime: 3000,
  });
};

export const showErrorToast = (message: string) => {
  Toast.show({
    type: "error",
    text1: message,
    position: "top",
    topOffset: 50,
  });
};

export const showInfoToast = (message: string) => {
  Toast.show({
    type: "info",
    text1: message,
    position: "top",
    topOffset: 50,
  });
};

export const toastConfig: ToastConfig = {
  success: ({ text1 }: BaseToastProps) => (
    <View
      style={{
        backgroundColor: "#111",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        maxWidth: "90%",
        justifyContent: "center",
        gap: 6,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={{
          width: 25,
          height: 25,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 6,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          flexShrink: 1,
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text1}
      </Text>
    </View>
  ),

  error: ({ text1 }: BaseToastProps) => (
    <View
      style={{
        backgroundColor: "#d60700d5",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        maxWidth: "90%",
        justifyContent: "center",
        gap: 6,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={{
          width: 25,
          height: 25,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 6,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          flexShrink: 1,
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text1}
      </Text>
    </View>
  ),

  info: ({ text1 }: BaseToastProps) => (
    <View
      style={{
        backgroundColor: "#111",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        maxWidth: "90%",
        gap: 6,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Image
        source={require("@/assets/images/logo.png")}
        style={{
          width: 25,
          height: 25,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 6,
        }}
        resizeMode="contain"
      /> */}
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          flexShrink: 1,
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text1}
      </Text>
    </View>
  ),
};