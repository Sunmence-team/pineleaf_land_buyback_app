import api from "@/helpers/axios";

export const getBanksService = async (search?: string) => {
  const response = await api.get("/auth/banks", { params: { search } });
  return response.data;
};

export const resolveBankAccountService = async (data: { account_number: string; bank_code: string }) => {
  const response = await api.post("/auth/bank/resolve", data);
  return response.data;
};

export const updateBankAccountService = async (data: {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
}) => {
  const response = await api.put("/auth/bank/update", data);
  return response.data;
};

export const editprofileService = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const response = await api.put("/auth/profile/update", {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
  });
  return response.data;
};

