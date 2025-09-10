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

export const departmentFormSchema = z.object({
  name: z.string().nonempty("Department name is required!"),
  code: z.string().nonempty("Department code is required!"),
});
export type DepartmentFormSchema = z.infer<typeof departmentFormSchema>;

export const facultyFormSchema = z.object({
  name: z.string().nonempty("Faculty name is required!"),
  abbrev: z.string().nonempty("Faculty code is required!"),
});
export type FacultyFormSchema = z.infer<typeof facultyFormSchema>;

export const resultsSchema = z.object({
  reg_number: z.string().nonempty("Registration number is required"),
  session: z.string().nonempty("Session is required"),
  semester: z.string().nonempty("Semester is required"),
  results: z
    .array(
      z.object({
        course_code: z.string().nonempty("Course code is required"),
        score: z
          .number({
            required_error: "Score is required",
            invalid_type_error: "Score must be a number",
          })
          .min(0, "Score must be at least 0")
          .max(100, "Score cannot exceed 100"),
      })
    )
    .min(1, "At least one result is required"),
});

export type ResultsForm = z.infer<typeof resultsSchema>;
