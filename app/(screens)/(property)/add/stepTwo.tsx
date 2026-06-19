import { AppText } from "@/components/AppText";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useAddProperty } from "@/context/AddPropertyContext";
import { formatNaira } from "@/helpers/formatterUtility";

const calculateTotal = (price_per_plots: string, number_of_plots: string) => {
  const price = Number(price_per_plots.replace(/[^0-9]/g, ""));
  const plots = Number(number_of_plots.replace(/[^0-9]/g, ""));
  if (!price || !plots) return "0";
  return String(price * plots);
};

export default function StepTwoScreen() {
  const { formik, setCurrentStep } = useAddProperty();

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(2);
    }, [setCurrentStep])
  );

  const updateField = (field: string, value: string) => {
    formik.setFieldValue(field, value);
  };

  const handleFieldBlur = (field: string) => {
    formik.setFieldTouched(field, true);
  };

  const { values, errors, touched } = formik;

  const totalValue = formatNaira(
    calculateTotal(values.price_per_plots, values.number_of_plots),
  );

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex flex-col gap-4 bg-white rounded-xl p-4">
        <View className="flex flex-col gap-2">
          <View className="flex-row items-center justify-between">
            <AppText className="text-sm font-medium text-gray-900">
              Price per plot
            </AppText>
          </View>
          <View className="">
            <TextInput
              value={formatNaira(values.price_per_plots)}
              onChangeText={(text) => {
                const digits = text.replace(/[^0-9]/g, "");
                updateField("price_per_plots", digits);
              }}
              onBlur={() => handleFieldBlur("price_per_plots")}
              keyboardType="numeric"
              className="rounded-xl border border-gray-200 bg-white px-4 py-4 pr-12 text-base text-black font-quickRegular"
            />
          </View>
          {touched.price_per_plots && errors.price_per_plots ? (
            <AppText className="text-xs text-red-600">
              {errors.price_per_plots}
            </AppText>
          ) : null}
        </View>

        <View className="flex flex-col gap-2">
          <AppText className="text-sm font-medium text-gray-900">
            Number of plots
          </AppText>
          <TextInput
            editable={false}
            value={values.number_of_plots}
            onChangeText={(text) => {
              const digits = text.replace(/[^0-9]/g, "");
              updateField("number_of_plots", digits);
            }}
            onBlur={() => handleFieldBlur("number_of_plots")}
            keyboardType="numeric"
            className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-base text-black font-quickRegular opacity-[0.6]"
          />
          {touched.number_of_plots && errors.number_of_plots ? (
            <AppText className="text-xs text-red-600">
              {errors.number_of_plots}
            </AppText>
          ) : null}
        </View>

        <View className="rounded-xl bg-primary/10 p-5">
          <AppText className="text-sm font-medium text-gray-900">
            Total Property value
          </AppText>
          <View className="mt-3 flex-row items-center gap-2">
            <AppText className="text-2xl text-gray-900">₦</AppText>
            <AppText className="text-2xl  text-gray-900">
              {totalValue || "0"}
            </AppText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}