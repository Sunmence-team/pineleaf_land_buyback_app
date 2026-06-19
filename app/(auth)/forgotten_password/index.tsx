import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import { useForgot } from "@/context/ForgotContext";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { forgotPasswordRequestService } from "@/services/authServices";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email address"),
});

const Index = () => {
  const { updateForgotData } = useForgot();

  const mutation = useMutation({
    mutationFn: forgotPasswordRequestService,
    onSuccess: (response: any, variables: { email: string }) => {
      showSuccessToast(response.message || "Verification code sent to your email");
      updateForgotData({ email: variables.email });
      router.push("/(auth)/forgotten_password/stepTwo");
    },
    onError: (err: any) => {
      console.log("error sending reset code: ", err)
      let errMessage = err.response?.data?.message || err.message;
      showErrorToast(errMessage || "Failed to send verification code");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

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
                <AppText className="text-3xl font-quickBold text-black">
                  Forgot password?
                </AppText>
                <AppText className="text-base text-black/70 font-quickMedium leading-6">
                  Enter your email address and we&apos;ll send you a code to
                  reset your password.
                </AppText>
              </View>

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
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              name={mutation.isPending ? "Sending..." : "Send code"}
              action={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Index;
