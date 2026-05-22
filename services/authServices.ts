import api from "@/helpers/axios";

/**
 * Auth services for registration, login, and verification.
 */

export const loginService = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerService = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const sendEmailVerificationCodeService = async (data: { email: string }) => {
  const res = await api.post("/auth/register/resend", data);
  return res.data;
};

export const verificationEmailService = async (data: { email: string, code: string }) => {
  const res = await api.post("/auth/register/verify", data);
  return res.data;
};
