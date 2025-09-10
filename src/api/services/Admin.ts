import axios from "axios";
import api from "../api";
import { type LoginFormSchema } from "@/auth/_components/LoginForm";

export const LoginAdmin = async (data: LoginFormSchema): Promise<unknown> => {
  const { email, password } = data;
  try {
    const response = await api.post("/api/admin/login", { email, password });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.message || "Login failed. Something went wrong.";
      return msg;
    } else {
      return "Something went wrong.";
    }
  }
};

export const logoutAdmin = async (): Promise<string> => {
  try {
    const response = await api.post("/api/admin/logout");
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Logout failed");
    } else {
      throw new Error("Something went wrong during logout");
    }
  }
};
