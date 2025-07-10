import axios from "axios";
import api from "../api";

export const logoutAdmin = async (): Promise<string> => {
  try {
    const response = await api.post("/api/admin/logout");
    return response.data.message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Logout failed");
    } else {
      throw new Error("Something went wrong during logout");
    }
  }
};
