import { cache } from "react";
import axios from "axios";
import api from "../api";
import type { IRoutes } from "@/types/IAccessControl";

export const addPermissionToRoute = async (
  route_name: string,
  permission_id: number,
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      "/api/admin/route-permissions/store",
      { route_name, permission_id },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to Add Permisson to route";
    }
    return { message: "Something went wrong." };
  }
};

export const assignRolesToPermissionService = async (
  permission_id: number,
  role_id: number,
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      "/api/admin/permissions/assign",
      { permission_id, role_id },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return (
        err.response?.data?.message || "Failed to Assig permission to role"
      );
    }
    return { message: "Something went wrong." };
  }
};

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
