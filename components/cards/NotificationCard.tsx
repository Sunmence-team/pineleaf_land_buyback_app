import { getDateDifference } from "@/helpers/formatterUtility";
import { NotificationType } from "@/lib/interfaces";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { useState } from "react";
import Modal from "../modal/Modal";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsReadService } from "@/services/notificationServices";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import ActionButton from "../buttons/ActionButton";

type NotificationCardProps = {
  item: NotificationType;
};

const NotificationCard = ({ item }: NotificationCardProps) => {
  const isUnread = !item.read_at;
  const timeAgo = item.created_at ? getDateDifference(item.created_at, new Date().toISOString()) : "";

  const [openAlertInfoModal, setOpenAlertInfoModal] = useState<NotificationType | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => markNotificationAsReadService(item.id),
    onSuccess: () => {
        showSuccessToast("Notification marked as read")
        setOpenAlertInfoModal(null);
        queryClient.invalidateQueries({ queryKey: ["userNotifications"] });
    },
    onError: (err: any) => {
        let errMessage = err.response?.data?.message || err.message || "Failed to mark as read";
        showErrorToast(errMessage)
    },
  });

  return (
    <>
      <TouchableOpacity onPress={() => setOpenAlertInfoModal(item)} style={styles.notificationCard}>
        <View className="flex-row w-full items-center gap-2">
          <View className="flex-1 flex-row items-start">
            <AppText style={styles.title} numberOfLines={1}>{item.title}</AppText>
            <AppText numberOfLines={1} style={styles.time}>{timeAgo} ago</AppText>
          </View>
          {isUnread && <View style={styles.unreadIndicator} />}
        </View>
        <AppText numberOfLines={2} style={styles.message}>{item.message}</AppText>
      </TouchableOpacity>

      {openAlertInfoModal && (
        <Modal visible={true} customMode onClose={() => setOpenAlertInfoModal(null)}>
          <View className="flex-1 bg-black/40 justify-end">
            <View style={styles.container}>
                <View className="items-center w-full">
                    <View className="rounded-full bg-fadedGreen items-center justify-center mb-6" style={{ width: 50, height: 50 }}>
                        <Ionicons name="notifications-outline" size={32} color="#154A22" />
                    </View>
                    
                    <AppText style={{ fontFamily: "quickSemiBold" }} className="text-2xl text-black text-center mb-2">
                        {openAlertInfoModal.title}
                    </AppText>
                    
                    <AppText className="text-gray-500 text-sm text-center mb-2">
                        {timeAgo} ago
                    </AppText>
                    
                    <AppText className="text-gray-700 text-base text-center leading-6">
                        {openAlertInfoModal.message}
                    </AppText>
                </View>

                <View className="flex-col gap-4 mt-4">
                    {isUnread && (
                        <ActionButton 
                            name={"Mark as Read"}
                            loading={isPending}
                            disabled={isPending}
                            action={() => mutate()}
                        />
                    )}
                    <ActionButton 
                        name={"Close"}
                        hasBG={false}
                        disabled={isPending}
                        action={() => setOpenAlertInfoModal(null)}
                        optStyle={{
                            backgroundColor: "#F4F6F1"
                        }}
                    />
                </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: "white"
    },
    notificationCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#ECECEC",
        borderRadius: 13,
        padding: 14,
        gap: 4,
    },
    title: {
        fontFamily: "quickSemiBold",
        flex: 1,
        color: "#000",
        fontSize: Platform.select({
        ios: 18,
        android: 14,
        }),
    },
    time: {
        color: "black",
        fontSize: Platform.select({
        ios: 15,
        android: 15,
        }),
    },
    message: {
        fontSize: 14,
        color: "black",
        lineHeight: 22,
        marginTop: 2,
    },
    unreadIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#00A428",
    },
});

export default NotificationCard;