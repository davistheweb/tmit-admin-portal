import axios from "axios";
import api from "../api";
import { type ICourse } from "@/types/ICourse";

interface CreateCourseResponse {
  message: string;
  course: ICourse;
}

export const CreateCourse = async (data: {
  code: string;
  title: string;
  unit: number;
  level: number;
  semester: string;
  department_id: number;
  session: string;
}): Promise<CreateCourseResponse | string> => {
  try {
    const response = await api.post<CreateCourseResponse>(
      "/api/admin/courses",
      data
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create course.";
    }
    return "Something went wrong.";
  }
};
