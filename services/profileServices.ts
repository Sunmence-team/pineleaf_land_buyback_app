import api from "@/helpers/axios";

export const getBanksService = async (search?: string) => {
  const params: Record<string, string> = {};
  if (search && search.trim() !== "") {
    params.search = search;
  }
  const response = await api.get("/auth/banks", { params });
  return response.data;
};

export const resolveBankAccountService = async (data: {
  account_number: string;
  bank_code: string;
}) => {
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
