import axios from "axios";
// import { toast } from "sonner";
import api from "../api";
import { type LoginFormSchema } from "@/auth/_components/LoginForm";

// api/services/LoginAdmin.ts
export const LoginAdmin = async (data: LoginFormSchema): Promise<unknown> => {
  const { email, password } = data;
  try {
    const response = await api.post("/api/admin/login", { email, password });
    if (response.status === 200) {
      return response.data; // { message, token, admin }
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.message || "Login failed. Something went wrong.";
      return msg;
    } else {
      return "Something went wrong.";
    }
  }
};

/* 
message": "Login successful",
    "token": "11|ARS1ydk676eaHBpx3ZtDhz2kIMut1NvtpOevTofS89d5a8fa",
    "admin": {
        "id": 1,
        "name": "Administrator",
        "email": "admin@gmail.com" */
