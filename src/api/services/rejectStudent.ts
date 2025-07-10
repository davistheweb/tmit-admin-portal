import api from "../api";
import axios from "axios";

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
