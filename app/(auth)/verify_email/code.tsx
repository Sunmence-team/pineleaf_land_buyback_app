import { AppText } from "@/components/AppText";
import { verificationEmailService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useRef } from "react";
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
import ActionButton from "@/components/buttons/ActionButton";

const CodeSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Verification code is required"),
});

const VerifyEmailCode = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const inputRef = useRef<TextInput>(null);

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
    <View className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-8 pt-2">
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
                
                {/* Visual PIN boxes */}
                <Pressable 
                  onPress={() => inputRef.current?.focus()}
                  className="flex-row justify-between gap-4 w-full mt-2"
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <View 
                      key={index}
                      className={`w-[52px] h-[52px] border rounded-xl items-center justify-center bg-[#F9FAF7] ${
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
              name={mutation.isPending ? "Verifying..." : "Verify Code"}
              action={() => formik.handleSubmit()}
              disabled={mutation.isPending}
            />
            
            <ActionButton 
              name="Back"
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

export default VerifyEmailCode;
