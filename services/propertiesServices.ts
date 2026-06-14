import api from "@/helpers/axios";

export const searchPropertiesService = async (
  name: string,
  page = 1,
  perPage = 40,
) => {
  const res = await api.get(
    "https://laravel.pineleafesates.com.ng/api/properties/search",
    {
      params: { name, page, per_page: perPage },
    },
  );

  let data = res.data;

  if (typeof data === "string") {
    const cleanData = data.replace(/^\uFEFF/, "").trim();
    if (!cleanData) {
      data = {};
    } else {
      try {
        const sanitized = cleanData.replace(
          /[\u0000-\u001F\u007F-\u009F]/g,
          (match) => {
            if (match === "\n") return "\\n";
            if (match === "\r") return "\\r";
            if (match === "\t") return "\\t";
            return (
              "\\u" + ("0000" + match.charCodeAt(0).toString(16)).slice(-4)
            );
          },
        );
        data = JSON.parse(sanitized);
      } catch (e) {
        if (
          cleanData.startsWith('"') &&
          cleanData.endsWith('"') &&
          cleanData.length > 2
        ) {
          try {
            const stripped = cleanData.slice(1, -1).replace(/\\"/g, '"');
            data = JSON.parse(stripped);
          } catch (innerErr) {
            console.warn(
              "Failed to parse clean JSON (stripped fallback):",
              innerErr,
            );
            data = {};
          }
        } else {
          console.warn("Failed to parse clean JSON string:", e);
          data = {};
        }
      }
    }
  }

  return data || {};
};

export const getUserPropertiesService = async (params: any) => {
  const res = await api.get("/user/properties", { params });
  return res.data;
};

export const getUserPropertiesMapCoordinatesService = async (params: any) => {
  const res = await api.get("/user/properties/map", { params });
  return res.data.data;
};

export const requestPropertyBuybackService = async (id: number) => {
  const response = await api.put(`/user/properties/${id}/request`);
  return response.data;
};

export const getPropertyDetailsService = async (id: number) => {
  const response = await api.get(`/user/properties/${id}`);
  return response.data.data;
};

export const uploadPropertyDocumentService = async (
  id: number,
  formData: FormData,
) => {
  const res = await api.post(`/user/properties/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const acceptPropertyOfferService = async (id: number, branch: string) => {
  const response = await api.put(`/user/properties/${id}/offer/accept`, { branch });
  return response.data;
};

export const declinePropertyOfferService = async (id: number) => {
  const response = await api.put(`/user/properties/${id}/offer/decline`);
  return response.data;
};

export const addPropertyService = async (formData: FormData) => {
  const response = await api.post("/user/properties", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
