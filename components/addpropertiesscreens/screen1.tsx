import { AppText } from "@/components/AppText";
import EmptyStateCard from "@/components/cards/EmptyStateCard";
import { searchPropertiesService } from "@/services/propertiesServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "../modal/Modal";
import ActionButton from "@/components/buttons/ActionButton";


export interface Screen1Values {
  property_id: string;
  property_name: string;
  purchase_date: string;
  purchase_type: string;
  number_of_plots: string;
  plot_numbers: string;
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
  return `${year}-${month}-${day}`;
};

const parseDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
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
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: searchData,
    isLoading: isLoadingProperties,
    refetch: refreshProperties,
  } = useQuery({
    queryKey: ["propertiesSearch", searchQuery],
    queryFn: () => searchPropertiesService(searchQuery),
    enabled: showPropertyModal,
  });

  const propertiesList = Array.isArray(searchData?.data?.data)
    ? searchData.data.data
    : [];

  const updateField = (field: keyof Screen1Values, value: string) => {
    onChange(field, value);
  };

  const handleChange = (field: keyof Screen1Values) => (value: string) => {
    onChange(field, value);
  };

  const currentDate = useMemo(
    () => (values.purchase_date ? parseDate(values.purchase_date) : new Date()),
    [values.purchase_date],
  );

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (!selectedDate) return;
    const formatted = formatDate(selectedDate);
    updateField("purchase_date", formatted);
    setTimeout(() => onBlur("purchase_date"), 0);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      className="flex-1"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-4 bg-white rounded-xl p-4">
          <View className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-gray-900">
              Property name
            </AppText>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowPropertyModal(true)}
              className="flex-row items-center justify-between rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4"
            >
              <AppText
                className={`text-base font-quickRegular ${values.property_name ? "text-black" : "text-gray-400"
                  }`}
              >
                {values.property_name || "Select property"}
              </AppText>
            </TouchableOpacity>
            {touched?.property_id && errors?.property_id ? (
              <AppText className="text-xs text-red-600">
                {errors.property_id}
              </AppText>
            ) : null}
          </View>

          <View className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-gray-900">
              Purchased date
            </AppText>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowDatePicker(true)}
              className=" rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 flex items-center justify-between flex-row"
            >
              <AppText
                className={`text-base ${values.purchase_date ? "text-black" : "text-gray-400"
                  }`}
              >
                {values.purchase_date || "YYYY-MM-DD"}
              </AppText>
              <View className="">
                <Ionicons name="calendar-outline" size={20} color="#111827" />
              </View>
            </TouchableOpacity>
            {touched?.purchase_date && errors?.purchase_date ? (
              <AppText className="text-xs text-red-600">
                {errors.purchase_date}
              </AppText>
            ) : null}
          </View>

          <View className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-gray-900">
              Purchase type
            </AppText>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowTypeModal(true)}
              className="flex-row items-center justify-between rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4"
            >
              <AppText
                className={`text-base ${values.purchase_type ? "text-black" : "text-gray-400"
                  }`}
              >
                {values.purchase_type || "Select purchase type"}
              </AppText>
              <Ionicons name="chevron-down-outline" size={20} color="#111827" />
            </TouchableOpacity>
            {touched?.purchase_type && errors?.purchase_type ? (
              <AppText className="text-xs text-red-600">
                {errors.purchase_type}
              </AppText>
            ) : null}
          </View>

          <View className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-gray-900">
              Number of plots
            </AppText>
            <TextInput
              value={values.number_of_plots}
              onChangeText={(text) =>
                handleChange("number_of_plots")(text.replace(/[^0-9]/g, ""))
              }
              onBlur={() => onBlur("number_of_plots")}
              keyboardType="numeric"
              className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
            />
            {touched?.number_of_plots && errors?.number_of_plots ? (
              <AppText className="text-xs text-red-600">
                {errors.number_of_plots}
              </AppText>
            ) : null}
          </View>

          <View className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-gray-900">
              Plot number(s) *separate each with a comma
            </AppText>
            <TextInput
              value={values.plot_numbers}
              onChangeText={handleChange("plot_numbers")}
              onBlur={() => onBlur("plot_numbers")}
              placeholder="e.g. A2, 102"
              placeholderTextColor="#9CA3AF"
              className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
            />
            {touched?.plot_numbers && errors?.plot_numbers ? (
              <AppText className="text-xs text-red-600">
                {errors.plot_numbers}
              </AppText>
            ) : null}
          </View>

          <Modal
            visible={showPropertyModal}
            customMode
            onClose={() => setShowPropertyModal(false)}
          >
            <View className="flex-1 bg-black/50 justify-end w-full">
              <View style={[styles.container, { paddingBottom: 10 }]} className="h-[75%]">
                <AppText className="mb-4 text-xl text-gray-900" style={{ fontFamily: "quickBold" }}>
                  Select Property
                </AppText>

                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search properties..."
                  placeholderTextColor="#9CA3AF"
                  className="rounded-lg border font-quickRegular border-gray-200 bg-white px-3 h-12 text-base text-black mb-4"
                />

                {isLoadingProperties ? (
                  <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#154A22" />
                  </View>
                ) : (
                  <FlatList
                    data={propertiesList}
                    keyExtractor={(item: any) => item.id?.toString() || item.name}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          updateField("property_id", item.id?.toString() || "");
                          updateField("property_name", item.name || "");
                          setTimeout(() => {
                            onBlur("property_id");
                            onBlur("property_name");
                          }, 0);
                          setShowPropertyModal(false);
                        }}
                        className="rounded-xl bg-secondary px-4 py-4 mb-3"
                      >
                        <AppText className="text-base text-gray-900 font-quickMedium">
                          {item.name}
                        </AppText>
                      </Pressable>
                    )}
                    onRefresh={refreshProperties}
                    refreshing={isLoadingProperties}
                    ListEmptyComponent={
                      isLoadingProperties ? null : (
                        <EmptyStateCard
                          title={
                            searchQuery.trim() !== ""
                              ? `No item matches your search query - '${searchQuery}'`
                              : "No properties found"
                          }
                        />
                      )
                    }
                    contentContainerStyle={{ paddingBottom: 10 }}
                    showsVerticalScrollIndicator={false}
                  />
                )}

                <Pressable
                  onPress={() => setShowPropertyModal(false)}
                  className="mt-2 mb-4 rounded-xl bg-gray-100 px-4 py-4"
                >
                  <AppText className="text-center text-base text-gray-700 font-quickSemiBold">
                    Cancel
                  </AppText>
                </Pressable>
              </View>
            </View>
          </Modal>

          {
            Platform.OS === "ios" ? (
              <Modal
                visible={showDatePicker}
                customMode
                onClose={() => setShowDatePicker(false)}
              >
                <View className="flex-1 bg-black/40 justify-end w-full">
                  <View style={styles.container}>
                    <AppText className="mb-4 text-base font-semibold text-gray-900 w-full text-start">
                      Select purchased date
                    </AppText>
                    <View className="items-center w-full">
                      <DateTimePicker
                        value={currentDate}
                        mode="date"
                        display={"spinner"}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                      />
                    </View>
                    <ActionButton
                      name="Done"
                      action={() => setShowDatePicker(false)}
                      hasBG={false}
                      optStyle={{
                        backgroundColor: "#F4F6F1"
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : (
              showDatePicker && (
                <DateTimePicker
                  value={currentDate}
                  mode="date"
                  display={"calendar"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  style={{ width: "100%" }}
                />
              )
            )
          }

          <Modal
            visible={showTypeModal}
            customMode
            onClose={() => setShowTypeModal(false)}
          >
            <View className="flex-1 bg-black/40 justify-end">
              <View style={styles.container}>
                <AppText className="mb-4 text-base font-semibold text-gray-900">
                  Select purchasing type
                </AppText>
                {purchaseTypes.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      updateField("purchase_type", option);
                      setTimeout(() => onBlur("purchase_type"), 0);
                      setShowTypeModal(false);
                    }}
                    className="rounded-xl bg-secondary px-4 py-4 mb-3"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});

export default Screen1;
