import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import { useForgot } from "@/context/ForgotContext";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { forgotPasswordVerifyService, forgotPasswordRequestService } from "@/services/authServices";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Modal from "@/components/modal/Modal";

const VerifyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Verification code is required"),
});

const StepTwo = () => {
  const { forgotData, updateForgotData } = useForgot();
  const inputRef = useRef<TextInput>(null);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const mutation = useMutation({
    mutationFn: forgotPasswordVerifyService,
    onSuccess: (response: any, variables: { email: string; code: string }) => {
      showSuccessToast(response.message || "Code verified successfully");
      const token = response.reset_token || response.data?.reset_token || response.data?.token || response.token || response.data?.data?.reset_token || response.data?.data?.token;
      
      updateForgotData({
        code: variables.code,
        reset_token: token || "",
      });
      router.push("/(auth)/forgotten_password/stepThree");
    },
    onError: (err: any) => {
      let errMessage = err.response?.data?.message || err.message;
      showErrorToast(errMessage || "Verification failed. Invalid code.");
    },
  });

  const resendMutation = useMutation({
    mutationFn: forgotPasswordRequestService,
    onSuccess: (response: any) => {
      showSuccessToast(response.message || "Verification code resent successfully");
      setCountdown(30);
    },
    onError: (err: any) => {
      let errMessage = err.response?.data?.message || err.message;
      showErrorToast(errMessage || "Failed to resend code");
    },
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: (values) => {
      mutation.mutate({
        email: forgotData.email,
        code: values.code,
      });
    },
  });

  const handleResend = () => {
    resendMutation.mutate({ email: forgotData.email });
  };

  const codeArray = formik.values.code.split("");

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
                  Enter verification code
                </AppText>
                <View>
                  <AppText className="text-base text-black/70 font-quickMedium">
                    We sent a reset code to your email
                  </AppText>
                  <AppText className="text-black/70 font-quickMedium">
                    Enter it below to continue.
                  </AppText>
                </View>
              </View>

              <View className="flex flex-col gap-2">
                <Pressable 
                  onPress={() => inputRef.current?.focus()}
                  className="flex-row justify-between gap-2 w-full mt-2"
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <View 
                      key={index}
                      className={`w-[14%] aspect-square border rounded-xl items-center justify-center bg-[#F9FAF7] ${
                        formik.values.code.length === index 
                          ? "border-primary border-2" 
                          : "border-primary/30"
                      }`}
                    >
                      <AppText className="text-xl font-quickBold text-black">
                        {codeArray[index] || ""}
                      </AppText>
                    </View>
                  ))}
                </Pressable>

                {/* Hidden TextInput */}
                <TextInput
                  ref={inputRef}
                  style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  value={formik.values.code}
                  onChangeText={formik.handleChange("code")}
                  onBlur={formik.handleBlur("code")}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus={true}
                />

                {countdown > 0 ? (
                  <AppText className="text-lg text-gray-500 mt-4 font-quickMedium">
                    You can resend the code in {countdown} seconds
                  </AppText>
                ) : (
                  <Pressable
                    onPress={handleResend}
                    className="mt-4 py-1 self-start"
                  >
                    <AppText className="text-lg text-primary font-semibold font-quickSemiBold">
                      Request code again
                    </AppText>
                  </Pressable>
                )}

                {formik.touched.code && formik.errors.code && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.code}
                  </AppText>
                )}
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              name={mutation.isPending ? "Verifying..." : "Next"}
              action={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Overlay Modal */}
      <Modal visible={resendMutation.isPending} onClose={() => {}} showClose={false} customMode={true}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#154A22" />
          <AppText className="text-white mt-4 font-semibold text-lg font-quickMedium">Resending code...</AppText>
        </View>
      </Modal>
    </View>
  );
};

export default StepTwo;
