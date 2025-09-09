import z from "zod";

export const PermissionFormSchema = z.object({
  name: z.string().nonempty("Permission name is required"),
  description: z.string().nonempty("Permission description is required"),
});

export type PermissionFormValues = z.infer<typeof PermissionFormSchema>;
