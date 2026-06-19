import { AppText } from "@/components/AppText";
import EmptyStateCard from "@/components/cards/EmptyStateCard";
import { searchPropertiesService } from "@/services/propertiesServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useMemo, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "@/components/modal/Modal";
import ActionButton from "@/components/buttons/ActionButton";
import { useAddProperty } from "@/context/AddPropertyContext";
import { formatNaira } from "@/helpers/formatterUtility";

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

export default function StepOneScreen() {
  const { formik, setCurrentStep } = useAddProperty();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(1);
    }, [setCurrentStep])
  );

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

  const updateField = (field: string, value: string) => {
    formik.setFieldValue(field, value);
  };

  const handleFieldBlur = (field: string) => {
    formik.setFieldTouched(field, true);
  };

  const currentDate = useMemo(
    () => (formik.values.purchase_date ? parseDate(formik.values.purchase_date) : new Date()),
    [formik.values.purchase_date],
  );

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (!selectedDate) return;
    const formatted = formatDate(selectedDate);
    
    // Atomically set form values and touched state, and force validation check
    formik.setFormikState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        purchase_date: formatted,
      },
      touched: {
        ...prev.touched,
        purchase_date: true,
      },
    }));
    setTimeout(() => {
      formik.validateForm();
    }, 50);
  };

  const { values, errors, touched } = formik;

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
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
          {touched.property_id && errors.property_id ? (
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
          {touched.purchase_date && errors.purchase_date ? (
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
          {touched.purchase_type && errors.purchase_type ? (
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
            // value={values.number_of_plots}
            value={formatNaira(values.number_of_plots)}
            onChangeText={(text) =>
              updateField("number_of_plots", text.replace(/[^0-9]/g, ""))
            }
            onBlur={() => handleFieldBlur("number_of_plots")}
            keyboardType="numeric"
            className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
          />
          {touched.number_of_plots && errors.number_of_plots ? (
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
            onChangeText={(text) => updateField("plot_numbers", text)}
            onBlur={() => handleFieldBlur("plot_numbers")}
            placeholder="e.g. A2, 102"
            placeholderTextColor="#9CA3AF"
            className="rounded-xl border font-quickRegular border-gray-200 bg-white px-4 py-4 text-base text-black"
          />
          {touched.plot_numbers && errors.plot_numbers ? (
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
                autoFocus
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
                        const id = item.id?.toString() || "";
                        const name = item.name || "";
                        
                        // Atomically update property values and touched state, then run validation
                        formik.setFormikState((prev) => ({
                          ...prev,
                          values: {
                            ...prev.values,
                            property_id: id,
                            property_name: name,
                          },
                          touched: {
                            ...prev.touched,
                            property_id: true,
                            property_name: true,
                          },
                        }));
                        
                        setTimeout(() => {
                          formik.validateForm();
                        }, 50);
                        
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
                  contentContainerStyle={[
                    { paddingBottom: 10 },
                    propertiesList.length === 0 && {
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1
                    },
                  ]}
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
                      textColor="black"
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
                    // Atomically update purchase type and touched state, then run validation
                    formik.setFormikState((prev) => ({
                      ...prev,
                      values: {
                        ...prev.values,
                        purchase_type: option,
                      },
                      touched: {
                        ...prev.touched,
                        purchase_type: true,
                      },
                    }));

                    setTimeout(() => {
                      formik.validateForm();
                    }, 50);
                    
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
  );
}

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
