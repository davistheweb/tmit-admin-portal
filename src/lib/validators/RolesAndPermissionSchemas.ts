import z from "zod";

export const RoleFormSchema = z.object({
  name: z.string().nonempty("Role name is required"),
  description: z.string().nonempty("Role description is required"),
});

export type RoleFormValues = z.infer<typeof RoleFormSchema>;

export const PermissionFormSchema = z.object({
  name: z.string().nonempty("Permission name is required"),
  description: z.string().nonempty("Permission description is required"),
});

export type PermissionFormValues = z.infer<typeof PermissionFormSchema>;
