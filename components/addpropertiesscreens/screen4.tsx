import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import React from "react";
import { Image, TouchableOpacity, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { DocumentItem } from "@/lib/interfaces";
import Modal from "../modal/Modal";
import ActionButton from "../buttons/ActionButton";

interface Screen4Props {
  values: {
    property_id: string;
    property_name: string;
    purchase_date: string;
    purchase_type: string;
    number_of_plots: string;
    plot_numbers: string;
    price_per_plots: string;
  };
  documents: DocumentItem[];
  showSubmitModal: boolean;
  setShowSubmitModal: (value: React.SetStateAction<boolean>) => void;
  hasSubmit: boolean;
  setHasSubmit: (value: React.SetStateAction<boolean>) => void;
  onBackHome: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const formatNaira = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
};

const calculateTotal = (price_per_plots: string, number_of_plots: string) => {
  const price = Number(price_per_plots.replace(/[^0-9]/g, ""));
  const plots = Number(number_of_plots.replace(/[^0-9]/g, ""));
  if (!price || !plots) return "0";
  return String(price * plots);
};

const Screen4: React.FC<Screen4Props> = ({
  values,
  documents,
  showSubmitModal,
  setShowSubmitModal,
  hasSubmit,
  setHasSubmit,
  onBackHome,
  isSubmitting,
  onSubmit,
}) => {
  const totalValue = formatNaira(
    calculateTotal(values.price_per_plots, values.number_of_plots),
  );

  console.log(values)

  return hasSubmit ? (
    <ScrollView 
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        key="submitted"
        className="flex-1 items-center justify-between py-20 px-5"
      >
        <View className="w-full flex flex-col gap-8">
          <View className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF8EE]">
            <Image source={assets.success} alt="success-gif" />
          </View>

          <View className="items-center px-2">
            <AppText className="text-xl leading-8 text-center font-medium text-[#111827]">
              {values.property_name || "Property"} has been registered. We will
              notify you when it becomes eligible for buyback.
            </AppText>
          </View>

          <View className="mx-auto rounded-2xl bg-[#FDECEC] px-5 py-3">
            <AppText className="text-[#DC2626] text-[14px] font-semibold">
              Not Eligible
            </AppText>
          </View>
        </View>

        <TouchableOpacity
          className="mt-20 h-14 w-full items-center justify-center rounded-xl bg-primary"
          onPress={onBackHome}
        >
          <AppText className="text-white text-[16px] font-semibold">
            Back to home
          </AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : (
    <ScrollView 
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View key="review" className="flex flex-col gap-4">
        <View className="rounded-xl bg-white p-5 flex flex-col gap-3">
          <View className="flex-row justify-between border-b border-b-primary/5 pb-3">
            <AppText className="text-sm text-gray-500">Name</AppText>
            <AppText className="text-sm text-gray-900">
              {values.property_name || "-"}
            </AppText>
          </View>
          <View className="flex-row justify-between border-b border-b-primary/5 pb-3">
            <AppText className="text-sm text-gray-500">Purchase date</AppText>
            <AppText className="text-sm text-gray-900">
              {values.purchase_date || "-"}
            </AppText>
          </View>
          <View className="flex-row justify-between border-b border-b-primary/5 pb-3">
            <AppText className="text-sm text-gray-500">Purchase type</AppText>
            <AppText className="text-sm text-gray-900">
              {values.purchase_type || "-"}
            </AppText>
          </View>
          <View className="flex-row justify-between">
            <AppText className="text-sm text-gray-500">Plot numbers</AppText>
            <AppText className="text-sm text-gray-900">
              {values.plot_numbers || "-"}
            </AppText>
          </View>
        </View>

        <View className="rounded-xl bg-white p-5 flex flex-col gap-4">
          <AppText className="text-sm font-semibold text-gray-900">
            Purchase value
          </AppText>
          <View className="flex flex-col gap-3">
            <View className="flex-row justify-between border-b border-b-primary/5 pb-3">
              <AppText className="text-sm text-gray-500">Price per plot</AppText>
              <AppText className="text-sm font-semibold text-gray-900">
                ₦{formatNaira(values.price_per_plots)}
              </AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText className="text-sm text-gray-500">Total value</AppText>
              <AppText className="text-sm font-semibold text-gray-900">
                ₦{totalValue}
              </AppText>
            </View>
          </View>
        </View>

        <View className="rounded-xl bg-white p-5 flex flex-col gap-4">
          <View className="flex-row items-center justify-between">
            <AppText className="text-sm font-semibold text-gray-900">
              Documents
            </AppText>
          </View>
          <View className="flex flex-col gap-3">
            {documents.map((doc) => (
              <View
                key={doc.key}
                className="flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-4"
              >
                <View style={{ maxWidth: "75%" }}>
                  <AppText className="text-sm font-medium text-gray-900">
                    {doc.label}
                  </AppText>
                  <AppText className="text-xs text-gray-500">
                    {doc.status === "uploaded"
                      ? doc.fileName || "Uploaded"
                      : doc.optional
                        ? "Optional"
                        : "Missing"}
                  </AppText>
                </View>
                <View
                  className={`rounded-full px-3 py-1 ${doc.status === "uploaded" ? "bg-primary/10" : "bg-gray-100"
                    }`}
                >
                  <AppText
                    className={`text-xs font-semibold ${doc.status === "uploaded" ? "text-primary" : "text-gray-500"
                      }`}
                  >
                    {doc.status === "uploaded" ? "Uploaded" : "Pending"}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Modal visible={showSubmitModal} onClose={() => setShowSubmitModal(false)} customMode>
          <View className="flex-1 bg-black/40 justify-end">
            <View style={styles.container}>
              <AppText className="text-2xl mb-3 text-black" style={{ fontFamily: "quickSemiBold" }}>
                Confirm submission
              </AppText>

              <AppText className="text-sm leading-6 text-black">
                Once submitted, your property will appear in your dashboard with a
                “Not yet eligible” status. You’ll be notified when it becomes
                eligible for buyback.
              </AppText>
              <View className="flex flex-col gap-2 mt-8">
                <ActionButton
                  name={isSubmitting ? "Submitting..." : "Yes, Submit"}
                  action={onSubmit}
                  disabled={isSubmitting}
                />
                <ActionButton
                  name={"Back to edit"}
                  action={() => setShowSubmitModal(false)}
                  disabled={isSubmitting}
                  hasBG={false}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "white"
  }
})


export default Screen4;
