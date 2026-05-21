import { AppText } from "@/components/AppText";
import { Feather } from "@expo/vector-icons";
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
  error?: string;
  touched?: boolean;
}

const Screen3: React.FC<Screen3Props> = ({
  documents,
  onUpload,
  error,
  touched,
}) => {
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

      <View className="flex flex-col gap-4 bg-white rounded-xl p-4">
        {documents.map((doc) => (
          <Pressable
            key={doc.key}
            onPress={() => handleSelectFile(doc.key)}
            className="rounded-xl border border-gray-300 bg-white p-4"
          >
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-3">
                <View className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                  <Ionicons name="document-text-outline" size={20} />
                </View>
                <View className="flex-1">
                  <AppText className="text-base font-semibold">
                    {doc.label}
                  </AppText>
                </View>
              </View>
            </View>

            <View className="mt-4 rounded-xl border border-dashed border-gray-200 bg-slate-50 px-4 py-3">
              <View className="flex-row items-center gap-3">
                {doc.status === "empty" ? (
                  <View className="bg-primary/10 p-3 rounded-full">
                    <Feather name="upload" size={18} color="#064E3B" />
                  </View>
                ) : (
                  <View className="bg-primary/10 p-3 rounded-full">
                    <Feather name="check" size={18} color="#065F46" />
                  </View>
                )}
                <View className="flex-1">
                  <AppText className="text-sm font-semibold text-gray-900">
                    {doc.status === "uploaded"
                      ? (doc.fileName ?? "Uploaded document")
                      : "Upload /Drag & drop here "}
                  </AppText>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
        {touched && error ? (
          <AppText className="text-xs text-red-600">{error}</AppText>
        ) : null}
      </View>
    </View>
  );
};

export default Screen3;
