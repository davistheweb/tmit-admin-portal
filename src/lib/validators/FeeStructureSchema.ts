import { z } from "zod";

export const feeStructureSchema = z
  .object({
    department_id: z.number().min(1, "Department is required"),
    session_id: z.number().min(1, "Session is required"),
    level: z
      .number()
      .min(100, "Level must be at least 100")
      .max(600, "Level must not exceed 600"),
    amount: z.number().min(0, "Amount must be positive"),
    installment_first: z
      .number()
      .min(0, "First installment must be positive")
      .optional(),
    installment_second: z
      .number()
      .min(0, "Second installment must be positive")
      .optional(),
    allow_installment: z.boolean(),
    description: z
      .string()
      .min(1, "Description is required")
      .max(255, "Description is too long"),
  })
  .refine(
    (data) => {
      if (
        data.allow_installment &&
        (!data.installment_first || !data.installment_second)
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Both installment amounts are required when installments are allowed",
      path: ["installment_first"],
    }
  )
  .refine(
    (data) => {
      if (
        data.allow_installment &&
        data.installment_first &&
        data.installment_second
      ) {
        return (
          Math.abs(
            data.installment_first + data.installment_second - data.amount
          ) < 0.01
        );
      }
      return true;
    },
    {
      message: "Sum of installments must equal the total amount",
      path: ["installment_second"],
    }
  );

export type FeeStructureFormData = z.infer<typeof feeStructureSchema>;

export interface Department {
  id: number;
  name: string;
  code: string;
  faculty_id: number;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeeStructure extends FeeStructureFormData {
  id: number;
  created_at: string;
  updated_at: string;
  department: Department;
  session: Session;
}

export interface PaginatedFeeStructures {
  current_page: number;
  data: FeeStructure[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
