import axios from "axios";
import api from "../api";
import { type ICourse } from "@/types/ICourse";
import type { IDepartment } from "@/types/IFaculty";
import type { IFaculty } from "@/types/IFaculty";
import { cache } from "react";
import type { ErrorResponse, SuccessResponse } from "@/types/IResponse";
import type { IResultsForm } from "@/types/IResultsForm";

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
  department_ids: number[];
  session: string;
}): Promise<CreateCourseResponse | string> => {
  try {
    const response = await api.post<CreateCourseResponse>(
      "/api/admin/courses",
      data,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create course.";
    }
    return "Something went wrong.";
  }
};

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

interface CreateFacultyResponse {
  message: string;
  data: IFaculty;
}

export const CreateFaculty = async (
  name: string,
  abbrev: string,
): Promise<CreateFacultyResponse | string> => {
  try {
    const response = await api.post<CreateFacultyResponse>(
      "/api/admin/faculties",
      { name, abbrev },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Failed to create faculty.";
    }
    return "Something went wrong.";
  }
};

export const DeleteCourse = async (
  courseId: number,
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.delete<SuccessResponse>(
      `/api/admin/courses/${courseId}`,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data as ErrorResponse;
    }
    return { message: "Something went wrong." };
  }
};

export const GetFaculties = cache(async (): Promise<IFaculty[] | string> => {
  try {
    const response = await api.get<IFaculty[]>("/api/faculties");
    console.log("GetFaculties raw response:", response.data);
    return response.data || [];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Failed to fetch faculties.";
      console.error("GetFaculties error:", message, err.response?.data);
      return message;
    }
    console.error("GetFaculties unexpected error:", err);
    return "Something went wrong.";
  }
});

export const PostResults = async (
  data: IResultsForm,
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.post<SuccessResponse>(
      "/api/admin/results/store",
      data,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data as ErrorResponse;
    }
    return { message: "Something went wrong.", errors: {} };
  }
};
