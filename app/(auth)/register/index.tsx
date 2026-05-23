import { AppText } from "@/components/AppText";
import { useRegister } from "@/context/RegisterContext";
import { router, Link } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import ActionButton from "@/components/buttons/ActionButton";
import * as Yup from "yup";

const StepOneSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

const RegisterStepOne = () => {
  const { registerData, updateRegisterData } = useRegister();

  const formik = useFormik({
    initialValues: {
      first_name: registerData.first_name,
      last_name: registerData.last_name,
      email: registerData.email,
      phone: registerData.phone,
    },
    validationSchema: StepOneSchema,
    onSubmit: (values) => {
      updateRegisterData(values);
      router.push("/(auth)/register/stepTwo");
    },
  });

  return (
    <View className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1
        }}
        keyboardVerticalOffset={100}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-8 pt-2">
            <View className="flex flex-col gap-3">
              <AppText
                className="text-3xl font-quickBold text-black"
                style={{ fontWeight: 600 }}
              >
                Create Account
              </AppText>
              <AppText className="text-base text-black/70 font-quickMedium leading-6">
                Join to manage your properties, monitor their value, and access
                your buyback options anytime
              </AppText>
            </View>

            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  First Name
                </AppText>
                <TextInput
                  className="border border-primary/30 focus:border-primary px-4 text-black h-[50px]"
                  style={{
                    borderRadius: 10,
                  }}
                  value={formik.values.first_name}
                  onChangeText={formik.handleChange("first_name")}
                  onBlur={formik.handleBlur("first_name")}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.first_name}
                  </AppText>
                )}
              </View>

              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Last Name
                </AppText>
                <TextInput
                  className="border border-primary/30 focus:border-primary px-4 text-black h-[50px]"
                  style={{
                    borderRadius: 10,
                  }}
                  value={formik.values.last_name}
                  onChangeText={formik.handleChange("last_name")}
                  onBlur={formik.handleBlur("last_name")}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.last_name}
                  </AppText>
                )}
              </View>

              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Email Address
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
                />
                {formik.touched.email && formik.errors.email && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.email}
                  </AppText>
                )}
              </View>

              <View className="flex flex-col gap-2">
                <AppText className="text-sm font-semibold text-black">
                  Phone Number
                </AppText>
                <TextInput
                  className="border border-primary/30 focus:border-primary px-4 text-black h-[50px]"
                  style={{
                    borderRadius: 10,
                  }}
                  value={formik.values.phone}
                  onChangeText={formik.handleChange("phone")}
                  onBlur={formik.handleBlur("phone")}
                  keyboardType="phone-pad"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <AppText className="text-xs text-red-600 mt-1">
                    {formik.errors.phone}
                  </AppText>
                )}
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4 py-8">
            <ActionButton
              name="Next"
              action={() => formik.handleSubmit()}
              disabled={!formik.isValid}
            />
            <AppText className="text-center text-black/70">
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
    </View>
  );
};

export default RegisterStepOne;
