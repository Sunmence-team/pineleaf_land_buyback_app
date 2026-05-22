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
