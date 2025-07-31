import axios from "axios";
import api from "../api";
import type { IFaculty } from "@/types/IFaculty";
import { cache } from "react";

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
