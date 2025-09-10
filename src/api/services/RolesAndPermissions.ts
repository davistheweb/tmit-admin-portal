import { cache } from "react";
import axios from "axios";
import api from "../api";
import type { ICreateRoleResponse } from "@/types/IRolesAndPermissions";
import type { ICreatePermissionsResponse } from "@/types/IRolesAndPermissions";
import type { IRole } from "@/types/IRolesAndPermissions";
import type { IPermissions } from "@/types/IRolesAndPermissions";

export const CreateRoles = async (
  name: string,
  description: string,
): Promise<ICreateRoleResponse | string> => {
  try {
    const response = await api.post<ICreateRoleResponse>("/api/admin/roles", {
      name,
      description,
    });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create Roles.";
    }
    return "Something went wrong.";
  }
};

export const CreatePermissions = async (
  name: string,
  description: string,
): Promise<ICreatePermissionsResponse | string> => {
  try {
    const response = await api.post<ICreatePermissionsResponse>(
      "/api/admin/permissions",
      { name, description },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create permission.";
    }
    return "Something went wrong.";
  }
};

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
