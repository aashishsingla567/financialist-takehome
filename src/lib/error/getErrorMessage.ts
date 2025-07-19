import { AxiosError } from "axios";

export default function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
