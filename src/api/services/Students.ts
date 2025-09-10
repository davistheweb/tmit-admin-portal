import api from "../api";
import axios from "axios";
import type { IPendingStudent } from "@/types/IPendingStudent";

export const GetPendingStudents = async (): Promise<
  IPendingStudent[] | string
> => {
  try {
    const response = await api.get<IPendingStudent[]>(
      "/api/admin/students/pending",
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.message || "Failed to fetch pending students.";
      return msg;
    } else {
      return "Something went wrong.";
    }
  }
};

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

export const approveStudent = async (id: number) => {
  try {
    const res = await api.post(`/api/admin/students/${id}/approve`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Approval failed");
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const rejectStudent = async (id: number) => {
  try {
    const res = await api.post(`/api/admin/students/${id}/reject`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Rejection failed");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
