import TrackCard from "@/components/cards/TrackCard";
import { getPropertyDetailsService, requestPropertyBuybackService, uploadPropertyDocumentService } from "@/services/propertiesServices";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { formatterUtility, formatISODateToYYYYMMDD } from "@/helpers/formatterUtility";
import { StatusType } from "@/lib/interfaces";
import Modal from "@/components/modal/Modal";
import { assets } from "@/assets/assets";
import Toast from "react-native-toast-message";


const PropertyDetails = () => {

  const { propertyId } = useLocalSearchParams();
  const id = Number(propertyId);

  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState<StatusType>("pending");

  const [showDocModal, setShowDocModal] = React.useState(false);
  const [selectedDocType, setSelectedDocType] = React.useState(null);

  const statusStyles = {
    all: "",
    eligible: "bg-fadedGreen text-primary",
    not_eligible: "bg-red-100 text-red-600",
    offer_sent: "bg-blue-100 offerText",
    completed: "bg-gray-200 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
    buyback_requested: "bg-yellow-100 text-yellow-700"
  };

  const statusLabel = {
    all: "N/A",
    eligible: "Eligible",
    not_eligible: "Not Eligible",
    offer_sent: "Offer Sent",
    completed: "Completed",
    pending: 'Pending',
    buyback_requested: "Buyback Requested"
  };

  const canRequestBuyback = currentStatus === "eligible";

  // PICK IMAGE
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0]);
    }
  };

  // UPLOAD IMAGE
  // Use TanStack mutation to upload document via axios helper
  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => uploadPropertyDocumentService(id, formData),
    onSuccess: (resp: any) => {
      setUploaded(true);
      console.log("Upload success", resp);
    },
    onError: (err: any) => {
      console.log("Upload error", err);
    },
    onSettled: () => setUploading(false),
  });

  const uploadImage = (file: any) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("document", {
      uri: file.uri,
      name: "allocation.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("document_type", selectedDocType || "");

    uploadMutation.mutate(formData);
  };

  const fetchPropertyDetails = () => getPropertyDetailsService(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: fetchPropertyDetails,
    enabled: !!id
  });

  const property = data || {};
  const status: StatusType = currentStatus || (property?.status as StatusType) || "pending";

  React.useEffect(() => {
    if (property?.status) {
      setCurrentStatus(property.status as StatusType);
    }
  }, [property?.status]);

  const queryClient = useQueryClient();

  const requestMutation = useMutation({
    mutationFn: ({ id }: { id: number; name: string }) => requestPropertyBuybackService(id),
    onSuccess: (data, variables) => {
      setOpenModal(false);

      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['propertyDetails', id] });

      setCurrentStatus("pending");

      Toast.show({
        type: "success",
        text1: "Request Submitted",
        text2: `${variables.name}Your buyback request is being processed`,
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Request Failed",
        text2: "Something went wrong.",
      });
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
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Failed to fetch properties</Text>
      </View>
    )
  }

  console.log("Current status:", property?.status);
  console.log("Status type:", typeof property?.status);
  const propertyName = property?.property?.name || property?.name || "Property";
  const formattedDate = formatISODateToYYYYMMDD(property?.purchase_date || "");

  const plotDetails = [
    {
      label: "Price/Plot",
      value: formatterUtility(Number(property?.price_per_plots || 0))
    },
    {
      label: "Total Value",
      value: formatterUtility(Number(property?.total_value || 0))
    },
    {
      label: "Plots",
      value: `${property?.number_of_plots || 0} Plots`
    }
  ]

  const purchaseProperty = [
    {
      label: "Name", value: propertyName
    },
    {
      label: "Purchase Date",
      value: formattedDate
    },
    {
      label: "Purchase Type",
      value: property?.purchase_type || ""
    },
    {
      label: "Plot Numbers",
      value: property?.plot_numbers || ""
    }
  ]

  // documment submission logic

  const documentTypes = [
    "Allocation letter",
    "ID Card",
    "Receipt",
    "Other",
  ];

  const handleSelectDocType = async (type: any) => {
    setSelectedDocType(type);
    setShowDocModal(false);

    // small delay so modal closes first (better UX)
    setTimeout(() => {
      pickImage(); // or pickDocument()
    }, 300);
  };

  return (
    <ScrollView className="flex-1 bg-white  border border-gray-200 rounded-lg p-4 mb-4 w-full ">
      <View className="flex-row justify-between">
        <View className="mb-4">
          <Text className="text-xl font-medium mb-2">{propertyName}</Text>
          <Text>{property.number_of_plots || 0} • {property.purchase_type} • {formattedDate}</Text>
        </View>

        <View>
          <View
            className={`px-3 py-3 rounded-lg ${statusStyles[status]}`}
          >
            <Text className="text-xs font-medium">
              {statusLabel[status]}
            </Text>
          </View>
        </View>

      </View>

      <View className="flex-row flex-wrap justify-between gap-2 mt-4 items-center">
        {
          plotDetails.map((detail: any, index: number) => (
            <View key={index} className="bg-fadedGreen flex items-center justify-center rounded-lg w-28 h-24 p-3 text-center">
              <Text className="text-lg mb-2">{detail.label}</Text>
              <Text className="text-xl font-medium text-primary">{detail.value}</Text>
            </View>
          ))
        }

      </View>

      <TouchableOpacity
        className={`border border-gray-300 rounded-lg py-6 mt-7 items-center font-medium ${!canRequestBuyback ? "opacity-50" : ""}`}
        activeOpacity={0.8}
        onPress={() => canRequestBuyback && setOpenModal(true)}
        disabled={!canRequestBuyback}
      >
        <Text>{status === "pending" || status === "buyback_requested" ? "Buyback Requested" : "Request Buyback"}</Text>
      </TouchableOpacity>

      <View className="mt-5 border border-gray-300 rounded-lg p-4">
        {
          purchaseProperty.map((detail: any, index: number) => (
            <View key={index} className="flex-row justify-between mb-3  border-b border-gray-100 pb-3">
              <Text className="text-lg font-medium">{detail.label}</Text>
              <Text className="text-gray-800">{detail.value}</Text>
            </View>
          ))}
      </View>

      <View className="mt-5 border border-gray-300 rounded-lg p-4">
        <Text className="text-lg font-semibold ">Documents</Text>

        <View className="bg-secondary/40 rounded-lg flex-row justify-between items-center p-4 mt-3">
          <View className="rounded-full p-2 bg-secondary">
            <Ionicons name="document-text-outline" size={24} color="#4B5563" />
          </View>
          <Text>Allocation letter</Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={24} color="#154A22" />
            <Text>{uploaded ? "Uploaded" : "No document selected"}</Text>
          </View>

        </View>
        <Pressable
          onPress={() => setShowDocModal(true)}
          className="border-2 border-dashed border-gray-300 bg-secondary rounded-lg p-4 h-16 items-center justify-center mt-5"
        >
          <Text>
            {uploading ? "Uploading..." : "Upload more Document"}
          </Text>
        </Pressable>
      </View>

      <View>
        <TrackCard />
      </View>

      <Modal onClose={() => setOpenModal(false)} visible={openModal} showClose={true}>
        <View className="flex-1 items-center pt-15" style={{ paddingHorizontal: 24 }}>
          <Image
            source={assets.microphone}
            style={{ width: 140, height: 140 }}
            resizeMode="contain"
          />
          <Text className="font-medium w-2/3 mb-10 text-center">Are you sure you want to request for
            buyback.
          </Text>
          <>
            {/* Step 1 */}
            <View className="flex-row gap-3 mb-5">
              <Ionicons
                name="sparkles-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Company Review Process
                </Text>

                <Text className="text-gray-600 text-sm">
                  By confirming you are requesting a formal review of your property by our cooperate acquisition team .
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row gap-3 mb-5">
              <Ionicons
                name="locate-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Fixed Valuation Offer
                </Text>

                <Text className="text-gray-600 text-sm">
                  An approved review result in a non-negotiable fixed prce offer based on current market metrics.
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row gap-3 mb-10">
              <Ionicons
                name="card-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Not Immediate Payment
                </Text>

                <Text className="text-gray-600 text-sm">
                  This is the initail stage of a transaction. Payment is not immediate.
                </Text>
              </View>
            </View>

            {/* Step 4 */}
            <View className="flex-row gap-3 mb-10">
              <Ionicons
                name="card-outline"
                size={20}
                color="black"
              />

              <View className="flex-1">
                <Text className="font-semibold mb-1">
                  Documentation Requirements
                </Text>

                <Text className="text-gray-600 text-sm">
                  Further financial and structural document may be required to finalize the valuation.
                </Text>
              </View>

            </View>
          </>

          <TouchableOpacity
            onPress={handleRequest}
            disabled={requestMutation.status === "pending"}
            activeOpacity={0.8}
            className="bg-primary items-center py-5 rounded-lg mb-5 w-full">
            <Text className="text-white font-semibold"> Confirm Request</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => setOpenModal(false)}>
            <Text className="text-gray-600 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>


      </Modal>

      <Modal 
      onClose={()=> setShowDocModal(false)} 
      visible={showDocModal} 
      customMode>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white p-5 rounded-t-2xl">

            <Text className="text-lg font-semibold mb-3">
              Select document type
            </Text>

            {documentTypes.map((type) => (
              <Pressable
                key={type}
                onPress={() => handleSelectDocType(type)}
                className="p-4 border-b border-gray-200"
              >
                <Text>{type}</Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => setShowDocModal(false)}
              className="mt-3 p-3 self-center rounded-lg"
            >
              <Text>Cancel</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PropertyDetails;
