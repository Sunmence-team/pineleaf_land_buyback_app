import { AppText } from "@/components/AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Pressable, View } from "react-native";

export interface DocumentItem {
  key: string;
  label: string;
  optional?: boolean;
  status: "empty" | "uploaded";
  fileName?: string;
}

interface Screen3Props {
  documents: DocumentItem[];
  onUpload: (key: string, fileName: string) => void;
}

const Screen3: React.FC<Screen3Props> = ({ documents, onUpload }) => {
  const handleSelectFile = async (key: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      onUpload(key, result.assets[0].name);
    }
  };

  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-col gap-2">
        <AppText className="text-sm leading-6 text-gray-600">
          These uploads are for reference only. Physical documents will be
          required when your property is eligible for buyback.
        </AppText>
      </View>

      <View className="space-y-4">
        {documents.map((doc) => (
          <Pressable
            key={doc.key}
            onPress={() => handleSelectFile(doc.key)}
            className="rounded-3xl border border-dashed border-gray-300 bg-white p-4"
          >
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-3">
                <View className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#047857"
                  />
                </View>
                <View className="flex-1">
                  <AppText className="text-base font-semibold text-gray-900">
                    {doc.label}
                  </AppText>
                  <AppText className="text-xs text-gray-500">
                    {doc.optional ? "Optional" : "Required"}
                  </AppText>
                </View>
              </View>
              <View className="rounded-full bg-gray-100 px-3 py-1">
                <AppText
                  className={`text-xs font-semibold ${
                    doc.status === "uploaded"
                      ? "text-emerald-700"
                      : "text-gray-500"
                  }`}
                >
                  {doc.status === "uploaded" ? "Uploaded" : "Upload"}
                </AppText>
              </View>
            </View>

            <View className="mt-4 rounded-3xl border border-dashed border-gray-200 bg-slate-50 px-4 py-5">
              <AppText className="text-sm text-gray-500">
                {doc.status === "uploaded"
                  ? `Uploaded: ${doc.fileName ?? "Document file"}`
                  : "Upload / Drag & drop here"}
              </AppText>
              {doc.status === "empty" ? (
                <AppText className="mt-2 text-xs text-gray-400">
                  Tap to select a file
                </AppText>
              ) : null}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Screen3;
