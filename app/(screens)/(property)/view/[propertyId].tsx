import TrackCard from "@/components/cards/TrackCard";
import { getPropertyDetailsService, uploadPropertyDocumentService } from "@/services/propertiesServices";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { formatterUtility, formatISODateToYYYYMMDD } from "@/helpers/formatterUtility";
import { StatusType } from "@/lib/interfaces";

const PropertyDetails = () => {

  const { propertyId } = useLocalSearchParams();
  const id = Number(propertyId);

  const [image, setImage] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);

  const statusStyles = {
    all: "",
    eligible: "bg-fadedGreen text-primary",
    not_eligible: "bg-red-100 text-red-600",
    offer_sent: "bg-blue-100 offerText",
    completed: "bg-gray-200 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700"
  };

  const statusLabel = {
    all: "N/A",
    eligible: "Eligible",
    not_eligible: "Not Eligible",
    offer_sent: "Offer Sent",
    completed: "Completed",
    pending: 'Pending'
  };

  // PICK IMAGE
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

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

    uploadMutation.mutate(formData);
  };

  const fetchPropertyDetails = () => getPropertyDetailsService(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: fetchPropertyDetails,
    enabled: !!id
  })

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

  const property = data || {}
  const status: StatusType = property?.status || "pending";
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

  return (
    <ScrollView className="flex-1 bg-secondary  border border-gray-200 rounded-lg p-4 mb-4 w-full ">
      <View className="flex-row justify-between">
        <View className="mb-4">
          <Text className="text-xl font-medium mb-2">{propertyName}</Text>
          <Text>{property.number_of_plots || 0} • {property.purchase_type} • {formattedDate}</Text>
        </View>

        <View
          className={`px-3 py-1 rounded-lg ${statusStyles[status]}`}
        >
          <Text className="text-xs font-medium">
            {statusLabel[status]}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap justify-between gap-2 mt-4 items-center">
        {
          plotDetails.map((detail: any, index: number) => (
            <View key={index} className="bg-fadedGreen flex items-center justify-center rounded-lg w-32 h-24 p-3 text-center">
              <Text className="text-lg mb-4">{detail.label}</Text>
              <Text className="text-xl font-medium text-primary">{detail.value}</Text>
            </View>
          ))
        }

      </View>

      <TouchableOpacity
        className="bg-fadedGreen border border-gray-300 rounded-lg py-6 mt-7 items-center"
        activeOpacity={0.8}>
        <Text>{status === "pending" ? "Track Request" : "request Buyback"}</Text>
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
          onPress={pickImage}
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
    </ScrollView>
  );
};

export default PropertyDetails;
