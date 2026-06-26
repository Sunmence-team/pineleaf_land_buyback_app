import { AppText } from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatServices, ChatMessage } from "@/services/chatServices";

export default function LiveChatScreen() {
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const queryClient = useQueryClient();

  const [refetchInterval, setRefetchInterval] = useState<number | false>(3000);

  const { data: chatResponse, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["chatMessages"],
    queryFn: chatServices.getMessages,
    refetchInterval: refetchInterval,
  });

  const handleRefresh = async () => {
    await refetch();
  };

  const sendMessageMutation = useMutation({
    mutationFn: chatServices.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
    },
  });

  const flattenedMessages = chatResponse?.data?.flatMap((group) =>
    group.messages.map((msg) => ({
      ...msg,
      day: group.day,
    }))
  ) || [];

  useEffect(() => {
    if (flattenedMessages.length === 0) {
      setRefetchInterval(3000);
      return;
    }

    const lastMessage = flattenedMessages[flattenedMessages.length - 1];
    if (!lastMessage || !lastMessage.created_at) {
      setRefetchInterval(3000);
      return;
    }

    const lastMsgTime = new Date(lastMessage.created_at).getTime();
    const now = new Date().getTime();
    const diffInMinutes = (now - lastMsgTime) / (1000 * 60);

    if (diffInMinutes <= 30) {
      setRefetchInterval(3000);
    } else {
      setRefetchInterval(false); // Stop polling if older than 30 minutes
    }
  }, [flattenedMessages]);

  useEffect(() => {
    if (flattenedMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [flattenedMessages.length]);

  const handleSend = () => {
    if (!inputText.trim() || sendMessageMutation.isPending) return;

    const messageText = inputText.trim();
    setInputText("");

    sendMessageMutation.mutate(messageText);
  };

  const renderItem = ({ item, index }: { item: ChatMessage & { day: string }; index: number }) => {
    const isUser = item.is_sender;
    const showDayHeader = index === 0 || flattenedMessages[index - 1].day !== item.day;

    return (
      <View>
        {showDayHeader && (
          <View className="items-center my-4">
            <View className="bg-gray-200/60 px-3 py-1 rounded-full">
              <AppText className="text-[11px] text-gray-600 font-quickSemiBold">
                {item.day}
              </AppText>
            </View>
          </View>
        )}
        <View
          className={`flex-row mb-4 ${isUser ? "justify-end" : "justify-start"}`}
        >
          {!isUser && (
            <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center mr-2 mt-1 border border-primary/20">
              <Ionicons name="chatbubble-ellipses" size={16} color="#154A22" />
            </View>
          )}
          <View
            style={[
              styles.bubble,
              isUser ? styles.userBubble : styles.agentBubble,
            ]}
            className="max-w-[75%] rounded-2xl px-4 py-3"
          >
            <AppText
              className={`text-sm ${isUser ? "text-white" : "text-gray-900"}`}
              style={{ fontFamily: isUser ? "quickMedium" : "quickRegular" }}
            >
              {item.message}
            </AppText>
            <AppText
              className={`text-[9px] mt-1.5 text-right ${isUser ? "text-white/60" : "text-gray-400"}`}
            >
              {item.time}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading && flattenedMessages.length === 0) {
    return (
      <View style={styles.container} className="items-center justify-center bg-[#F4F6F1]">
        <ActivityIndicator size="large" color="#154A22" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 60}
        className="flex-1"
      >
        <View className="justify-between bg-secondary flex-row py-2">
          {/* Agent Info Header */}
          <View className="w-10 h-10 ml-4" />
          <View className="flex-row items-center justify-between px-5 py-3 bg-primary/20 rounded-xl">
            <View className="flex-row items-center gap-3">
              <View className="relative w-10 h-10 rounded-full bg-primary/10 items-center justify-center border border-primary/20">
                <Ionicons name="person" size={20} color="#154A22" />
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </View>
              <View>
                <AppText className="text-sm font-quickBold text-gray-900">
                  Pineleaf Support
                </AppText>
                <AppText className="text-[11px] text-green-600 font-semibold">
                  Online & ready to assist
                </AppText>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleRefresh}
            disabled={isRefetching}
            className="w-10 h-10 rounded-full items-center justify-center bg-primary/10 mr-4 self-center active:opacity-75"
          >
            {isRefetching ? (
              <ActivityIndicator size="small" color="#154A22" />
            ) : (
              <Ionicons name="refresh" size={20} color="#154A22" />
            )}
          </TouchableOpacity>

        </View>

        {/* Message List */}
        <FlatList
          ref={flatListRef}
          data={flattenedMessages as any}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem as any}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-[#F4F6F1]"
        />

        {/* Input Bar */}
        <View className="flex-row items-center px-4 pt-3 pb-8 bg-white border-t border-gray-100">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 bg-[#F9FAF7] rounded-xl border border-gray-200 px-4 py-3 text-sm text-black max-h-[100px] font-quickRegular"
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || sendMessageMutation.isPending}
            className={`w-11 h-11 rounded-full items-center justify-center ml-3 ${
              inputText.trim() && !sendMessageMutation.isPending ? "bg-primary" : "bg-gray-200"
            }`}
          >
            {sendMessageMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons
                name="send"
                size={18}
                color={inputText.trim() ? "#fff" : "#9CA3AF"}
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bubble: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: "#154A22",
    borderTopRightRadius: 2,
  },
  agentBubble: {
    backgroundColor: "white",
    borderTopLeftRadius: 2,
  },
});
