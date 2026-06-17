import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import { useAuth } from "@/context/AuthContext";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { loginService, sendEmailVerificationCodeService } from "@/services/authServices";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import Modal from "@/components/modal/Modal";
// import { globals } from "@/lib/constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
});

const Index = () => {
  const [visibilityOne, setVisibilityOne] = useState(false);
  const { signIn, completeOnboarding } = useAuth();

  const sendCodeMutation = useMutation({
    mutationFn: sendEmailVerificationCodeService,
    onSuccess: (data, variables) => {
      showSuccessToast(data?.message || "Verification code sent successfully.");
      router.push({
        pathname: "/(auth)/verify_email/code",
        params: { email: variables.email }
      });
    },
    onError: (error: any) => {
      showErrorToast(error.response?.data?.message || "Failed to send verification code.");
    },
  });

  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      showSuccessToast(response.message || "Login successfully");
      const { data } = response;
      console.log("data", data)
      if (data.user.role === "user") {
        signIn(data.user, data.token, data.user.role);
        router.push("/(tabs)");
      } else {
        showErrorToast("Try to log in via web");
      }
    },
    onError: (err: any) => {
      console.error("error logging in", err);
      let errMessage = err.response?.data?.message || err.message;
      console.error("errMessage", errMessage);
      showErrorToast(errMessage || "Error occurred while logging in.");
      if (errMessage && errMessage.toLowerCase().includes("verify")) {
        sendCodeMutation.mutate({ email: formik.values.email });
      }
    },
    onSettled: () => {
      completeOnboarding();
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  // const removeSpecificKey = async (key: string) => {
  //   await AsyncStorage.removeItem(key);
  // }

  return (
    <View className="flex-1 bg-white px-6">
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
                  Welcome back
                </AppText>
                <AppText className="text-base text-black/70 font-quickMedium leading-6">
                  Log in to access your properties, monitor buyback offers, and
                  stay in control.
                </AppText>
              </View>

              <View className="flex flex-col gap-6">
                <View className="flex flex-col gap-2">
                  <AppText className="text-sm font-semibold text-black">
                    Email address
                  </AppText>
                  <TextInput
                    className="border border-primary/30 focus:border-primary px-4 text-black h-[50px]"
                    style={{
                      borderRadius: 10,
                    }}
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="username"
                    textContentType="username"
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
                  <View className="flex flex-row items-center border border-primary/30 focus:border-primary rounded-xl h-[50px]">
                    <TextInput
                      className="flex-1 text-black px-4 h-full"
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      secureTextEntry={!visibilityOne}
                      autoComplete="password"
                      textContentType="password"
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

                <Link
                  href={"/(auth)/forgotten_password"}
                  className="text-primary text-base font-medium"
                >
                  Forgot password?
                </Link>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              name={mutation.isPending ? "Logging in..." : "Login"}
              action={() => formik.handleSubmit()}
              disabled={mutation.isPending}
              />

            <AppText className="text-center text-black/70">
              Don&apos;t have an account?{" "}
              <Link
                href={"/(auth)/register"}
                className="text-primary font-semibold"
                >
                Sign up
              </Link>
            </AppText>

            {/* <ActionButton
              name={"Clear Async Storage"}
              // action={router.dismissAll}
              action={() => removeSpecificKey(globals.ONBOARDING_STATUS_KEY)}
            /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={sendCodeMutation.isPending}
        onClose={() => {}}
        customMode={true}
        showClose={false}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="items-center gap-4 min-w-[250px]">
            <ActivityIndicator size="large" color="#FFF" />
            <AppText className="text-base text-white font-quickSemiBold text-center">
              Sending verification code...
            </AppText>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Index;
