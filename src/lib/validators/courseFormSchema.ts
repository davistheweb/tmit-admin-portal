import z from "zod";

export const courseFormSchema = z.object({
  code: z.string().nonempty("Course code is required!"),
  title: z.string().nonempty("Course title is required!"),
  unit: z.number().min(1, "Unit must be at least 1."),
  level: z.number().min(100, "Level must be at least 100.").multipleOf(100),
  semester: z.enum(["First", "Second"], {
    required_error: "Semester is required.",
  }),
  session: z.string().nonempty("Session is required!"),
});

export type CourseFormSchema = z.infer<typeof courseFormSchema>;
