import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import Modal from "@/components/modal/Modal";
import { useForgot } from "@/context/ForgotContext";
import { showErrorToast } from "@/helpers/toast";
import { forgotPasswordResetService } from "@/services/authServices";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const StepThreeSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Must contain at least 1 number")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const StepThree = () => {
  const { forgotData, resetForgotData } = useForgot();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const mutation = useMutation({
    mutationFn: forgotPasswordResetService,
    onSuccess: (data: any) => {
      setShowSuccessModal(true);
    },
    onError: (err: any) => {
      let errMessage = err.response?.data?.message || err.message;
      showErrorToast(errMessage || "Reset failed. Please request code again.");
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: StepThreeSchema,
    onSubmit: (values) => {
      mutation.mutate({
        email: forgotData.email,
        reset_token: forgotData.reset_token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
    },
  });

  const handleProceedToLogin = () => {
    resetForgotData();
    setShowSuccessModal(false);
    router.replace("/(auth)/login");
  };

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            <View className="flex flex-col gap-8 pt-6">
              <View className="flex flex-col gap-3">
                <AppText className="text-3xl font-quickBold text-black">
                  Create new password
                </AppText>
                <AppText className="text-base text-black/70 font-quickMedium leading-6">
                  Set your new secure password to log in.
                </AppText>
              </View>

              <View className="flex flex-col gap-6">
                <View className="flex flex-col gap-2">
                  <AppText className="text-sm font-semibold text-black">
                    New Password
                  </AppText>
                  <View className="flex flex-row items-center border border-primary/30 focus:border-primary rounded-xl h-[50px]">
                    <TextInput
                      className="flex-1 text-black px-4 h-full font-quickMedium"
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      secureTextEntry={!showPassword}
                      placeholder="Enter new password"
                      placeholderTextColor="#9CA3AF"
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
                      className="flex-1 text-black px-4 h-full font-quickMedium"
                      value={formik.values.password_confirmation}
                      onChangeText={formik.handleChange(
                        "password_confirmation",
                      )}
                      onBlur={formik.handleBlur("password_confirmation")}
                      secureTextEntry={!showConfirmPassword}
                      placeholder="Confirm password"
                      placeholderTextColor="#9CA3AF"
                    />
                    <Pressable
                      className="px-3"
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
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
                        name={
                          req.met
                            ? "checkmark-circle"
                            : "checkmark-circle-outline"
                        }
                        size={16}
                        color={req.met ? "#154A22" : "#6B7280"}
                      />
                      <AppText className="text-sm text-black font-quickMedium">
                        {req.label}
                      </AppText>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              name={mutation.isPending ? "Resetting..." : "Reset password"}
              action={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={!showSuccessModal}
        onClose={() => {}}
        showClose={false}
        customMode={true}
      >
        <View className="flex-1 w-full h-full bg-white justify-center items-center gap-16 px-6">
          <View className="flex-col items-center">
            <Image
              source={assets.success}
              style={{ width: 140, height: 140, marginBottom: 14 }}
              resizeMode="cover"
            />
            <AppText className="text-3xl font-quickBold font-900 text-primary text-center">
              Your new password has been set successfully
            </AppText>
          </View>
          <ActionButton
            name="Proceed to Login"
            action={handleProceedToLogin}
            optStyle={{
              minWidth: 200
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default StepThree;
