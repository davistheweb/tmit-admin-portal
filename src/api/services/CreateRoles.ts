import axios from "axios";
import api from "../api";
import type { ICreateRoleResponse } from "@/types/IRolesAndPermissions";

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
