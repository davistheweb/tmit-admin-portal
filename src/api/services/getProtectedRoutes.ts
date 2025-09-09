import axios from "axios";
import api from "../api";
import { cache } from "react";
import type { IProtectedRoutes } from "@/types/IAccessControl";

export const GetProtectedRoutes = cache(
  async (): Promise<IProtectedRoutes[]> => {
    try {
      const response = await api.get<IProtectedRoutes[]>(
        "/api/admin/route-protected",
      );
      console.log("GetProtectedRoutes raw response:", response.data);
      return response.data || [];
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Failed to fetch permissions.";
        console.error("GetProtectedRoutes", message, err.response?.data);
        throw new Error(message);
      }
      console.error("GetProtectedRoutes unexpected error:", err);
      throw new Error("Something went wrong");
    }
  },
);
