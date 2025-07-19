import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios-server";

export interface Profile {
  user_type: 1 | 2;
  username: string;
}

export function getProfile(config?: AxiosRequestConfig) {
  return axiosInstance.get<Profile>("/profile", {
    withCredentials: true,
    ...config,
  });
}
