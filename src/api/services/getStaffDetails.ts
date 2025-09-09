import type { IStaffDetailsResponse } from "@/types/IStaff";
import api from "../api";
import axios from "axios";

export const getStaffDetails = async (
  id: string | number | undefined,
): Promise<IStaffDetailsResponse | string> => {
  try {
    const res = await api.get<IStaffDetailsResponse>(`/api/admin/staff/${id}`);
    return res.data;
  } catch (error) {
    console.log("ax error", error);

    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") return "ERR_NETWORK";
      return error.response?.data?.message || "Failed to fetch staffs";
    }
    return "Something went wrong";
  }
};
