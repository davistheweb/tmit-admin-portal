import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().nonempty("Empty is required!"),
  password: z.string().nonempty("Password is required!"),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
