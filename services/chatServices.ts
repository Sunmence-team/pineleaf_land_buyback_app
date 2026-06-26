import api from "@/helpers/axios";

export interface ChatMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  is_read: number;
  time: string;
  created_at: string;
  is_sender: boolean;
}

export interface ChatDayGroup {
  day: string;
  messages: ChatMessage[];
}

export interface FetchChatMessagesResponse {
  message: string;
  data: ChatDayGroup[];
}

export interface SendMessageResponse {
  message: string;
  data?: ChatMessage;
}

export const chatServices = {
  getMessages: async (): Promise<FetchChatMessagesResponse> => {
    const response = await api.get<FetchChatMessagesResponse>("/chat/messages");
    return response.data;
  },

  sendMessage: async (message: string): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>("/chat/messages", { message });
    return response.data;
  },
};
