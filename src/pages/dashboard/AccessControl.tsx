"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  FileText,
  Plus,
  Globe,
  Shield,
  Lock,
  Zap,
  Settings,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAccessControls } from "@/hooks/useAccessControl";
import Loader from "./_components/ui/Loader";
import type {
  IAddPermissionToRoute,
  IAssignRolesToPermission,
  IRoutes,
} from "@/types/IAccessControl";
import { useRolesAndPermissons } from "@/hooks/useRolesAndPermissions";

import {
  addPermissionToRoute,
  assignRolesToPermissionService,
} from "@/api/services/AccessControl";
import {
  assignRolesToPermissionFormSchema,
  permissionToRouteFormSchema,
  type assignRolesToPermissionFormValue,
  type permissionToRouteFormValues,
} from "@/lib/validators/AccessControlSchemas";
const getMethodBadgeClasses = (method: string) => {
  switch (method.toLowerCase()) {
    case "get":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
    case "post":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
    case "put":
    case "patch":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
    case "delete":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800";
  }
};

export default function AccessControl() {
  const { routes, protectedRoutes, isLoading, error, refetch } =
    useAccessControls();

  const { roles, permissions } = useRolesAndPermissons();

  const allRoutes: IRoutes[] = routes ? Object.values(routes) : [];

  // console.log(allRoutes);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "addPermissionToRoute" | "assignRolesToPermission"
  >("addPermissionToRoute");

  const [editing, setEditing] = useState<
    | { type: "addPermissionToRoute"; item: IAddPermissionToRoute }
    | { type: "assignRolesToPermission"; item: IAssignRolesToPermission }
    | null
  >(null);

  // Add Permission To Route Form
  const addPermissionToRouteForm = useForm<permissionToRouteFormValues>({
    resolver: zodResolver(permissionToRouteFormSchema),
    defaultValues: { route_name: "", permission_id: 1 },
  });

  // Assign Permission To Roles
  const assignRolesToPermissionForm = useForm<assignRolesToPermissionFormValue>(
    {
      resolver: zodResolver(assignRolesToPermissionFormSchema),
      defaultValues: { permission_id: 1, role_id: 1 },
    },
  );

  const handleCreateAccessControl = async (
    data: permissionToRouteFormValues | assignRolesToPermissionFormValue,
  ) => {
    if (selectedType === "addPermissionToRoute") {
      const permissionToRouteFormDataValues =
        data as permissionToRouteFormValues;

      const addPermissionToRouteData = await addPermissionToRoute(
        permissionToRouteFormDataValues.route_name.split("::")[0],
        permissionToRouteFormDataValues.permission_id,
      );
      if (typeof addPermissionToRouteData === "object") {
        toast.success(addPermissionToRouteData.message);
        setIsOpen(false);
      } else toast.error(addPermissionToRouteData);
    } else {
      const assignRolesToPermissionFormDataValue =
        data as assignRolesToPermissionFormValue;

      const assignRolesToPermissionData = await assignRolesToPermissionService(
        assignRolesToPermissionFormDataValue.permission_id,
        assignRolesToPermissionFormDataValue.role_id,
      );
      if (typeof assignRolesToPermissionData === "object") {
        toast.success(assignRolesToPermissionData.message);
        setIsOpen(false);
      } else {
        toast.error(assignRolesToPermissionData);
      }
    }

    addPermissionToRouteForm.reset();
    assignRolesToPermissionForm.reset();
  };

  if (isLoading)
    return <Loader title="Loading" subtitle="Loading Access Controls" />;

  if (error)
    return (
      <div className="flex items-center justify-center flex-col gap-6 py-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <FileText className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {error}
          </h3>
          <p className="text-muted-foreground text-sm max-w-md">
            Something went wrong while loading the access controls. Please try
            again.
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 shadow-sm"
          onClick={refetch}
        >
          <Settings className="w-4 h-4 mr-2" />
          Retry Loading
        </Button>
      </div>
    );

  return (
    <div className="flex h-full flex-1 flex-col gap-8 p-6 pb-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex lg:flex-row flex-col gap-4 lg:gap-0 lg:items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Access Controls
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage API routes and permission-based access controls
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:items-center gap-3">
          Actions
          <div>
            <Label htmlFor="create-type" className="sr-only">
              Create type
            </Label>
            <Select
              value={selectedType}
              onValueChange={(val) =>
                setSelectedType(
                  val as "addPermissionToRoute" | "assignRolesToPermission"
                )
              }
            >
              <SelectTrigger
                id="create-type"
                className="w-[180px] cursor-pointer shadow-sm border-muted-foreground/20"
              >
                <SelectValue placeholder="Add Permission To Route or Assign Permission To Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className="cursor-pointer"
                  value="addPermissionToRoute"
                >
                  <div className="flex items-center gap-2">
                    Add Permission To Route
                  </div>
                </SelectItem>
                <SelectItem
                  className="cursor-pointer"
                  value="assignRolesToPermission"
                >
                  <div className="flex items-center gap-2">
                    Assign Permission To Roles
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* form */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
              <Button
                className="cursor-pointer flex items-center shadow-sm bg-primary hover:bg-primary/90 transition-all duration-200"
                onClick={() => {
                  if (!editing) {
                    addPermissionToRouteForm.reset();
                    addPermissionToRouteForm.reset();
                  }
                }}
              >
                <Plus className="mr-2 h-4 w-4" />

                {selectedType === "addPermissionToRoute"
                  ? "Add Permission To Route"
                  : "Assign Permission To Roles"}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl">
                  {editing
                    ? editing.type === "addPermissionToRoute"
                      ? "Edit Permission To Route"
                      : "Edit Assign Permission To Roles"
                    : selectedType === "addPermissionToRoute"
                    ? "Add Permission To Route"
                    : "Assign Permission To Roles"}
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={
                  selectedType === "addPermissionToRoute"
                    ? addPermissionToRouteForm.handleSubmit(
                        handleCreateAccessControl
                      )
                    : assignRolesToPermissionForm.handleSubmit(
                        handleCreateAccessControl
                      )
                }
                className="space-y-6"
              >
                <div className="space-y-2">
                  {selectedType === "addPermissionToRoute" ? (
                    <div className="space-y-3">
                      <Label
                        htmlFor="permission_id"
                        className="text-sm font-medium"
                      >
                        Select Permission Name
                      </Label>
                      <Controller
                        name="permission_id"
                        control={addPermissionToRouteForm.control}
                        render={({ field, fieldState }) => (
                          <div className="space-y-2">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value.toString()}
                            >
                              <SelectTrigger
                                id="create-type"
                                className="w-full cursor-pointer shadow-sm border-muted-foreground/20"
                              >
                                <SelectValue placeholder="Select permission name" />
                              </SelectTrigger>
                              <SelectContent>
                                {permissions.map((perm, i) => (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={i}
                                    value={perm.id.toString()}
                                  >
                                    {perm.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <p className="text-xs text-red-500">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <Label
                        htmlFor="route_name"
                        className="text-sm font-medium"
                      >
                        Select Route Name
                      </Label>
                      <Controller
                        name="route_name"
                        control={addPermissionToRouteForm.control}
                        render={({ field, fieldState }) => (
                          <div className="space-y-2">
                            {" "}
                            <Select
                              // defaultValue={allRoutes[0].name}
                              // onValueChange={(val) => {
                              //   val.split("::");
                              // }}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full cursor-pointer shadow-sm border-muted-foreground/20">
                                <SelectValue placeholder="Select route name" />
                              </SelectTrigger>

                              <SelectContent>
                                {allRoutes.map((r, i) => (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={`${r.name}-${i}`}
                                    value={`${r.name}::${i}`}
                                  >
                                    {r.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <p className="text-xs text-red-500">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label
                        htmlFor="permission_id"
                        className="text-sm font-medium"
                      >
                        Select Permission
                      </Label>
                      <Controller
                        name="permission_id"
                        control={assignRolesToPermissionForm.control}
                        render={({ field, fieldState }) => (
                          <div className="space-y-2">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value.toString()}
                            >
                              <SelectTrigger
                                id="create-type"
                                className="w-full cursor-pointer shadow-sm border-muted-foreground/20"
                              >
                                <SelectValue placeholder="Select permission" />
                              </SelectTrigger>
                              <SelectContent>
                                {permissions.map((perm, i) => (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={i}
                                    value={perm.id.toString()}
                                  >
                                    {perm.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <p className="text-xs text-red-500">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <Label
                        htmlFor="route_name"
                        className="text-sm font-medium"
                      >
                        Select Role
                      </Label>
                      <Controller
                        name="role_id"
                        control={assignRolesToPermissionForm.control}
                        render={({ field, fieldState }) => (
                          <div className="space-y-2">
                            {" "}
                            <Select
                              // defaultValue={allRoutes[0].name}
                              // onValueChange={(val) => {
                              //   val.split("::");
                              // }}
                              onValueChange={field.onChange}
                              value={field.value.toString()}
                            >
                              <SelectTrigger className="w-full cursor-pointer shadow-sm border-muted-foreground/20">
                                <SelectValue placeholder="Select route name" />
                              </SelectTrigger>

                              <SelectContent>
                                {roles.map((role, i) => (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={`${role.name}-${i}`}
                                    value={role.id.toString()}
                                  >
                                    {role.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <p className="text-xs text-red-500">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>
                {/* <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {selectedType === "role" ||
                    (editing && editing.type === "role")
                      ? "Role Name"
                      : "Permission Name"}
                  </Label>
                  <Input
                    id="name"
                    placeholder={
                      selectedType === "role"
                        ? "e.g., Administrator, Teacher, Student"
                        : "e.g., view_grades, edit_users, delete_posts"
                    }
                    className="shadow-sm"
                    {...(selectedType === "role"
                      ? roleForm.register("name")
                      : permissionForm.register("name"))}
                  />
                  {(selectedType === "role"
                    ? roleForm.formState.errors.name
                    : permissionForm.formState.errors.name) && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {selectedType === "role"
                        ? roleForm.formState.errors.name?.message
                        : permissionForm.formState.errors.name?.message}
                    </p>
                  )}
                </div> */}

                {/* <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a clear description of this role or permission..."
                    className="shadow-sm resize-none"
                    rows={3}
                    {...(selectedType === "role"
                      ? roleForm.register("description")
                      : permissionForm.register("description"))}
                  />
                  {(selectedType === "role"
                    ? roleForm.formState.errors.description
                    : permissionForm.formState.errors.description) && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {selectedType === "role"
                        ? roleForm.formState.errors.description?.message
                        : permissionForm.formState.errors.description?.message}
                    </p>
                  )}
                </div> */}

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="cursor-pointer flex-1 shadow-sm transition-all duration-200"
                    disabled={
                      selectedType === "addPermissionToRoute"
                        ? addPermissionToRouteForm.formState.isSubmitting
                        : assignRolesToPermissionForm.formState.isSubmitting
                    }
                  >
                    {editing
                      ? "Update"
                      : selectedType === "addPermissionToRoute"
                      ? "Add Permission To Route"
                      : "Assign Permission To Role"}
                    {(selectedType === "addPermissionToRoute"
                      ? addPermissionToRouteForm.formState.isSubmitting
                      : assignRolesToPermissionForm.formState.isSubmitting) && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-transparent"
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

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Routes Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">API Routes</h2>
              <Badge
                variant="secondary"
                className="text-xs font-medium px-2 py-1"
              >
                {allRoutes.length}
              </Badge>
            </div>
            {allRoutes.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Available system endpoints
              </p>
            )}
          </div>

          {allRoutes.length === 0 ? (
            <Card className="border-dashed border-2 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="flex flex-col items-center py-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl mb-2">
                  No Routes Available
                </CardTitle>
                <CardDescription className="text-center max-w-sm text-base leading-relaxed">
                  No API routes have been defined in the system yet. Routes will
                  appear here once they are registered.
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-center pb-8">
                <p className="text-xs text-muted-foreground">
                  TMIT © {new Date().getFullYear()}
                </p>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {allRoutes.map((route, index) => (
                <Card
                  key={index}
                  className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-l-4 border-l-blue-500 bg-gradient-to-r from-background to-muted/10 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge
                            className={`text-xs font-semibold px-3 py-1 ${getMethodBadgeClasses(
                              route.method
                            )}`}
                          >
                            {route.method.toUpperCase()}
                          </Badge>
                          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {route.name}
                          </h3>
                        </div>
                        <div className="bg-muted/60 rounded-lg px-3 py-2 border">
                          <p className="text-muted-foreground font-mono text-xs">
                            /{route.uri || route.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-600 transition-colors">
                        <Zap className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <div className="hidden lg:block w-px absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent h-full opacity-60" />

        {/* Protected Routes Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Protected Routes</h2>
              <Badge
                variant="secondary"
                className="text-xs font-medium px-2 py-1"
              >
                {protectedRoutes.length}
              </Badge>
            </div>
            {protectedRoutes.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Permission-controlled endpoints
              </p>
            )}
          </div>

          {protectedRoutes.length === 0 ? (
            <Card className="border-dashed border-2 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="flex flex-col items-center py-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Lock className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl mb-2">
                  No Protected Routes
                </CardTitle>
                <CardDescription className="text-center max-w-sm text-base leading-relaxed">
                  No routes have been configured with permission requirements
                  yet. Protected routes will appear here once permissions are
                  assigned.
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-center pb-8">
                <p className="text-xs text-muted-foreground">
                  TMIT © {new Date().getFullYear()}
                </p>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {protectedRoutes.map((protectedRoute, index) => {
                // Find the corresponding route to get the method
                const correspondingRoute = allRoutes.find(
                  (route) => route.name === protectedRoute.route_name
                );
                const method = correspondingRoute?.method || "GET";

                return (
                  <Card
                    key={index}
                    className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-l-4 border-l-green-500 bg-gradient-to-r from-background to-muted/10 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge
                              className={`text-xs font-semibold px-3 py-1 ${getMethodBadgeClasses(
                                method
                              )}`}
                            >
                              {method.toUpperCase()}
                            </Badge>
                            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                              {protectedRoute.route_name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300 px-3 py-1"
                            >
                              <Lock className="h-3 w-3 mr-1.5" />
                              {protectedRoute.permission}
                            </Badge>
                          </div>
                          <div className="bg-muted/60 rounded-lg px-3 py-2 border">
                            <p className="text-muted-foreground font-mono text-xs">
                              /
                              {correspondingRoute?.uri ||
                                protectedRoute.route_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 group-hover:text-green-700 transition-colors">
                          <Shield className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
