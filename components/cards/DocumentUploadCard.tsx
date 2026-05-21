import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";
import { AppText } from "../AppText";

interface DocumentUploadCardProps {
  title: string;
  uploaded?: boolean;
}

const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  title,
  uploaded = false,
}) => {
  return (
    <View className="flex-row items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-3xl bg-primary/10">
          <Ionicons name="document-text-outline" size={20} color="#1B463C" />
        </View>
        <View className="max-w-[65%]">
          <AppText className="font-semibold">{title}</AppText>
          <AppText className="text-xs text-gray-500">
            {uploaded ? "Uploaded" : "Upload / Drag & drop here"}
          </AppText>
        </View>
      </View>

      <View
        className={`rounded-full px-3 py-2 ${
          uploaded ? "bg-emerald-100" : "bg-gray-100"
        }`}
      >
        <AppText
          className={`text-xs ${uploaded ? "text-emerald-700" : "text-gray-600"}`}
        >
          {uploaded ? "Uploaded" : "Upload"}
        </AppText>
      </View>
    </View>
  );
};

export default DocumentUploadCard;
