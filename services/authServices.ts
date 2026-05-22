/**
 * example usage in destination comp
 *
 * useQuery({
 *   queryKey: ["keyIdentifier"],
 *   queryFn: funcCall,
 *  })
 */

export const loginService = async () => {
  const res = await api.get("/auth/login");
  return res.data;
};

export const sendEmailVerificationCodeService = async () => {
  const res = await api.get("/auth/register/resend");
  return res.data;
};

export const verificationEmailService = async () => {
  const res = await api.get("/auth/register/verify");
  return res.data;
};

export const registerService = async () => {
  const res = await api.get("/auth/register");
  return res.data;
};
