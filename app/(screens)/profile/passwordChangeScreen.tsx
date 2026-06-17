import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { passwordChangeService } from "@/services/authServices";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as Yup from "yup";

const PasswordChangeSchema = Yup.object().shape({
  old_password: Yup.string()
    .required("Old password is required"),
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  retype_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please retype your new password"),
});

const ChangePasswordScreen = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: (payload: any) => passwordChangeService(payload),
    onSuccess: (response: any) => {
      showSuccessToast(response?.message || "Password changed successfully");
      router.back();
    },
    onError: (error: any) => {
      showErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Password change failed"
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      retype_password: "",
    },
    validationSchema: PasswordChangeSchema,
    onSubmit: (values) => {
      changePasswordMutation.mutate({
        old_password: values.old_password,
        new_password: values.new_password,
        retype_password: values.retype_password,
      });
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.secondContainer}>
            {/* Old password */}
            <View style={styles.inputContainer}>
              <AppText style={styles.label}>Old password</AppText>
              <View style={[styles.fieldContainer, formik.touched.old_password && formik.errors.old_password ? styles.inputError : null]}>
                <TextInput
                  placeholder="Enter old password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showOldPassword}
                  value={formik.values.old_password}
                  onChangeText={formik.handleChange("old_password")}
                  onBlur={formik.handleBlur("old_password")}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showOldPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#154A22"
                  />
                </TouchableOpacity>
              </View>
              {formik.touched.old_password && formik.errors.old_password && (
                <AppText style={styles.errorText}>{formik.errors.old_password}</AppText>
              )}
            </View>

            {/* New password */}
            <View style={styles.inputContainer}>
              <AppText style={styles.label}>New password</AppText>
              <View style={[styles.fieldContainer, formik.touched.new_password && formik.errors.new_password ? styles.inputError : null]}>
                <TextInput
                  placeholder="Enter new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showNewPassword}
                  value={formik.values.new_password}
                  onChangeText={formik.handleChange("new_password")}
                  onBlur={formik.handleBlur("new_password")}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#154A22"
                  />
                </TouchableOpacity>
              </View>
              {formik.touched.new_password && formik.errors.new_password && (
                <AppText style={styles.errorText}>{formik.errors.new_password}</AppText>
              )}
            </View>

            {/* Re-type password */}
            <View style={styles.inputContainer}>
              <AppText style={styles.label}>Re-type password</AppText>
              <View style={[styles.fieldContainer, formik.touched.retype_password && formik.errors.retype_password ? styles.inputError : null]}>
                <TextInput
                  placeholder="Re-type password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={formik.values.retype_password}
                  onChangeText={formik.handleChange("retype_password")}
                  onBlur={formik.handleBlur("retype_password")}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#154A22"
                  />
                </TouchableOpacity>
              </View>
              {formik.touched.retype_password && formik.errors.retype_password && (
                <AppText style={styles.errorText}>{formik.errors.retype_password}</AppText>
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <ActionButton
                name="Save changes"
                action={formik.handleSubmit}
                loading={changePasswordMutation.isPending}
                disabled={changePasswordMutation.isPending}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
  },
  scrollContent: {
    paddingVertical: 20,
  },
  secondContainer: {
    backgroundColor: "white",
    borderRadius: 35,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 12,
    color: "black",
    fontFamily: "quickSemiBold",
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    height: "100%",
  },
  eyeIcon: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  inputError: {
    borderColor: "#d60700d5",
  },
  errorText: {
    color: "#d60700d5",
    fontSize: 14,
    marginTop: 6,
    marginLeft: 5,
    fontFamily: "quickRegular",
  },
});
