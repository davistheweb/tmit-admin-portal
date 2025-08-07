import axios from "axios";
import api from "../api";

export interface ResultsForm {
  reg_number: string;
  session: string;
  semester: string;
  results: { course_code: string; score: number }[];
}

interface SuccessResponse {
  message: string;
}

interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export const PostResults = async (
  data: ResultsForm,
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
