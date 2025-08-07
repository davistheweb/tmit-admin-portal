import axios from "axios";
import api from "../api";
import type { ErrorResponse, SuccessResponse } from "@/types/IResponse";

export const DeleteCourse = async (
  courseId: number
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await api.delete<SuccessResponse>(
      `/api/admin/courses/${courseId}`
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data as ErrorResponse;
    }
    return { message: "Something went wrong." };
  }
};
