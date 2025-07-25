import api from "../api";
import axios from "axios";

export interface DashboardTotals {
  students: number;
  approved: number;
  pending: number;
  admins: number;
  faculties: number;
  departments: number;
}

export interface DashboardResponse {
  totals: DashboardTotals;
  students_per_department: any[];
  recent_students: any[];
}

export const getDashboardAnalytics = async (): Promise<
  DashboardResponse | string
> => {
  try {
    const res = await api.get<DashboardResponse>("/api/admin/dashboard");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "Failed to fetch dashboard data";
    }
    return "Something went wrong";
  }
};
