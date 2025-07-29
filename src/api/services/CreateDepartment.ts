import axios from "axios";
import api from "../api";
import type { IDepartment } from "@/types/IFaculty";

interface CreateDepartmentResponse {
  message: string;
  data: IDepartment;
}

export const CreateDepartment = async (data: {
  name: string;
  code: string;
  faculty_id: string;
}): Promise<CreateDepartmentResponse | string> => {
  try {
    const response = await api.post<CreateDepartmentResponse>(
      "/api/admin/departments",
      data,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create department.";
    }
    return "Something went wrong.";
  }
};
