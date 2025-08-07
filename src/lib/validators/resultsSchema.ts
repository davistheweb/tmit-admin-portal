import z from "zod";

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
      }),
    )
    .min(1, "At least one result is required"),
});

export type ResultsForm = z.infer<typeof resultsSchema>;
