import { AppText } from "@/components/AppText";
import { useRegister } from "@/context/RegisterContext";
import { registerService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { router } from "expo-router";
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
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

const StepThreeSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const RegisterStepThree = () => {
  const { registerData, updateRegisterData } = useRegister();

  const mutation = useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      console.log(data)
      showSuccessToast(
        data.message || "Registration successful. Please verify your email.",
      );
      router.push({
        pathname: "/(auth)/verify_email",
        params: { email: formik.values.email },
      });
    },
    onError: (error: any) => {
      showErrorToast(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      email: registerData.email,
    },
    validationSchema: StepThreeSchema,
    onSubmit: (values) => {
      updateRegisterData(values);
      const fullData = { ...registerData, ...values };
      mutation.mutate(fullData);
    },
  });

  return (
    <View className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-8 pt-2">
            <View className="flex flex-col gap-3">
              <AppText className="text-2xl font-quickBold text-black">
                Your email address
              </AppText>
              <AppText className="text-base text-black/70 leading-6">
                We want to confirm this your email address to also help secure your information
              </AppText>
            </View>

            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Email
                </AppText>
                <TextInput
                  className="border border-primary/30 focus:border-primary bg-[#F9FAF7] rounded-2xl px-4 text-black h-[50px]"
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="example@mail.com"
                  placeholderTextColor="#6B7280"
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
              className={`h-14 w-full items-center justify-center rounded-2xl bg-primary ${mutation.isPending ? "opacity-50" : ""}`}
              onPress={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            >
              <AppText className="text-white text-base font-semibold">
                {mutation.isPending
                  ? "Creating account..."
                  : "Complete Registration"}
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              disabled={mutation.isPending}
            >
              <AppText className="text-center text-primary font-semibold">
                Back
              </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterStepThree;
