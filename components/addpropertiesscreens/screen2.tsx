import { AppText } from "@/components/AppText";
import React from "react";
import { TextInput, View } from "react-native";

export interface Screen2Values {
  price_per_plots: string;
  number_of_plots: string;
}

interface Screen2Props {
  values: Screen2Values;
  onChange: (field: keyof Screen2Values, value: string) => void;
  onBlur: (field: keyof Screen2Values) => void;
  errors?: Partial<Record<keyof Screen2Values, string>>;
  touched?: Partial<Record<keyof Screen2Values, boolean>>;
}

const formatNaira = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};

const calculateTotal = (price_per_plots: string, number_of_plots: string) => {
  const price = Number(price_per_plots.replace(/[^0-9]/g, ""));
  const plots = Number(number_of_plots.replace(/[^0-9]/g, ""));
  if (!price || !plots) return "0";
  return String(price * plots);
};

/**
 * Screen2 - Property value entry for Add Property.
 *
 * HOW TO USE:
 * 1. Import Screen2 into the Add Property parent screen.
 * 2. Pass current price and plot values plus a change handler:
 *    <Screen2 values={formValues} onChange={handleFieldChange} />
 * 3. The parent Formik instance owns validation and passes inline errors down.
 * 4. Total value is calculated from price_per_plots * number_of_plots.
 */
const Screen2: React.FC<Screen2Props> = ({
  values,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  const handleChange = (field: keyof Screen2Values) => (value: string) => {
    onChange(field, value);
  };

  const totalValue = formatNaira(
    calculateTotal(values.price_per_plots, values.number_of_plots),
  );

  return (
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
              handleChange("price_per_plots")(digits);
            }}
            onBlur={() => onBlur("price_per_plots")}
            placeholder="30,000,000"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            className="rounded-xl border border-gray-200 bg-white px-4 py-4 pr-12 text-base text-black font-quickRegular"
          />
        </View>
        {touched?.price_per_plots && errors?.price_per_plots ? (
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
            handleChange("number_of_plots")(digits);
          }}
          onBlur={() => onBlur("number_of_plots")}
          placeholder="3"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-base text-black font-quickRegular opacity-[0.6]"
        />
        {touched?.number_of_plots && errors?.number_of_plots ? (
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
  );
};

export default Screen2;
