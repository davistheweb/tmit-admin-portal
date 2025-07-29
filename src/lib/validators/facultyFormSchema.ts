import { z } from "zod";

export const facultyFormSchema = z.object({
  name: z.string().nonempty("Faculty name is required!"),
});
export type FacultyFormSchema = z.infer<typeof facultyFormSchema>;
