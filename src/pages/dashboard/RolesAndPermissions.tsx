import { DialogTrigger } from "@radix-ui/react-dialog";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IPermissions, IRole } from "@/types/IRolesAndPermissions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RoleFormSchema,
  type RoleFormValues,
} from "@/lib/validators/RoleFormSchema";
import {
  PermissionFormSchema,
  type PermissionFormValues,
} from "@/lib/validators/PermissionFormSchema";
import { CreateRoles } from "@/api/services/CreateRoles";
import { toast } from "sonner";
import { CreatePermissions } from "@/api/services/CreatePermissions";
import { useRolesAndPermissons } from "@/hooks/useRolesAndPermissions";
import Loader from "./_components/ui/Loader";

export default function RolesAndPermissions() {
  const { roles, permissions, isLoading, error, refetch } =
    useRolesAndPermissons();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"role" | "permission">(
    "role",
  );

  const [editing, setEditing] = useState<
    | { type: "role"; item: IRole }
    | { type: "permission"; item: IPermissions }
    | null
  >(null);

  //role form
  const roleForm = useForm<RoleFormValues>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: { name: "", description: "" },
  });

  // Permission form
  const permissionForm = useForm<PermissionFormValues>({
    resolver: zodResolver(PermissionFormSchema),
    defaultValues: { name: "", description: "" },
  });

  // open the dialog for creation (respects selectedType)
  // const openCreateDialog = () => {
  //   setEditing(null);
  //   setForm({ name: "", description: "" });
  //   setIsOpen(true);
  // };

  // when clicking edit on a role/permission
  /*   const handleEdit = (type: "role" | "permission", id: number) => {
    if (type === "role") {
      const r = roles.find((x) => x.id === id);
      if (!r) return;
      setSelectedType("role");
      setEditing({ type: "role", item: r });
      setForm({ name: r.name, description: r.description });
      setIsOpen(true);
    } else {
      const p = permissions.find((x) => x.id === id);
      if (!p) return;
      setSelectedType("permission");
      setEditing({ type: "permission", item: p });
      setForm({ name: p.name, description: p.description });
      setIsOpen(true);
    }
  };

  const handleDelete = (type: "role" | "permission", id: number) => {
    if (type === "role") {
      setRoles((prev) => prev.filter((r) => r.id !== id));
    } else {
      setPermissions((prev) => prev.filter((p) => p.id !== id));
    }
  }; */

  const handleSubmitRolesAndPermission = async (
    data: RoleFormValues | PermissionFormValues,
  ) => {
    // create new
    if (selectedType === "role") {
      const createRoleResData = await CreateRoles(data.name, data.description);
      if (typeof createRoleResData === "object") {
        toast.success(createRoleResData.message);
        setIsOpen(false);
      } else toast.error(createRoleResData);
    } else {
      const createPermissionResData = await CreatePermissions(
        data.name,
        data.description,
      );
      if (typeof createPermissionResData === "object") {
        toast.success(createPermissionResData.message);
        setIsOpen(false);
      } else {
        toast.error(createPermissionResData);
      }
    }

    roleForm.reset();
    permissionForm.reset();

    /* if (editing) {
      // update existing
      if (editing.type === "role") {
        setRoles((prev) =>
          prev.map((r) =>
            r.id === editing.item.id
              ? { ...r, title: form.name, description: form.description }
              : r
          )
        );
      } else {
        setPermissions((prev) =>
          prev.map((p) =>
            p.id === editing.item.id
              ? { ...p, name: form.name, description: form.description }
              : p
          )
        );
      }
    }  */
  };
  if (isLoading)
    return (
      <Loader
        title="Loading"
        subtitle="Loading list of Roles and Permissions"
      />
    );

  if (error)
    return (
      <div className="flex items-center justify-center flex-col gap-5 py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {error}
          </h3>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm py-2 cursor-pointer"
          onClick={refetch}
        >
          Retry
        </Button>
      </div>
    );
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 pb-5">
      <div className="flex lg:flex-row flex-col gap-2 lg:gap-0 lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Roles and Permissions</h1>
          <p className="mt-1 text-muted-foreground">
            Manage Roles and Permissions for the school system
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          Actions
          <div>
            <Label htmlFor="create-type" className="sr-only">
              Create type
            </Label>
            <Select
              value={selectedType}
              onValueChange={(val) =>
                setSelectedType(val as "role" | "permission")
              }
            >
              <SelectTrigger
                id="create-type"
                className="w-[160px] cursor-pointer"
              >
                <SelectValue placeholder="Role or Permission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="role">
                  Role
                </SelectItem>
                <SelectItem className="cursor-pointer" value="permission">
                  Permission
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
              <Button
                className="cursor-pointer flex items-center"
                onClick={() => {
                  if (!editing) {
                    roleForm.reset();
                    permissionForm.reset();
                  }
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add {selectedType === "role" ? "Role" : "Permission"}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editing
                    ? editing.type === "role"
                      ? "Edit Role"
                      : "Edit Permission"
                    : selectedType === "role"
                      ? "Create New Role"
                      : "Create New Permission"}
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={
                  selectedType === "role"
                    ? roleForm.handleSubmit(handleSubmitRolesAndPermission)
                    : permissionForm.handleSubmit(
                        handleSubmitRolesAndPermission,
                      )
                }
                className="space-y-6"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">
                    {selectedType === "role" ||
                    (editing && editing.type === "role")
                      ? "Role Name"
                      : "Permission Name"}
                  </Label>
                  <Input
                    id="name"
                    placeholder={
                      selectedType === "role"
                        ? "e.g., Teacher"
                        : "e.g., view_grades"
                    }
                    {...(selectedType === "role"
                      ? roleForm.register("name")
                      : permissionForm.register("name"))}
                  />
                  <p className="text-xs text-red-500">
                    {selectedType === "role"
                      ? roleForm.formState.errors.name &&
                        roleForm.formState.errors.name.message
                      : permissionForm.formState.errors.name &&
                        permissionForm.formState.errors.name.message}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...(selectedType === "role"
                      ? roleForm.register("description")
                      : permissionForm.register("description"))}
                  />
                  <p className="text-xs text-red-500">
                    {selectedType === "role"
                      ? roleForm.formState.errors.description &&
                        roleForm.formState.errors.description.message
                      : permissionForm.formState.errors.description &&
                        permissionForm.formState.errors.description.message}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button type="submit" className="cursor-pointer">
                    {editing
                      ? "Update"
                      : selectedType === "role"
                        ? "Create Role"
                        : "Create Permission"}
                    {selectedType === "role"
                      ? roleForm.formState.isSubmitting && (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        )
                      : permissionForm.formState.isSubmitting && (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        )}
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      setEditing(null);
                    }}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Roles</h2>
            <p className="text-sm text-muted-foreground">
              List of roles in the system
            </p>
          </div>

          {roles.length === 0 ? (
            <Card className="w-full">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>
                  <Plus size={40} />
                </CardTitle>
                <CardDescription>No roles defined yet</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 justify-center items-center">
                <p>Use the "Add Access Control" button to create a Role.</p>
              </CardContent>
              <CardFooter>
                <p>TMIT@ {new Date().getFullYear()}</p>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className="transition-colors hover:bg-accent/50 rounded-sm"
                >
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">
                      {role.name}
                    </CardTitle>
                    {/* <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleEdit("role", role.id)}
                        aria-label={`Edit role ${role.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete("role", role.id)}
                        className="cursor-pointer text-destructive hover:text-destructive/90"
                        aria-label={`Delete role ${role.name}`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {role.description || "No description"}
                    </p>
                    {/* <p className="mt-2 text-sm text-muted-foreground">
                      {role.permissions} permissions
                    </p> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
        <div className="hidden lg-block w-0.5 absolute justify-self-center bg-green-500 h-full" />
        {/* Permissions Section */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Permissions</h2>
            <p className="text-sm text-muted-foreground">
              List of permissions in the system
            </p>
          </div>

          {permissions.length === 0 ? (
            <Card className="w-full">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>
                  <Plus size={40} />
                </CardTitle>
                <CardDescription>No permissions defined yet</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 justify-center items-center">
                <p>
                  Use the "Add Access Control" button to create a Permission.
                </p>
              </CardContent>
              <CardFooter>
                <p>TMIT@ {new Date().getFullYear()}</p>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {permissions.map((perm) => (
                <Card
                  key={perm.id}
                  className="transition-colors hover:bg-accent/50 rounded-sm"
                >
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">
                      {perm.name}
                    </CardTitle>
                    {/* <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleEdit("permission", perm.id)}
                        aria-label={`Edit permission ${perm.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete("permission", perm.id)}
                        className="cursor-pointer text-destructive hover:text-destructive/90"
                        aria-label={`Delete permission ${perm.name}`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {perm.description || "No description"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
