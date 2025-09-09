import axios from "axios";
import api from "../api";
import { cache } from "react";
import type { IRole } from "@/types/IRolesAndPermissions";

export const GetRoles = cache(async (): Promise<IRole[]> => {
  try {
    const response = await api.get<IRole[]>("/api/admin/roles");
    console.log("GetRoles raw response:", response.data);
    return response.data || [];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.message || "Failed to fetch roles.";
      console.error("GetRoles error:", message, err.response?.data);
      throw new Error(message);
    }
    console.error("GetRoles unexpected error:", err);
    throw new Error("Something went wrong.");
  }
});
