import api from "@/helpers/axios";

export const getUserNotificationsService = async (params: any) => {
  const res = await api.get("/notifications", { params });
  return res.data;
};

export const markNotificationAsReadService = async (id: string | number) => {
  const response = await api.patch(`/notifications/mark/${id}`);
  return response.data;
};
