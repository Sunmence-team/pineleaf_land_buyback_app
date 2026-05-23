import { AppText } from "@/components/AppText";
import { sendEmailVerificationCodeService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import ActionButton from "@/components/buttons/ActionButton"
import { useMutation } from "@tanstack/react-query";

const VerifyEmailIndex = () => {
  const [email, setEmail] = useState("")

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
    <View className="flex-1 bg-white px-6">
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
                  className="border border-primary/30 focus:border-primary bg-[#F9FAF7] px-4 text-black h-[50px]"
                  style={{
                    borderRadius: 10,
                  }}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              action={handleNext}
              disabled={mutation.isPending}
              name={mutation.isPending ? "Sending code..." : "Next"}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmailIndex;
