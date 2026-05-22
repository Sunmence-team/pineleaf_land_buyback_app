import { AppText } from "@/components/AppText";
import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/axios";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { Ionicons } from "@expo/vector-icons";
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

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is Required"),
});

const Index = () => {
  const [visibilityOne, setVisibilityOne] = useState(false);
  const [visibilityTwo, setVisibilityTwo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await api.post("/register", {
          email: values.email,
          password: values.password,
        });
        console.log(response.data);
        showSuccessToast(response.data.message || "Registration successful");
        const token = response.data.token;
        const role = response.data.role;

        const response2 = await api.get("/refreshUser");
        signIn(response2.data.data, token, role);

        router.replace("/(tabs)");
      } catch (err: any) {
        let errMessage = err.response?.data?.message || err.message;

        if (isAxiosError(err) && err.response) {
          showErrorToast(
            errMessage || "Validation error. Please check your inputs.",
          );
        } else {
          console.error("err?.message", err?.message);
          showErrorToast("Error occurred while registering. " + errMessage);
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
                  Create your account
                </AppText>
                <AppText className="text-base text-black/70 leading-6">
                  Join us to start managing your properties and buyback offers.
                </AppText>
              </View>

              <View className="flex flex-col gap-6">
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
                  />
                  {formik.touched.email && formik.errors.email && (
                    <AppText className="text-xs text-red-600 mt-1">
                      {formik.errors.email}
                    </AppText>
                  )}
                </View>

                <View className="flex flex-col gap-2">
                  <AppText className="text-sm font-semibold text-black">
                    Password
                  </AppText>
                  <View className="flex flex-row items-center border border-primary bg-[#F9FAF7] rounded-[20px] h-[52px]">
                    <TextInput
                      className="flex-1 text-black px-4 py-3"
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      secureTextEntry={!visibilityOne}
                      autoComplete="password"
                      textContentType="password"
                      placeholder="Create a password"
                      placeholderTextColor="#6B7280"
                    />
                    <Pressable
                      className="px-3"
                      onPress={() => setVisibilityOne(!visibilityOne)}
                    >
                      <Ionicons
                        name={visibilityOne ? "eye-off-outline" : "eye-outline"}
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
                    Confirm password
                  </AppText>
                  <View className="flex flex-row items-center border border-primary bg-[#F9FAF7] rounded-[20px] h-[52px]">
                    <TextInput
                      className="flex-1 text-black px-4 py-3"
                      value={formik.values.confirmPassword}
                      onChangeText={formik.handleChange("confirmPassword")}
                      onBlur={formik.handleBlur("confirmPassword")}
                      secureTextEntry={!visibilityTwo}
                      autoComplete="password"
                      textContentType="password"
                      placeholder="Confirm your password"
                      placeholderTextColor="#6B7280"
                    />
                    <Pressable
                      className="px-3"
                      onPress={() => setVisibilityTwo(!visibilityTwo)}
                    >
                      <Ionicons
                        name={visibilityTwo ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#154A22"
                      />
                    </Pressable>
                  </View>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <AppText className="text-xs text-red-600 mt-1">
                        {formik.errors.confirmPassword}
                      </AppText>
                    )}
                </View>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <Pressable
              className={`h-14 w-full items-center justify-center rounded-2xl bg-primary ${isLoading ? "opacity-50" : ""}`}
              onPress={() => formik.handleSubmit()}
              disabled={isLoading}
            >
              <AppText className="text-white text-base font-semibold">
                {isLoading ? "Creating account..." : "Sign up"}
              </AppText>
            </Pressable>

            <AppText className="text-center text-sm text-black/70">
              Already have an account?{" "}
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
