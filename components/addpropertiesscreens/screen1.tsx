import { AppText } from "@/components/AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface Screen1Values {
  propertyName: string;
  purchaseDate: string;
  purchaseType: string;
  numberOfPlots: string;
  plotNumbers: string;
}

interface Screen1Props {
  values: Screen1Values;
  onChange: (field: keyof Screen1Values, value: string) => void;
  onBlur: (field: keyof Screen1Values) => void;
  errors?: Partial<Record<keyof Screen1Values, string>>;
  touched?: Partial<Record<keyof Screen1Values, boolean>>;
}

const purchaseTypes = ["Regular", "Discount", "Promo"];

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
};

const parseDate = (value: string) => {
  const [day, month, year] = value.split("-").map(Number);
  const maybeDate = new Date(year, (month || 1) - 1, day || 1);
  return Number.isNaN(maybeDate.getTime()) ? new Date() : maybeDate;
};

/**
 * Screen1 - Property details entry for Add Property.
 *
 * HOW TO USE:
 * 1. Import Screen1 into the Add Property parent screen.
 * 2. Pass current form values and a change handler:
 *    <Screen1 values={formValues} onChange={handleFieldChange} />
 * 3. The parent Formik instance owns validation and passes inline errors down.
 */
const Screen1: React.FC<Screen1Props> = ({
  values,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateField = (field: keyof Screen1Values, value: string) => {
    onChange(field, value);
  };

  const handleChange = (field: keyof Screen1Values) => (value: string) => {
    onChange(field, value);
  };

  const currentDate = useMemo(
    () => (values.purchaseDate ? parseDate(values.purchaseDate) : new Date()),
    [values.purchaseDate],
  );

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (!selectedDate) return;
    const formatted = formatDate(selectedDate);
    updateField("purchaseDate", formatted);
    onBlur("purchaseDate");
  };

  return (
    <View className="flex flex-col gap-4 bg-white rounded-xl p-4">
      <View className="flex flex-col gap-2">
        <AppText className="text-sm font-medium text-gray-900">
          Property name
        </AppText>
        <TextInput
          value={values.propertyName}
          onChangeText={handleChange("propertyName")}
          onBlur={() => onBlur("propertyName")}
          placeholder="Pineleaf garden"
          placeholderTextColor="#9CA3AF"
          className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
        />
        {touched?.propertyName && errors?.propertyName ? (
          <AppText className="text-xs text-red-600">
            {errors.propertyName}
          </AppText>
        ) : null}
      </View>

      <View className="flex flex-col gap-2">
        <AppText className="text-sm font-medium text-gray-900">
          Purchasing date
        </AppText>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowDatePicker(true)}
          className=" rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 flex items-center justify-between flex-row"
        >
          <AppText
            className={`text-base ${
              values.purchaseDate ? "text-black" : "text-gray-400"
            }`}
          >
            {values.purchaseDate || "DD-MM-YYYY"}
          </AppText>
          <View className="">
            <Ionicons name="calendar-outline" size={20} color="#111827" />
          </View>
        </TouchableOpacity>
        {touched?.purchaseDate && errors?.purchaseDate ? (
          <AppText className="text-xs text-red-600">
            {errors.purchaseDate}
          </AppText>
        ) : null}
      </View>

      <View className="flex flex-col gap-2">
        <AppText className="text-sm font-medium text-gray-900">
          Purchasing type
        </AppText>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowTypeModal(true)}
          className="flex-row items-center justify-between rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4"
        >
          <AppText
            className={`text-base ${
              values.purchaseType ? "text-black" : "text-gray-400"
            }`}
          >
            {values.purchaseType || "Select purchase type"}
          </AppText>
          <Ionicons name="chevron-down-outline" size={20} color="#111827" />
        </TouchableOpacity>
        {touched?.purchaseType && errors?.purchaseType ? (
          <AppText className="text-xs text-red-600">
            {errors.purchaseType}
          </AppText>
        ) : null}
      </View>

      <View className="flex flex-col gap-2">
        <AppText className="text-sm font-medium text-gray-900">
          Number of plots
        </AppText>
        <TextInput
          value={values.numberOfPlots}
          onChangeText={(text) =>
            handleChange("numberOfPlots")(text.replace(/[^0-9]/g, ""))
          }
          onBlur={() => onBlur("numberOfPlots")}
          placeholder="3"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
        />
        {touched?.numberOfPlots && errors?.numberOfPlots ? (
          <AppText className="text-xs text-red-600">
            {errors.numberOfPlots}
          </AppText>
        ) : null}
      </View>

      <View className="flex flex-col gap-2">
        <AppText className="text-sm font-medium text-gray-900">
          Plot number(s)
        </AppText>
        <TextInput
          value={values.plotNumbers}
          onChangeText={handleChange("plotNumbers")}
          onBlur={() => onBlur("plotNumbers")}
          placeholder="e.g. A2 102"
          placeholderTextColor="#9CA3AF"
          className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
        />
        {touched?.plotNumbers && errors?.plotNumbers ? (
          <AppText className="text-xs text-red-600">
            {errors.plotNumbers}
          </AppText>
        ) : null}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <Modal visible={showTypeModal} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="rounded-t-3xl bg-white p-5">
            <AppText className="mb-4 text-base font-semibold text-gray-900">
              Select purchasing type
            </AppText>
            {purchaseTypes.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  updateField("purchaseType", option);
                  onBlur("purchaseType");
                  setShowTypeModal(false);
                }}
                className="rounded-xl bg-gray-50 px-4 py-4 mb-3"
              >
                <AppText className="text-base text-gray-900">{option}</AppText>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setShowTypeModal(false)}
              className="mt-2 rounded-xl bg-gray-100 px-4 py-4"
            >
              <AppText className="text-center text-base text-gray-700">
                Cancel
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Screen1;
