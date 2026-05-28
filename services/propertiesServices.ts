import api from "@/helpers/axios";

/**
 * example usage in destination comp
 *
 * useQuery({
 *   queryKey: ["properties"],
 *   queryFn: getProperties,
 *  })
 */
export const getPropertiesService = async () => {
  const res = await api.get("/properties");
  return res.data;
};

export const searchPropertiesService = async (
  name: string,
  page = 1,
  perPage = 50,
) => {
  const res = await api.get(
    "https://laravel.pineleafesates.com.ng/api/properties/search",
    {
      params: { name, page, per_page: perPage },
    },
  );
  return res.data;
};
