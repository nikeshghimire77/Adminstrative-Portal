import { axiosInstance as axios } from "./axiosInstance";
export const ApiService = {
  post
};
function post(uri, data) {
  return async (uri, data) => {
    try {
      const { data: response } = await axios({
        url: uri,
        method: "POST",
        data
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
}
