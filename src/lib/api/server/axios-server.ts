import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

import { cookies } from "next/headers";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // to include cookies when making requests from server side components
      const cookieStore = await cookies();
      const cookieHeader = cookieStore?.toString();

      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      if (cookieHeader) {
        config.headers.set("Cookie", cookieHeader);
      }

      return config;
    }
  );

  return instance;
};

const instance = createAxiosInstance();

export default instance;
