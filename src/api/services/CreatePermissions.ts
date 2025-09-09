import axios from "axios";
import api from "../api";
import type { ICreatePermissionsResponse } from "@/types/IRolesAndPermissions";

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
