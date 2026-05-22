import { AppText } from "@/components/AppText";
import { useRegister } from "@/context/RegisterContext";
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
  const { updateRegisterData } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: StepTwoSchema,
    onSubmit: (values) => {
      updateRegisterData(values);
      router.push("/(auth)/register/stepThree");
    },
  });

  const strengthScore = useMemo(() => {
    const pw = formik.values.password;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    return score;
  }, [formik.values.password]);

  const strengthConfig = useMemo(() => {
    if (formik.values.password.length === 0) return { color: "#E8EFEA", label: "", width: "0%" };
    if (strengthScore === 1) return { color: "#EF4444", label: "Weak", width: "33%" };
    if (strengthScore === 2) return { color: "#FBBF24", label: "Medium", width: "66%" };
    if (strengthScore === 3) return { color: "#154A22", label: "Strong", width: "100%" };
    return { color: "#EF4444", label: "Weak", width: "10%" };
  }, [strengthScore, formik.values.password]);

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
                Create password
              </AppText>
              <AppText className="text-base text-black/70 leading-6">
                Enter your password to continue securely
              </AppText>
            </View>

            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Password
                </AppText>
                <View className="flex flex-row items-center border border-primary bg-[#F9FAF7] rounded-2xl h-[50px]">
                  <TextInput
                    className="flex-1 text-black px-4"
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    secureTextEntry={!showPassword}
                    placeholder="Create a password"
                    placeholderTextColor="#6B7280"
                  />
                  <Pressable className="px-3" onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#154A22"
                    />
                  </Pressable>
                </View>

                {/* Strength Gauge */}
                <View className="mt-1">
                  <View className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                    <View 
                      style={{ 
                        width: strengthConfig.width, 
                        backgroundColor: strengthConfig.color,
                        height: '100%'
                      }} 
                    />
                  </View>
                  <View className="flex flex-row justify-between mt-1">
                    <AppText className="text-[10px]" style={{ color: strengthConfig.color }}>
                      {strengthConfig.label}
                    </AppText>
                    <AppText className="text-[10px] text-black/50">
                      Min. 8 chars, 1 Uppercase, 1 Number
                    </AppText>
                  </View>
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
                <View className="flex flex-row items-center border border-primary bg-[#F9FAF7] rounded-2xl h-[50px]">
                  <TextInput
                    className="flex-1 text-black px-4"
                    value={formik.values.password_confirmation}
                    onChangeText={formik.handleChange("password_confirmation")}
                    onBlur={formik.handleBlur("password_confirmation")}
                    secureTextEntry={!showConfirmPassword}
                    placeholder="Confirm your password"
                    placeholderTextColor="#6B7280"
                  />
                  <Pressable className="px-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#154A22"
                    />
                  </Pressable>
                </View>
                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.password_confirmation}
                  </AppText>
                )}
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <Pressable
              className="h-14 w-full items-center justify-center rounded-2xl bg-primary"
              onPress={() => formik.handleSubmit()}
            >
              <AppText className="text-white text-base font-semibold">
                Next
              </AppText>
            </Pressable>
            
            <Pressable onPress={() => router.back()}>
               <AppText className="text-center text-primary font-semibold">Back</AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterStepTwo;
