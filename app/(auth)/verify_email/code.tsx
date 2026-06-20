import { AppText } from "@/components/AppText";
import { verificationEmailService } from "@/services/authServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { clearPendingVerification } from "@/helpers/pendingVerification";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppState,
  AppStateStatus,
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
import { Ionicons } from "@expo/vector-icons";

// Resilient fallback for dev builds where the native module is not yet compiled
let Clipboard: any = null;
try {
  Clipboard = require("expo-clipboard");
} catch (e) {
  console.warn("ExpoClipboard native module not found. Rebuild your development client to enable clipboard auto-paste.");
}

const CodeSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Verification code is required"),
});

const VerifyEmailCode = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const inputRef = useRef<TextInput>(null);
  const [clipboardCode, setClipboardCode] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: verificationEmailService,
    onSuccess: async (data) => {
      await clearPendingVerification();
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

  // Strategy 4: Clipboard auto-paste detection
  const checkClipboard = useCallback(async () => {
    if (!Clipboard) return;
    try {
      const content = await Clipboard.getStringAsync();
      const match = content?.trim().match(/^\d{6}$/);
      if (match && match[0] !== formik.values.code) {
        setClipboardCode(match[0]);
      } else {
        setClipboardCode(null);
      }
    } catch {
      // Clipboard access denied or unavailable
    }
  }, [formik.values.code]);

  // Strategy 5: AppState foreground detection
  useEffect(() => {
    // Check clipboard on initial mount
    checkClipboard();

    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          checkClipboard();
        }
      },
    );

    return () => subscription.remove();
  }, [checkClipboard]);

  const handleBack = async () => {
    await clearPendingVerification();
    router.back();
  };

  const handlePasteCode = (code: string) => {
    formik.setFieldValue("code", code);
    setClipboardCode(null);
  };

  const codeArray = formik.values.code.split("");

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

                {/* Clipboard paste suggestion banner */}
                {clipboardCode && (
                  <Pressable
                    onPress={() => handlePasteCode(clipboardCode)}
                    className="flex-row items-center justify-between bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 mb-2"
                  >
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="clipboard-outline" size={18} color="#154A22" />
                      <AppText className="text-sm text-primary font-quickSemiBold">
                        Paste code: {clipboardCode}
                      </AppText>
                    </View>
                    <Ionicons name="arrow-forward-outline" size={16} color="#154A22" />
                  </Pressable>
                )}
                
                <View className="relative w-full mt-2">
                  {/* Visual PIN boxes */}
                  <View className="flex-row justify-between gap-2 w-full">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <View 
                        key={index}
                        className={`flex-1 aspect-square border rounded-xl items-center justify-center bg-[#F9FAF7] ${
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
                  </View>

                  {/* Hidden TextInput overlay */}
                  <TextInput
                    ref={inputRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.01,
                      color: 'transparent',
                      backgroundColor: 'transparent',
                    }}
                    value={formik.values.code}
                    onChangeText={formik.handleChange("code")}
                    onBlur={formik.handleBlur("code")}
                    keyboardType="number-pad"
                    maxLength={6}
                    autoFocus={true}
                  />
                </View>

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
              action={handleBack}
              disabled={mutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmailCode;
