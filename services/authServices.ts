import api from "@/helpers/axios";

/**
 * Auth services for registration, login, and verification.
 */

export const loginService = async (data: any) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutService = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const registerService = async (data: any) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const sendEmailVerificationCodeService = async (data: { email: string }) => {
  const response = await api.post("/auth/register/resend", data);
  return response.data;
};

export const verificationEmailService = async (data: { email: string, code: string }) => {
  const response = await api.post("/auth/register/verify", data);
  return response.data;
};

export const getUserService = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
