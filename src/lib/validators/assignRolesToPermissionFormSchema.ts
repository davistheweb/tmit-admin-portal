import z from "zod";

export const assignRolesToPermissionFormSchema = z.object({
  permission_id: z.coerce
    .number()
    .min(1, { message: "Permission id is required!" }),
  role_id: z.coerce.number().min(1, { message: "Role id is required!" }),
});

export type assignRolesToPermissionFormValue = z.infer<
  typeof assignRolesToPermissionFormSchema
>;
