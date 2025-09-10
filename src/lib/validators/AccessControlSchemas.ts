import z from "zod";

export const permissionToRouteFormSchema = z.object({
  route_name: z.string().nonempty("Route name is required!"),
  permission_id: z.coerce
    .number()
    .min(1, { message: "Permission id is required!" }),
});

export type permissionToRouteFormValues = z.infer<
  typeof permissionToRouteFormSchema
>;


export const assignRolesToPermissionFormSchema = z.object({
  permission_id: z.coerce
    .number()
    .min(1, { message: "Permission id is required!" }),
  role_id: z.coerce.number().min(1, { message: "Role id is required!" }),
});

export type assignRolesToPermissionFormValue = z.infer<
  typeof assignRolesToPermissionFormSchema
>;

