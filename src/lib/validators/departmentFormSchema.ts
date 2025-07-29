import { z } from "zod";

export const departmentFormSchema = z.object({
  name: z.string().nonempty("Department name is required!"),
  code: z.string().nonempty("Department code is required!"),
});
export type DepartmentFormSchema = z.infer<typeof departmentFormSchema>;
