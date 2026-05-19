import { AppText } from "@/components/AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";

export interface DocumentItem {
  key: string;
  label: string;
  optional?: boolean;
  status: "empty" | "uploaded";
  fileName?: string;
}

interface Screen4Props {
  values: {
    propertyName: string;
    purchaseDate: string;
    purchaseType: string;
    numberOfPlots: string;
    plotNumbers: string;
    pricePerPlot: string;
  };
  documents: DocumentItem[];
}

const formatNaira = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
};

const calculateTotal = (pricePerPlot: string, numberOfPlots: string) => {
  const price = Number(pricePerPlot.replace(/[^0-9]/g, ""));
  const plots = Number(numberOfPlots.replace(/[^0-9]/g, ""));
  if (!price || !plots) return "0";
  return String(price * plots);
};

const Screen4: React.FC<Screen4Props> = ({ values, documents }) => {
  const totalValue = formatNaira(
    calculateTotal(values.pricePerPlot, values.numberOfPlots),
  );

  return (
    <View className="space-y-6 pb-24 pt-4">
      <AppText className="text-lg font-semibold text-gray-900">
        Review details
      </AppText>

      <View className="rounded-3xl bg-white p-5 shadow-sm">
        <AppText className="text-sm font-semibold text-gray-900">
          Property summary
        </AppText>
        <View className="mt-4 space-y-3">
          <View className="flex-row justify-between">
            <AppText className="text-sm text-gray-500">Name</AppText>
            <AppText className="text-sm text-gray-900">
              {values.propertyName || "-"}
            </AppText>
          </View>
          <View className="flex-row justify-between">
            <AppText className="text-sm text-gray-500">Purchase date</AppText>
            <AppText className="text-sm text-gray-900">
              {values.purchaseDate || "-"}
            </AppText>
          </View>
          <View className="flex-row justify-between">
            <AppText className="text-sm text-gray-500">Purchase type</AppText>
            <AppText className="text-sm text-gray-900">
              {values.purchaseType || "-"}
            </AppText>
          </View>
          <View className="flex-row justify-between">
            <AppText className="text-sm text-gray-500">Plot numbers</AppText>
            <AppText className="text-sm text-gray-900">
              {values.plotNumbers || "-"}
            </AppText>
          </View>
        </View>
      </View>

      <View className="rounded-3xl bg-white p-5 shadow-sm">
        <AppText className="text-sm font-semibold text-gray-900">
          Purchase value
        </AppText>
        <View className="mt-4 space-y-3">
          <View className="flex-row justify-between">
            <AppText className="text-sm text-gray-500">Price per plot</AppText>
            <AppText className="text-sm font-semibold text-gray-900">
              ₦{formatNaira(values.pricePerPlot)}
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

      <View className="rounded-3xl bg-white p-5 shadow-sm">
        <View className="flex-row items-center justify-between">
          <AppText className="text-sm font-semibold text-gray-900">
            Documents
          </AppText>
          <Ionicons name="document-text-outline" size={18} color="#047857" />
        </View>
        <View className="mt-4 space-y-3">
          {documents.map((doc) => (
            <View
              key={doc.key}
              className="flex-row items-center justify-between rounded-3xl border border-gray-200 bg-gray-50 px-4 py-4"
            >
              <View>
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
                className={`rounded-full px-3 py-1 ${
                  doc.status === "uploaded" ? "bg-emerald-100" : "bg-gray-100"
                }`}
              >
                <AppText
                  className={`text-xs font-semibold ${
                    doc.status === "uploaded"
                      ? "text-emerald-700"
                      : "text-gray-500"
                  }`}
                >
                  {doc.status === "uploaded" ? "Uploaded" : "Pending"}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Screen4;
