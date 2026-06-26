import { AppText } from "@/components/AppText";
import Modal from "@/components/modal/Modal";
import { globals } from "@/lib/constants";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ContactScreen = () => {
  const [confirmModal, setConfirmModal] = useState<{
    visible: boolean;
    type: "phone" | "email" | null;
    title: string;
    message: string;
    confirmText: string;
    value: string;
  }>({
    visible: false,
    type: null,
    title: "",
    message: "",
    confirmText: "",
    value: "",
  });

  const handlePhonePress = () => {
    setConfirmModal({
      visible: true,
      type: "phone",
      title: "Call Support",
      message: "Are you sure you want to call Pineleaf support?",
      confirmText: "Call Now",
      value: globals.contactInfos.phone,
    });
  };

  const handleEmailPress = () => {
    setConfirmModal({
      visible: true,
      type: "email",
      title: "Email Support",
      message: "Are you sure you want to email Pineleaf support?",
      confirmText: "Compose Email",
      value: globals.contactInfos.email,
    });
  };

  const executeConfirmAction = () => {
    if (confirmModal.type === "phone") {
      Linking.openURL(`tel:${confirmModal.value}`);
    } else if (confirmModal.type === "email") {
      Linking.openURL(`mailto:${confirmModal.value}`);
    }
    setConfirmModal((prev) => ({ ...prev, visible: false }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <AppText style={styles.heading}>Need help?</AppText>

        <AppText style={styles.description}>
          If you have any questions about your buyback process or document
          submission, our support team is here to help.
        </AppText>

        <View style={styles.innerCard}>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={handlePhonePress}
            style={styles.item}
            className="flex-row justify-between items-start border-b border-gray-100 pb-4 mb-4"
          >
            <View className="flex-row flex-1 gap-2 items-start">
              <Ionicons
                name="call-outline"
                size={20}
                className="mt-1"
                color="#154A22"
              />
              <View style={{ flex: 1 }}>
                <AppText style={styles.title}>Call Support</AppText>
                <AppText
                  style={styles.subText}
                  className="text-primary font-quickSemiBold"
                >
                  {globals.contactInfos.phone}
                </AppText>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#9CA3AF"
              className="mt-1"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.65}
            onPress={handleEmailPress}
            style={styles.item}
            className="flex-row justify-between items-start border-b border-gray-100 pb-4 mb-4"
          >
            <View className="flex-row flex-1 gap-2 items-start">
              <Ionicons
                name="mail-outline"
                size={20}
                className="mt-1"
                color="#154A22"
              />
              <View style={{ flex: 1 }}>
                <AppText style={styles.title}>Email Support</AppText>
                <AppText style={styles.subText}>
                  Send us your questions and we’ll respond as soon as possible.
                </AppText>
                <AppText
                  style={styles.email}
                  className="text-primary font-quickSemiBold"
                >
                  {globals.contactInfos.email}
                </AppText>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#9CA3AF"
              className="mt-1"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() =>
              router.push("/profile/supporttabs/contacttabs/liveChatScreen" as any)
            }
            style={styles.item}
            className="flex-row justify-between items-start"
          >
            <View className="flex-row flex-1 gap-2 items-start">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                className="mt-1"
                color="#154A22"
              />
              <View style={{ flex: 1 }}>
                <AppText style={styles.title}>Live Chat</AppText>
                <AppText style={styles.subText}>
                  Get quick answers and real-time assistance.
                </AppText>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#9CA3AF"
              className="mt-1"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={confirmModal.visible}
        customMode
        onClose={() => setConfirmModal((prev) => ({ ...prev, visible: false }))}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() =>
            setConfirmModal((prev) => ({ ...prev, visible: false }))
          }
        >
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="items-center mt-4 mb-8">
              <View className="w-16 h-16 rounded-full bg-[#154A22]/10 items-center justify-center mb-4">
                <Ionicons
                  name={confirmModal.type === "phone" ? "call" : "mail"}
                  size={30}
                  color="#154A22"
                />
              </View>
              <AppText className="text-xl font-quickBold text-gray-900 text-center mb-2">
                {confirmModal.title}
              </AppText>
              <AppText className="text-base font-quickMedium text-gray-500 text-center px-4">
                {confirmModal.message}
              </AppText>
              <AppText className="text-base font-quickSemiBold text-primary">
                {confirmModal.value}
              </AppText>
            </View>

            <View className="gap-3">
              <TouchableOpacity
                onPress={executeConfirmAction}
                className="bg-primary py-4 rounded-xl items-center"
              >
                <AppText className="text-white font-quickBold text-base">
                  {confirmModal.confirmText}
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setConfirmModal((prev) => ({ ...prev, visible: false }))
                }
                className="bg-gray-100 py-4 rounded-xl items-center"
              >
                <AppText className="text-gray-700 font-quickBold text-base">
                  Cancel
                </AppText>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#F4F6F1",
  },
  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  thirdContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  heading: {
    fontSize: 18,
    marginBottom: 8,
    color: "#111",
    fontFamily: "quickSemiBold",
  },

  description: {
    fontFamily: "quickMedium",
    fontSize: Platform.select({
      ios: 20,
      android: 16,
    }),
    color: "black",
    lineHeight: Platform.select({
      ios: 27,
      android: 23,
    }),
  },

  innerCard: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginTop: 25,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: "#111",
    marginBottom: 4,
    fontFamily: "quickSemiBold",
  },

  subText: {
    fontSize: Platform.select({
      ios: 19,
      android: 15,
    }),
    color: "#555555",
    lineHeight: Platform.select({
      ios: 27,
      android: 20,
    }),
  },

  email: {
    color: "#111",
    marginTop: 4,
    fontSize: Platform.select({
      ios: 16,
      android: 12,
    }),
    lineHeight: Platform.select({
      ios: 27,
      android: 20,
    }),
    fontFamily: "quickSemiBold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
});
