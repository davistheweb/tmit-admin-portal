import api from "../api";
import axios from "axios";
import type { IStaffDetailsResponse } from "@/types/IStaff";
import type { IStaffListResponse } from "@/types/IStaff";

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

export const getStaffs = async (): Promise<IStaffListResponse | string> => {
  try {
    const res = await api.get<IStaffListResponse>("/api/admin/staff/all");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "Failed to fetch staffs";
    }
    return "Something went wrong";
  }
};
