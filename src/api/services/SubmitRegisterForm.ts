// import axios from "axios";
// import { toast } from "sonner";
// import api from "../api";
// import { type RegisterFormSchema } from "@/auth/_components/RegisterForm";

// export const SubmitRegisterForm = async (
//   data: RegisterFormSchema,
// ): Promise<void> => {
//   const { regNum, name, email, password } = data;
//   try {
//     const response = await api.post("/register", {
//       reg_number: regNum,
//       name,
//       email,
//       password,
//     });
//     if (response.status === 201) toast.success(`${response.data.message}`);
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       console.log(err);
//       const msg =
//         err.response?.data?.message ||
//         "Registration failed., Something went wrong";
//       toast.error(msg);
//       console.log(msg);
//     } else {
//       toast.error("Something went wrong.");
//     }
//   }
// };
