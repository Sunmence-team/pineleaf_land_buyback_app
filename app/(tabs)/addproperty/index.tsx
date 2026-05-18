import { AppText } from "@/components/AppText";
import DocumentUploadCard from "@/components/DocumentUploadCard";
import StepProgress from "@/components/StepProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stepLabels = ["Details", "Value", "Documents", "Reviews"];

const AddProperty = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [propertyName, setPropertyName] = useState("Pineleaf Garden Estate");
  const [purchaseDate, setPurchaseDate] = useState("07-06-2025");
  const [purchaseType, setPurchaseType] = useState("Discount");
  const [numberOfPlots, setNumberOfPlots] = useState("3");
  const [plotNumbers, setPlotNumbers] = useState("A2 102");
  const [pricePerPlot, setPricePerPlot] = useState("30,000,000");
  const [totalValue, setTotalValue] = useState("90,000,000");
  const [showPurchaseTypeOptions, setShowPurchaseTypeOptions] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const formatNumeric = (value: string) => value.replace(/[^0-9]/g, "");
  const formatCurrency = (value: string) => {
    const digits = formatNumeric(value);
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const updateTotalValue = (price: string, quantity: string) => {
    const priceNum = Number(formatNumeric(price));
    const quantityNum = Number(formatNumeric(quantity));
    const total = priceNum * quantityNum;
    setTotalValue(total ? formatCurrency(String(total)) : "");
  };

  const updatePricePerPlot = (value: string) => {
    const formatted = formatCurrency(value);
    setPricePerPlot(formatted);
    updateTotalValue(formatted, numberOfPlots);
  };

  const updateNumberOfPlots = (value: string) => {
    const digits = formatNumeric(value);
    setNumberOfPlots(digits);
    updateTotalValue(pricePerPlot, digits);
  };

  const stepStatus: { label: string; status: "done" | "current" | "todo" }[] =
    stepLabels.map((label, index) => ({
      label,
      status:
        index + 1 < step ? "done" : index + 1 === step ? "current" : "todo",
    }));

  const renderDetailsStep = () => (
    <View className="space-y-5">
      <View className="rounded-[32px] bg-white p-5 shadow-sm">
        <View className="space-y-4">
          <View>
            <AppText className="mb-2 text-sm text-gray-500">
              Property name
            </AppText>
            <TextInput
              value={propertyName}
              onChangeText={setPropertyName}
              placeholder="Enter property name"
              placeholderTextColor="#A0A0A0"
              className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4 text-base text-black"
            />
          </View>

          <View>
            <AppText className="mb-2 text-sm text-gray-500">
              Purchasing date
            </AppText>
            <TextInput
              value={purchaseDate}
              onChangeText={setPurchaseDate}
              placeholder="07-06-2025"
              placeholderTextColor="#A0A0A0"
              className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4 text-base text-black"
            />
          </View>

          <View>
            <AppText className="mb-2 text-sm text-gray-500">
              Purchasing type
            </AppText>
            <TouchableOpacity
              onPress={() =>
                setShowPurchaseTypeOptions(!showPurchaseTypeOptions)
              }
              className="flex-row items-center justify-between rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4"
            >
              <AppText className="text-base text-black">{purchaseType}</AppText>
              <Ionicons name="chevron-down-outline" size={20} color="#4B5563" />
            </TouchableOpacity>
            {showPurchaseTypeOptions && (
              <View className="mt-2 rounded-3xl bg-white border border-gray-200 p-3 shadow-sm">
                {["Discount", "Regular", "Promo"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setPurchaseType(option);
                      setShowPurchaseTypeOptions(false);
                    }}
                    className="rounded-2xl px-3 py-3"
                  >
                    <AppText className="text-base text-gray-700">
                      {option}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <AppText className="mb-2 text-sm text-gray-500">
                Number of plots
              </AppText>
              <TextInput
                value={numberOfPlots}
                onChangeText={updateNumberOfPlots}
                placeholder="3"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4 text-base text-black"
              />
            </View>
            <View className="flex-1">
              <AppText className="mb-2 text-sm text-gray-500">
                Plot number(s)
              </AppText>
              <TextInput
                value={plotNumbers}
                onChangeText={setPlotNumbers}
                placeholder="e.g. A2 102"
                placeholderTextColor="#A0A0A0"
                className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4 text-base text-black"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderValueStep = () => (
    <View className="space-y-5">
      <View className="rounded-[32px] bg-white p-5 shadow-sm">
        <View className="mb-5 rounded-3xl bg-[#F5F8F1] p-4">
          <AppText className="font-semibold text-sm text-gray-700">
            Actual price
          </AppText>
          <AppText className="mt-1 text-xs text-gray-500">
            Promo price / Discounted price shown here for reference.
          </AppText>
        </View>

        <View className="space-y-4">
          <View>
            <AppText className="mb-2 text-sm text-gray-500">
              Price per plot
            </AppText>
            <TextInput
              value={pricePerPlot}
              onChangeText={updatePricePerPlot}
              placeholder="30,000,000"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4 text-base text-black"
            />
          </View>
          <View>
            <AppText className="mb-2 text-sm text-gray-500">
              Number of plots
            </AppText>
            <TextInput
              value={numberOfPlots}
              onChangeText={updateNumberOfPlots}
              placeholder="3"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-4 py-4 text-base text-black"
            />
          </View>
          <View className="rounded-3xl border border-gray-200 bg-[#FAFBF8] p-4">
            <AppText className="text-sm text-gray-500">
              Total Property value
            </AppText>
            <AppText className="mt-3 text-2xl font-semibold text-black">
              {totalValue}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );

  const renderDocumentsStep = () => (
    <View className="space-y-5">
      <DocumentUploadCard title="Allocation letter" uploaded />
      <DocumentUploadCard title="Deed of assignment" uploaded />
      <DocumentUploadCard title="Company receipt" uploaded />
      <DocumentUploadCard title="Electronic receipt" uploaded />
      <DocumentUploadCard title="Other document (Optional)" />
    </View>
  );

  const renderReviewStep = () => (
    <View className="space-y-5">
      <View className="rounded-[32px] bg-white p-5 shadow-sm">
        <View className="space-y-4">
          <View className="rounded-3xl bg-[#F5F8F1] p-4">
            <AppText className="text-xs text-gray-500">
              Review your submission details before you send.
            </AppText>
          </View>

          <View className="space-y-3">
            {[
              { label: "Name", value: propertyName },
              { label: "Purchase date", value: purchaseDate },
              { label: "Purchase type", value: purchaseType },
              { label: "Plot numbers", value: plotNumbers },
              { label: "Purchase value", value: pricePerPlot },
              { label: "Total value", value: totalValue },
            ].map((item) => (
              <View key={item.label} className="flex-row justify-between">
                <AppText className="text-sm text-gray-500">
                  {item.label}
                </AppText>
                <AppText className="font-semibold text-gray-900">
                  {item.value}
                </AppText>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => setPreviewOpen(true)}
            className="mt-4 rounded-3xl bg-[#E6F4E8] px-4 py-4"
          >
            <AppText className="text-center font-semibold text-sm text-[#1B463C]">
              Preview document
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderDetailsStep();
      case 2:
        return renderValueStep();
      case 3:
        return renderDocumentsStep();
      case 4:
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F5F2]">
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <AppText className="text-base font-semibold">Add Property</AppText>
        <View className="w-6" />
      </View>

      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        <StepProgress steps={stepStatus} />
        <View className="mt-6">
          <AppText className="mb-4 text-xl font-bold">
            {stepLabels[step - 1]}
          </AppText>
          {renderStepContent()}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-5 py-4">
        <View className="flex-row items-center justify-between gap-3">
          <TouchableOpacity
            onPress={() => setStep((prev) => Math.max(prev - 1, 1))}
            className="flex-1 rounded-3xl border border-gray-200 bg-white px-5 py-4"
          >
            <AppText className="text-center text-sm text-gray-600">
              Back
            </AppText>
          </TouchableOpacity>
          {step < 4 ? (
            <TouchableOpacity
              onPress={() => setStep((prev) => Math.min(prev + 1, 4))}
              className="flex-1 rounded-3xl bg-primary px-5 py-4"
            >
              <AppText className="text-center text-sm font-semibold text-white">
                Next
              </AppText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setConfirmOpen(true)}
              className="flex-1 rounded-3xl bg-primary px-5 py-4"
            >
              <AppText className="text-center text-sm font-semibold text-white">
                Submit
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {previewOpen && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/40 px-5">
          <View className="w-full rounded-[32px] bg-white p-5">
            <View className="flex-row items-center justify-between">
              <AppText className="text-lg font-semibold">Preview</AppText>
              <TouchableOpacity onPress={() => setPreviewOpen(false)}>
                <Ionicons name="close" size={22} color="#374151" />
              </TouchableOpacity>
            </View>
            <View className="mt-4 rounded-3xl bg-[#F5F8F1] p-4">
              <AppText className="mb-3 font-semibold">
                Pineleaf Estate & Properties Limited
              </AppText>
              <AppText className="text-xs text-gray-600">
                Allocation letter for the plot listed at Pineleaf Estate. Use
                this screen to verify the scanned document before submission.
              </AppText>
            </View>
            <View className="mt-4 h-64 rounded-3xl bg-gray-100 p-4">
              <AppText className="text-sm text-gray-500">
                Document preview here
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => setPreviewOpen(false)}
              className="mt-4 rounded-3xl bg-primary px-4 py-4"
            >
              <AppText className="text-center text-sm font-semibold text-white">
                Close preview
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {confirmOpen && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/40 px-5">
          <View className="w-full rounded-[32px] bg-white p-5">
            <AppText className="mb-3 text-lg font-semibold">
              Confirm submission
            </AppText>
            <AppText className="text-sm text-gray-600">
              Once submitted, your property will appear in your dashboard with a
              not yet eligible status. You will be notified when it becomes
              eligible for buyback.
            </AppText>
            <TouchableOpacity
              onPress={() => {
                setConfirmOpen(false);
                setSuccessOpen(true);
              }}
              className="mt-6 rounded-3xl bg-primary px-4 py-4"
            >
              <AppText className="text-center text-sm font-semibold text-white">
                Yes, Submit
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConfirmOpen(false)}
              className="mt-3 rounded-3xl bg-gray-100 px-4 py-4"
            >
              <AppText className="text-center text-sm font-semibold text-gray-700">
                Back to edit
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {successOpen && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/40 px-5">
          <View className="w-full rounded-[32px] bg-white p-5">
            <View className="items-center gap-4">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={32}
                  color="#166534"
                />
              </View>
              <AppText className="text-center text-xl font-semibold">
                Pineleaf Garden Estate has been registered.
              </AppText>
              <AppText className="text-center text-sm text-gray-600">
                We will notify you when it becomes eligible for buyback.
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSuccessOpen(false);
                router.push("/(tabs)");
              }}
              className="mt-6 rounded-3xl bg-primary px-4 py-4"
            >
              <AppText className="text-center text-sm font-semibold text-white">
                Back to home
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddProperty;
