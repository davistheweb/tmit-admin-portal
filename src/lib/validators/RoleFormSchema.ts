import z from "zod";

export const RoleFormSchema = z.object({
  name: z.string().nonempty("Role name is required"),
  description: z.string().nonempty("Role description is required"),
});

export type RoleFormValues = z.infer<typeof RoleFormSchema>;
