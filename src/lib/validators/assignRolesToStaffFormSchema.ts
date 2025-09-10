import z from "zod";

export const assignRolesToStaffFormSchema = z.object({
  staff_id: z.coerce.number().min(1, { message: "Staff id is required!" }),
  role_id: z.coerce.number().min(1, { message: "Role id is required!" }),
});

export type assignRolesToStaffFormValues = z.infer<
  typeof assignRolesToStaffFormSchema
>;
