import { AppText } from "@/components/AppText";
import api from "@/helpers/axios";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { isAxiosError } from "axios";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
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

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email address"),
});

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await api.post("/forgot-password", values);
        console.log(response.data);
        showSuccessToast(
          response.data.message || "Password reset link sent to your email",
        );
        setResetSent(true);
        setTimeout(() => router.back(), 2000);
      } catch (err: any) {
        let errMessage = err.response?.data?.message || err.message;

        if (isAxiosError(err) && err.response) {
          showErrorToast(errMessage || "Failed to send reset link");
        } else {
          console.error("err?.message", err?.message);
          showErrorToast("Error occurred. " + errMessage);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            <View className="flex flex-col gap-8 pt-6">
              <View className="flex flex-col gap-3">
                <AppText className="text-2xl font-quickBold text-black">
                  Reset your password
                </AppText>
                <AppText className="text-base text-black/70 leading-6">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </AppText>
              </View>

              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Email address
                </AppText>
                <TextInput
                  className="border border-primary bg-[#F9FAF7] rounded-[20px] px-4 py-3 text-black h-[52px]"
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="username"
                  textContentType="username"
                  placeholder="example@mail.com"
                  placeholderTextColor="#6B7280"
                  editable={!resetSent}
                />
                {formik.touched.email && formik.errors.email && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.email}
                  </AppText>
                )}
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <Pressable
              className={`h-14 w-full items-center justify-center rounded-2xl bg-primary ${isLoading || resetSent ? "opacity-50" : ""}`}
              onPress={() => formik.handleSubmit()}
              disabled={isLoading || resetSent}
            >
              <AppText className="text-white text-base font-semibold">
                {isLoading
                  ? "Sending..."
                  : resetSent
                    ? "Link sent!"
                    : "Send reset link"}
              </AppText>
            </Pressable>

            <AppText className="text-center text-sm text-black/70">
              Remember your password?{" "}
              <Link
                href={"/(auth)/login"}
                className="text-primary font-semibold"
              >
                Login
              </Link>
            </AppText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Index;
