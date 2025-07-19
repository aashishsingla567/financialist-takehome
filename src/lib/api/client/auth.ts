import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios-client";

export function postAuth(
  data: { username: string; password: string },
  config?: AxiosRequestConfig
) {
  return axiosInstance.post<{
    message: string;
  }>("/auth", data, config);
}

export function postLogout(config?: AxiosRequestConfig) {
  return axiosInstance.post<{
    message: string;
  }>("/auth/logout", config);
}
