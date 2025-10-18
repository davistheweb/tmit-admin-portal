import { z } from "zod";

export const sessionSchema = z
  .object({
    name: z
      .string()
      .min(1, "Session name is required")
      .min(3, "Name must be at least 3 characters"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    is_active: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return new Date(data.start_date) < new Date(data.end_date);
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    },
  );

export type SessionFormData = z.infer<typeof sessionSchema>;

export interface Session extends SessionFormData {
  id: number;
  created_at?: string;
  updated_at?: string;
}
