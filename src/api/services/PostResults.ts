import axios from "axios";
import api from "../api";
import type { ErrorResponse, SuccessResponse } from "@/types/IResponse";
import type { IResultsForm } from "@/types/IResultsForm";



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
