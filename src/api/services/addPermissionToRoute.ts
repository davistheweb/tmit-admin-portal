import axios from "axios";
import api from "../api";

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
