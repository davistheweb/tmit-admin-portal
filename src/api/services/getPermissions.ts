import axios from "axios";
import api from "../api";
import { cache } from "react";
import type { IPermissions } from "@/types/IRolesAndPermissions";

export const GetPermissions = cache(async (): Promise<IPermissions[]> => {
  try {
    const response = await api.get<IPermissions[]>("/api/admin/permissions");
    console.log("GetPermissions raw response:", response.data);
    return response.data || [];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Failed to fetch permissions.";
      console.error("GetPermissions error:", message, err.response?.data);
      throw new Error(message);
    }
    console.error("GetPermissions unexpected error:", err);
    throw new Error("Something went wrong");
  }
});
