import { AppText } from "@/components/AppText";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useAddProperty } from "@/context/AddPropertyContext";

export default function StepThreeScreen() {
  const { formik, setCurrentStep } = useAddProperty();

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(3);
    }, [setCurrentStep])
  );

  const handleDocumentUpload = (key: string, file: any) => {
    const nextDocuments = formik.values.documents.map((doc) =>
      doc.key === key
        ? {
            ...doc,
            status: "uploaded",
            fileName: file.name,
            file: file,
          }
        : doc
    );
    formik.setFieldTouched("documents", true);
    formik.setFieldValue("documents", nextDocuments);
  };

  const handleSelectFile = async (key: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      handleDocumentUpload(key, {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: result.assets[0].mimeType || "application/octet-stream",
      });
    }
  };

  const { documents } = formik.values;
  const error = !formik.errors.documents
    ? undefined
    : typeof formik.errors.documents === "string"
      ? formik.errors.documents
      : "Upload all required documents before continuing";
  const touched = Boolean(formik.touched.documents);

  return (
    <ScrollView
      className="bg-secondary"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F4F6F1" }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex flex-col gap-4">
        <View className="flex flex-col gap-2">
          <AppText className="text-sm leading-6 text-gray-600">
            These uploads are for reference only. Physical documents will be
            required when your property is eligible for buyback.
          </AppText>
        </View>

        <View className="flex flex-col gap-4 bg-white rounded-xl p-4" style={{ marginBottom: 20 }}>
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
    </ScrollView>
  );
}