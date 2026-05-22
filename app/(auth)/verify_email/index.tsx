import { AppText } from "@/components/AppText";
import { sendEmailVerificationCodeService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";

const VerifyEmailIndex = () => {
  const { email } = useLocalSearchParams<{ email: string }>();

  const mutation = useMutation({
    mutationFn: sendEmailVerificationCodeService,
    onSuccess: (data) => {
      showSuccessToast(data.message || "Verification code sent successfully.");
      router.push({
        pathname: "/(auth)/verify_email/code",
        params: { email }
      });
    },
    onError: (error: any) => {
      showErrorToast(error.response?.data?.message || "Failed to send verification code.");
    },
  });

  const handleNext = () => {
    if (email) {
      mutation.mutate({ email });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-8 pt-6">
            <View className="flex flex-col gap-3">
              <AppText className="text-2xl font-quickBold text-black">
                Verify Email
              </AppText>
              <AppText className="text-base text-black/70 leading-6">
                We need to verify your email address to ensure account security.
              </AppText>
            </View>

            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Email Address
                </AppText>
                <TextInput
                  className="border border-gray-200 bg-gray-50 rounded-[20px] px-4 py-3 text-gray-500 h-[52px]"
                  value={email}
                  editable={false}
                  placeholder="example@mail.com"
                />
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <Pressable
              className={`h-14 w-full items-center justify-center rounded-2xl bg-primary ${mutation.isPending ? "opacity-50" : ""}`}
              onPress={handleNext}
              disabled={mutation.isPending}
            >
              <AppText className="text-white text-base font-semibold">
                {mutation.isPending ? "Sending code..." : "Next"}
              </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyEmailIndex;
