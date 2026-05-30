import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const documentsData = [
    {
        id: 1,
        title: "Deed of assignment",
        description: "Original signed copy of deed",
        submitted: true,
    },
    {
        id: 2,
        title: "Allocation letter",
        description:
            "Official letter issued during property acquisition",
        submitted: true,
    },
    {
        id: 3,
        title: "Company-issued receipt",
        description:
            "Original payment receipt from the company",
        submitted: false,
    },
    {
        id: 4,
        title: "Electronic receipt",
        description:
            "Print out any digital transaction",
        submitted: false,
    },
    {
        id: 5,
        title: "Any additional docs requested",
        description:
            "Any other site-specific or legal papers requested",
        submitted: false,
    },
];

export default function SubmitDocumentsScreen() {
    const [documents, setDocuments] = useState(documentsData);

    const submittedCount = useMemo(() => {
        return documents.filter((item) => item.submitted).length;
    }, [documents]);

    const allDocumentsSubmitted = useMemo(() => {
        return documents.every((item) => item.submitted);
    }, [documents]);

    const toggleDocument = (id: number) => {
        setDocuments((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        submitted: !item.submitted,
                    }
                    : item
            )
        );
    };

    const handleSubmit = () => {
        if (!allDocumentsSubmitted) {
            showErrorToast("Incomplete documents: Please submit all required documents")
            return;
        }
        
        showSuccessToast("Documents Submitted: Your documents are now under verification")
        // Example navigation
        // router.push("/tracking");
    };

    return (
        <View className="flex-1 bg-[#F5F5F2]">

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 140,
                }}
            >
                {/* Main Card */}
                <View className="bg-[#F7F7F7] rounded-[32px] p-4">

                    {/* Intro */}
                    <Text className="text-[18px] font-semibold text-black mb-5">
                        Payment is not yet immediate
                    </Text>

                    <Text className="text-[16px] text-black leading-10 mb-8">
                        Documents must be submitted and verified
                        before payout.
                    </Text>

                    {/* Required Documents */}
                    <View className="border border-[#D8D8D8] rounded-[24px] p-5">

                        <Text className="text-[18px] font-semibold mb-6">
                            Required documents
                        </Text>

                        {documents.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.8}
                                onPress={() => toggleDocument(item.id)}
                                className="flex-row gap-4 mb-7"
                            >
                                {/* Checkbox */}
                                <View
                                    className={`w-12 h-12 rounded-xl border items-center justify-center mt-1 ${item.submitted
                                        ? "bg-primary border-primary"
                                        : "border-[#BDBDBD]"
                                        }`}
                                >
                                    {item.submitted && (
                                        <Ionicons
                                            name="checkmark"
                                            size={24}
                                            color="white"
                                        />
                                    )}
                                </View>

                                {/* Content */}
                                <View className="flex-1">
                                    <Text className="text-[16px] font-semibold text-black mb-2">
                                        {item.title}
                                    </Text>

                                    <Text className="text-[14px] text-[#4F4F4F] leading-6">
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Office Submission Card */}
                    <View className="border border-[#D8D8D8] rounded-[24px] p-5 mt-6">

                        <Text className="text-[#245B36] text-[16px] leading-8 mb-6">
                            Your selected office submission will be verified
                            by the company before payment is processed
                        </Text>

                        <Text className="text-[18px] font-semibold mb-3">
                            Submit at office
                        </Text>

                        <View className="flex-row items-center gap-2 mb-3">
                            <Ionicons
                                name="location-outline"
                                size={18}
                                color="#245B36"
                            />

                            <Text className="text-[#245B36] font-medium">
                                Pineleaf Estate Head Office
                            </Text>
                        </View>

                        <Text className="text-[#6B6B6B] leading-6">
                            24 Admiralty Way, Lekki Phase 1, Lagos
                        </Text>

                        {/* Progress */}
                        <View className="mt-6">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-[#6B6B6B]">
                                    Submission Progress
                                </Text>

                                <Text className="font-semibold">
                                    {submittedCount}/{documents.length}
                                </Text>
                            </View>

                            <View className="h-3 bg-[#E5E5E5] rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-primary rounded-full"
                                    style={{
                                        width: `${(submittedCount / documents.length) * 100
                                            }%`,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-[#F5F5F2] px-4 py-6">
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                    className={`rounded-[20px] py-5 items-center ${allDocumentsSubmitted
                        ? "bg-primary"
                        : "bg-[#9CA3AF]"
                        }`}
                >
                    <Text className="text-white text-[18px] font-semibold">
                        I have submitted my documents
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}