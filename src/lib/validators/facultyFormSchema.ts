import { z } from "zod";

export const facultyFormSchema = z.object({
  name: z.string().nonempty("Faculty name is required!"),
  abbrev: z.string().nonempty("Faculty code is required!")
});
export type FacultyFormSchema = z.infer<typeof facultyFormSchema>;
