import axios from "axios";
import api from "../api";

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
