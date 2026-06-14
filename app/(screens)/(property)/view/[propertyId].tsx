import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import ActionButton from "@/components/buttons/ActionButton";
import { getButtonText } from "@/components/cards/PropertyCard";
import StatusCard from "@/components/cards/StatusCard";
import TrackCard from "@/components/cards/TrackCard";
import Modal from "@/components/modal/Modal";
import { getErrorMessage } from "@/helpers/axios";
import {
  formatISODateToYYYYMMDD,
  formatterUtility,
} from "@/helpers/formatterUtility";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { DocumentItem, StatusType } from "@/lib/interfaces";
import {
  getPropertyDetailsService,
  requestPropertyBuybackService,
  uploadPropertyDocumentService,
} from "@/services/propertiesServices";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { StyleSheet } from "react-native";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PropertyDetails = () => {
  const { propertyId } = useLocalSearchParams();
  const id = Number(propertyId);
  const queryClient = useQueryClient();

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [showDocModal, setShowDocModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);

  // PICK IMAGE
  const handlePickDocument = async (doc_key: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      handleUploadImage(doc_key, result.assets[0]);
    }
  };

  // UPLOAD IMAGE
  // Use TanStack mutation to upload document via axios helper
  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) =>
      uploadPropertyDocumentService(id, formData),
    onSuccess: (data: any) => {
      setUploaded(true);
      showSuccessToast(data?.message || "Upload successful");
      queryClient.invalidateQueries({ queryKey: ["propertyDetails", id] });
      console.log("Upload success", data);
    },
    onError: (err: any) => {
      showErrorToast(getErrorMessage(err) || "Failed to upload document");
      console.log("Upload error", err);
    },
    onSettled: () => setUploading(false),
  });

  const handleUploadImage = (doc_key: string, file: any) => {
    setUploading(true);
    const formData = new FormData();
    formData.append(doc_key, {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream"
    } as any);

    formData.append("document_type", selectedDocType || "");

    uploadMutation.mutate(formData);
  };

  const fetchPropertyDetails = () => getPropertyDetailsService(id);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: fetchPropertyDetails,
    enabled: !!id,
  });

  const property = data || {};
  console.log(JSON.stringify(property, null, 2))
  const status: StatusType = property?.status as StatusType || "pending";

  const requestMutation = useMutation({
    mutationFn: ({ id }: { id: number; name: string }) =>
      requestPropertyBuybackService(id),
    onSuccess: (data, variables) => {
      setOpenModal(false);

      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["propertyDetails", id] });

      // setCurrentStatus("pending");

      showSuccessToast(
        data?.message ||
          `${variables.name} Your buyback request is being processed`,
      );
    },
    onError: (error) => {
      showErrorToast(
        getErrorMessage(error) || `Failed to request buyback`,
      );
      console.error("Failed to request buyback: ", error);
    },
  });

  const handleRequest = () => {
    requestMutation.mutate({ id, name: property?.name || "Property" });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading Properties details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Failed to fetch properties</Text>
      </View>
    );
  }

  console.log("Current status:", property?.status);
  const propertyName = property?.property?.name || property?.name || "Property";
  const formattedDate = formatISODateToYYYYMMDD(property?.purchase_date || "");

  const plotDetails = [
    {
      label: "Price/Plot",
      value: formatterUtility(Number(property?.price_per_plots || 0)),
    },
    {
      label: "Total Value",
      value: formatterUtility(Number(property?.total_value || 0)),
    },
    {
      label: "Plots",
      value: `${property?.number_of_plots || 0} Plots`,
    },
  ];

  const purchaseProperty = [
    {
      label: "Name",
      value: propertyName,
    },
    {
      label: "Purchase Date",
      value: formattedDate,
    },
    {
      label: "Purchase Type",
      value: property?.purchase_type || "",
    },
    {
      label: "Plot Numbers",
      value: property?.plot_numbers || "",
    },
  ];

  // document submission logic

  const defaultDocuments: DocumentItem[] = [
    { key: "allocation_letter", label: "Allocation letter", status: "empty" },
    { key: "deed_of_assignment", label: "Deed of assignment", status: "empty" },
    { key: "company_receipt", label: "Company receipt", status: "empty" },
    {
      key: "electronic_receipt",
      label: "Electronic receipt (if applicable)",
      status: "empty",
      optional: true,
    },
    {
      key: "other_document",
      label: "Other document (Optional)",
      status: "empty",
      optional: true,
    },
  ];

  const handleSelectDocType = async (type: string) => {
    setSelectedDocType(type);
    setShowDocModal(false);

    // small delay so modal closes first (better UX)
    setTimeout(() => {
      handlePickDocument(type); // or pickDocument()
    }, 300);
  };

  const handleDynamicClickLogic = (status: StatusType) => {
    if (status === "eligible") {
      setOpenModal(true)
    } else if (status === "offer_sent") {
      router.push(`/offer/${id}`);
    }
  };

  const getFilename = (url: string) => {
    if (!url) return "";
    return url.substring(url.lastIndexOf("/") + 1);
  };

  return (
    <View className="flex-1 bg-secondary pt-6" style={{ paddingHorizontal: 20 }}>
      <ScrollView
        style={{ flex: 1, borderRadius: 20 }} 
        className="bg-white border border-gray-200 rounded-lg p-5 mb-4 w-full" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={"#F4F6F1"}
          />
        }
      >
        <View className="flex-row justify-between items-start">
          <View className="mb-4">
            <Text className="text-xl font-medium mb-2">{propertyName}</Text>
            <Text>
              {property.number_of_plots || 0} • {property.purchase_type} •{" "}
              {formattedDate}
            </Text>
          </View>

          <StatusCard currentStatus={status} />
        </View>

        <View className="flex-row justify-between gap-3 mt-4 mb-7 items-center">
          {plotDetails.map((detail: any, index: number) => (
            <View
              key={index}
              className="bg-fadedGreen flex items-center justify-center rounded-lg flex-1 h-24 p-3 text-center"
            >
              <Text className="text-lg mb-2">{detail.label}</Text>
              <Text className="text-xl font-medium text-primary">
                {detail.value}
              </Text>
            </View>
          ))}
        </View>
        
        {
          (status === "eligible" || status === "offer_sent") && (
            <ActionButton 
              action={() => handleDynamicClickLogic(property?.status)}
              name={getButtonText(property?.status)}
              optStyle={{
                height: 40
              }}
            />
          )
        }

        <View className="mt-5 border border-gray-300 rounded-lg p-4">
          {purchaseProperty.map((detail: any, index: number) => (
            <View
              key={index}
              className="flex-row justify-between mb-3  border-b border-gray-100 pb-3"
            >
              <Text className="text-lg font-medium">{detail.label}</Text>
              <Text className="text-gray-800">{detail.value}</Text>
            </View>
          ))}
        </View>

        <View className="mt-5 border border-gray-300 rounded-lg p-4">
          <Text className="text-lg font-semibold ">Documents</Text>

          {defaultDocuments.map((doc) => {
            const docUrl = property[doc.key];
            const isUploaded = !!docUrl;
            const fileName = getFilename(docUrl);

            return (
              <Pressable
                key={doc.key}
                onPress={() => handleSelectDocType(doc.key)}
                className="bg-secondary/40 rounded-lg flex-row justify-between items-center p-4 mt-3"
              >
                <View className="rounded-full p-2 bg-secondary">
                  <Ionicons name="document-text-outline" size={24} color="#4B5563" />
                </View>
                <View className="flex-1 ml-3 mr-2">
                  <AppText className="text-base font-quickMedium text-gray-900">{doc.label}</AppText>
                  {isUploaded && (
                    <AppText className="text-xs text-gray-500 font-quickRegular" numberOfLines={1} ellipsizeMode="tail">
                      {fileName}
                    </AppText>
                  )}
                </View>
                <View className="flex-row items-center gap-2">
                  <Ionicons 
                    name={isUploaded ? "checkmark-circle" : "cloud-upload-outline"} 
                    size={24} 
                    color={isUploaded ? "#154A22" : "#9CA3AF"} 
                  />
                  <AppText className="font-quickMedium text-sm" style={{ color: isUploaded ? "#154A22" : "#9CA3AF" }}>
                    {isUploaded ? "Uploaded" : "Upload"}
                  </AppText>
                </View>
              </Pressable>
            );
          })}

          <Pressable
            onPress={() => setShowDocModal(true)}
            className="border-2 border-dashed border-gray-300 bg-secondary rounded-lg p-4 h-16 items-center justify-center mt-5"
          >
            <Text>{uploading ? "Uploading..." : "Upload more Document"}</Text>
          </Pressable>
        </View>

        <View>
          <TrackCard property={property} />
        </View>

        <Modal
          onClose={() => setOpenModal(false)}
          visible={openModal}
          showClose={true}
        >
          <View
            className="flex-1 items-center pt-15"
            style={{ paddingHorizontal: 24 }}
          >
            <Image
              source={assets.microphone}
              style={{ width: 140, height: 140 }}
              resizeMode="contain"
            />
            <Text className="font-medium w-2/3 mb-10 text-center">
              Are you sure you want to request for buyback.
            </Text>
            <>
              {/* Step 1 */}
              <View className="flex-row gap-3 mb-5">
                <Ionicons name="sparkles-outline" size={20} color="black" />

                <View className="flex-1">
                  <Text className="font-semibold mb-1">
                    Company Review Process
                  </Text>

                  <Text className="text-gray-600 text-sm">
                    By confirming you are requesting a formal review of your
                    property by our cooperate acquisition team .
                  </Text>
                </View>
              </View>

              {/* Step 2 */}
              <View className="flex-row gap-3 mb-5">
                <Ionicons name="locate-outline" size={20} color="black" />

                <View className="flex-1">
                  <Text className="font-semibold mb-1">
                    Fixed Valuation Offer
                  </Text>

                  <Text className="text-gray-600 text-sm">
                    An approved review result in a non-negotiable fixed prce offer
                    based on current market metrics.
                  </Text>
                </View>
              </View>

              {/* Step 3 */}
              <View className="flex-row gap-3 mb-10">
                <Ionicons name="card-outline" size={20} color="black" />

                <View className="flex-1">
                  <Text className="font-semibold mb-1">
                    Not Immediate Payment
                  </Text>

                  <Text className="text-gray-600 text-sm">
                    This is the initail stage of a transaction. Payment is not
                    immediate.
                  </Text>
                </View>
              </View>

              {/* Step 4 */}
              <View className="flex-row gap-3 mb-10">
                <Ionicons name="card-outline" size={20} color="black" />

                <View className="flex-1">
                  <Text className="font-semibold mb-1">
                    Documentation Requirements
                  </Text>

                  <Text className="text-gray-600 text-sm">
                    Further financial and structural document may be required to
                    finalize the valuation.
                  </Text>
                </View>
              </View>
            </>

            <TouchableOpacity
              onPress={handleRequest}
              disabled={requestMutation.status === "pending"}
              activeOpacity={0.8}
              className="bg-primary items-center py-5 rounded-lg mb-5 w-full"
            >
              <Text className="text-white font-semibold"> Confirm Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOpenModal(false)}
            >
              <Text className="text-gray-600 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          onClose={() => setShowDocModal(false)}
          visible={showDocModal}
          customMode
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View style={styles.container}>
              <Text className="text-lg font-semibold mb-3">
                Select document type
              </Text>

              {defaultDocuments.map((doc) => (
                <Pressable
                  key={doc.key}
                  onPress={() => handleSelectDocType(doc.key)}
                  className="rounded-xl bg-secondary px-4 py-4 mb-3"
                >
                  <AppText className="text-base text-gray-900">{doc.label}</AppText>
                </Pressable>
              ))}

              <Pressable
                onPress={() => setShowDocModal(false)}
                className="mt-2 rounded-xl bg-gray-100 px-4 py-4"
              >
                <AppText className="text-center text-base text-gray-700">Cancel</AppText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
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

export default PropertyDetails;
