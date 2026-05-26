import { AppText } from "@/components/AppText";
import { useRegister } from "@/context/RegisterContext";
import { registerService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useState, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import ActionButton from "@/components/buttons/ActionButton";
import { useMutation } from "@tanstack/react-query";

const StepTwoSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Must contain at least 1 number")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterStepTwo = () => {
  const { registerData, updateRegisterData } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      console.log("data reistering", data);
      showSuccessToast(
        data.message || "Registration successful. Please verify your email.",
      );
      router.push({
        pathname: "/(auth)/verify_email/code",
        params: { email: registerData.email },
      });
    },
    onError: (error: any) => {
      console.error("error reistering", error);
      console.error("error reistering response", error?.response);
      console.error("error reistering response code", error?.status);
      showErrorToast(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: StepTwoSchema,
    onSubmit: (values) => {
      updateRegisterData(values);
      const fullData = { ...registerData, ...values };
      mutation.mutate(fullData);
    },
  });

  const requirements = useMemo(() => {
    const pw = formik.values.password;
    return [
      { label: "At least 8 characters", met: pw.length >= 8 },
      { label: "At least 1 uppercase letter", met: /[A-Z]/.test(pw) },
      { label: "At least 1 number", met: /[0-9]/.test(pw) },
    ];
  }, [formik.values.password]);

  return (
    <View className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={100}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-8 pt-2">
            <View className="flex flex-col gap-3">
              <AppText className="text-2xl font-quickBold text-black">
                Create password
              </AppText>
              <AppText className="text-base text-black/70 font-quickMedium leading-6">
                Enter your password to continue securely
              </AppText>
            </View>

            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Password
                </AppText>
                <View className="flex flex-row items-center border border-primary/30 focus:border-primary rounded-xl h-[50px]">
                  <TextInput
                    className="flex-1 text-black px-4 h-full"
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    secureTextEntry={!showPassword}
                    placeholder="Enter password"
                  />
                  <Pressable
                    className="px-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#154A22"
                    />
                  </Pressable>
                </View>

                {formik.touched.password && formik.errors.password && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.password}
                  </AppText>
                )}
              </View>

              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Confirm Password
                </AppText>
                <View className="flex flex-row items-center border border-primary/30 focus:border-primary rounded-xl h-[50px]">
                  <TextInput
                    className="flex-1 text-black px-4 h-full"
                    value={formik.values.password_confirmation}
                    onChangeText={formik.handleChange("password_confirmation")}
                    onBlur={formik.handleBlur("password_confirmation")}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <Pressable
                    className="px-3"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color="#154A22"
                    />
                  </Pressable>
                </View>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <AppText className="text-xs text-red-600 mt-1">
                      {formik.errors.password_confirmation}
                    </AppText>
                  )}
              </View>

              {/* Password Requirements Checklist */}
              <View className="mt-2 flex-col gap-1.5">
                {requirements.map((req, index) => (
                  <View
                    key={index}
                    className={`flex-row items-center gap-2 ${req.met ? "opacity-100" : "opacity-30"}`}
                  >
                    <Ionicons
                      name={req.met ? "checkmark-circle" : "checkmark-circle-outline"}
                      size={16}
                      color={req.met ? "#154A22" : "#6B7280"}
                    />
                    <AppText className="text-sm text-black">
                      {req.label}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              name={mutation.isPending ? "Processing..." : "Proceed"}
              action={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            />
            <ActionButton 
              name={"Back"}
              hasBG={false}
              action={() => router.back()}
              disabled={mutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterStepTwo;
