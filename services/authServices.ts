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
  console.log("get user rep", response.data)
  return response.data;
};

export const forgotPasswordRequestService = async (data: { email: string }) => {
  const response = await api.post("/auth/password/forgot", data);
  return response.data;
};

export const forgotPasswordVerifyService = async (data: { email: string; code: string }) => {
  const response = await api.post("/auth/password/forgot/verify", data);
  return response.data;
};

export const forgotPasswordResetService = async (data: {
  email: string;
  reset_token: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.post("/auth/password/reset", data);
  return response.data;
};
