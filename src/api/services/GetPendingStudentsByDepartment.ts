import axios from "axios";
import api from "../api";
import type { IPendingStudent } from "@/types/IPendingStudent";

export const GetPendingStudentsByDepartment = async (
  department: string,
): Promise<IPendingStudent[] | string> => {
  try {
    const response = await api.post<{
      pending_applications: IPendingStudent[];
    }>("/api/admin/students/pending-by-department", { department });
    return response.data.pending_applications;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return (
        err.response?.data?.message || "Failed to fetch pending by department."
      );
    }
    return "Something went wrong.";
  }
};
