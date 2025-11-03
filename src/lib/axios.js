import axios from "axios";

export const publicApi = axios.create({
  baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com/api",
});

export const protectedApi = axios.create({
  baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com/api",
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return request;

  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    console.log(error);
    console.log(request);
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes("/users/refresh-token")
    ) {
      request._retry = true;
      try {
        const response = await protectedApi.post("/users/refresh-token", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return protectedApi(request);
      } catch (error) {
        localStorage.removeItemItem("accessToken");
        localStorage.removeItemtem("refreshToken");
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);
