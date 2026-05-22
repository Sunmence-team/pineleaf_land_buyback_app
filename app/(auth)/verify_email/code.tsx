import { AppText } from "@/components/AppText";
import { verificationEmailService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
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
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

const CodeSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Verification code is required"),
});

const VerifyEmailCode = () => {
  const { email } = useLocalSearchParams<{ email: string }>();

  const mutation = useMutation({
    mutationFn: verificationEmailService,
    onSuccess: (data) => {
      showSuccessToast(data.message || "Email verified successfully. Please login.");
      router.replace("/(auth)/login");
    },
    onError: (error: any) => {
      showErrorToast(error.response?.data?.message || "Verification failed. Invalid code.");
    },
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: CodeSchema,
    onSubmit: (values) => {
      if (email) {
        mutation.mutate({ email, code: values.code });
      }
    },
  });

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
                Verification Code
              </AppText>
              <AppText className="text-base text-black/70 leading-6">
                Enter the 6-digit code sent to your email address {email}.
              </AppText>
            </View>

            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Code
                </AppText>
                <TextInput
                  className="border border-primary bg-[#F9FAF7] rounded-[20px] px-4 py-3 text-black h-[52px] text-center text-xl tracking-[10px]"
                  value={formik.values.code}
                  onChangeText={formik.handleChange("code")}
                  onBlur={formik.handleBlur("code")}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="000000"
                  placeholderTextColor="#6B7280"
                />
                {formik.touched.code && formik.errors.code && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.code}
                  </AppText>
                )}
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <Pressable
              className={`h-14 w-full items-center justify-center rounded-2xl bg-primary ${mutation.isPending ? "opacity-50" : ""}`}
              onPress={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            >
              <AppText className="text-white text-base font-semibold">
                {mutation.isPending ? "Verifying..." : "Verify Code"}
              </AppText>
            </Pressable>
            
            <Pressable onPress={() => router.back()} disabled={mutation.isPending}>
               <AppText className="text-center text-primary font-semibold">Back</AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyEmailCode;
