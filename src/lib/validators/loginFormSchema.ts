import { z } from "zod";

export const loginFormSchema = z.object({
  regNum: z.string().nonempty("Username is required!"),
  password: z.string().nonempty("Password is required"),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
