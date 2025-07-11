import axios from "axios";
import api from "../api";
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
