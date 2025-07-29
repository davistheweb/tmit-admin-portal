import axios from "axios";
import api from "../api";
import type { IFaculty } from "@/types/IFaculty";

interface CreateFacultyResponse {
  message: string;
  data: IFaculty;
}

export const CreateFaculty = async (
  name: string,
): Promise<CreateFacultyResponse | string> => {
  try {
    const response = await api.post<CreateFacultyResponse>(
      "/api/admin/faculties",
      { name },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create faculty.";
    }
    return "Something went wrong.";
  }
};
