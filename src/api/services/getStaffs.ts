import type { IStaffListResponse } from "@/types/IStaff";
import api from "../api";
import axios from "axios";

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
