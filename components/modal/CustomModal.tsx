// components/OfferModal.tsx

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Modal from "./Modal";

interface OfferModalProps {
    visible: boolean;
    onClose: () => void;
    onProceed: () => void;

    title: string;
    description: string;
    image: any;

    buttonText: string;
    buttonColor?: string;

    iconName: keyof typeof Ionicons.glyphMap;
    iconColor?: string;

    showGuide?: boolean;
    footerText?: string;
}

const OfferModal = ({
    visible,
    onClose,
    onProceed,
    title,
    description,
    buttonText,
    buttonColor = "#14532D",
    iconName,
    iconColor = "#14532D",
    showGuide = false,
    footerText,
    image
}: OfferModalProps) => {

    return (
        <Modal
            visible={visible}
            onClose={onClose}
        >

            <View className="flex-1 px-5 pt-20">

                {/* Icon */}
                    <View
                        className="w-90 h-90 rounded-full items-center justify-center"
                    >
                        <Image
                            source={image}
                            style={{ width: 140, height: 140 }}
                            resizeMode="contain"
                        />
                    </View>

                {/* Title */}
                <Text className="text-2xl font-semibold text-center mb-2">
                    {title}
                </Text>

                {/* Description */}
                <Text className="text-center text-gray-600 mb-6 px-2">
                    {description}
                </Text>

                {/* Guide */}
                {showGuide && (
                    <>
                        <Text className="text-lg font-semibold mb-4">
                            Submission guide
                        </Text>

                        {/* Step 1 */}
                        <View className="flex-row gap-3 mb-5">
                            <Ionicons
                                name="sparkles-outline"
                                size={20}
                                color="black"
                            />

                            <View className="flex-1">
                                <Text className="font-semibold mb-1">
                                    Gather original document
                                </Text>

                                <Text className="text-gray-600 text-sm">
                                    Collect the Title Deed, latest Tax Clearance,
                                    and certified ID copies.
                                </Text>
                            </View>
                        </View>

                        {/* Step 2 */}
                        <View className="flex-row gap-3 mb-5">
                            <Ionicons
                                name="paper-plane-outline"
                                size={20}
                                color="black"
                            />

                            <View className="flex-1">
                                <Text className="font-semibold mb-1">
                                    Send / Courier to branch close to you
                                </Text>

                                <Text className="text-gray-600 text-sm">
                                    Use the nearest branch of Pineleaf Estate
                                    close to you
                                </Text>
                            </View>
                        </View>

                        {/* Step 3 */}
                        <View className="flex-row gap-3 mb-10">
                            <Ionicons
                                name="time-outline"
                                size={20}
                                color="black"
                            />

                            <View className="flex-1">
                                <Text className="font-semibold mb-1">
                                    Track in vault
                                </Text>

                                <Text className="text-gray-600 text-sm">
                                    Upload document online while we wait for
                                    the physical document
                                </Text>
                            </View>
                        </View>
                    </>
                )}

                {/* Button */}
                <TouchableOpacity
                    onPress={onProceed}
                    style={{
                        backgroundColor: buttonColor,
                    }}
                    className="py-4 rounded-xl items-center"
                >
                    <Text className="text-white font-semibold text-lg">
                        {buttonText}
                    </Text>
                </TouchableOpacity>

                {/* Footer */}
                {footerText && (
                    <Text className="text-center text-gray-500 mt-4">
                        {footerText}
                    </Text>
                )}

            </View>

        </Modal>
    );
};

export default OfferModal;