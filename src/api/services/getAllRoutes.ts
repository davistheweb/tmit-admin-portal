import axios from "axios";
import api from "../api";
import { cache } from "react";
import type { IRoutes } from "@/types/IAccessControl";

export const GetAllRoutes = cache(async (): Promise<IRoutes> => {
  try {
    const response = await api.get<IRoutes>("/api/admin/route/list");
    console.log("GetRoutes raw response:", response.data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Failed to fetch permissions.";
      console.error("GetRoutes error:", message, err.response?.data);
      throw new Error(message);
    }
    console.error("GetRoutes unexpected error:", err);
    throw new Error("Something went wrong");
  }
});
