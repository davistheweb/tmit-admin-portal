import { useState } from "react";
import { Mail, Shield, ArrowLeft, Angry, FileText, Plus } from "lucide-react";
// import type { IRole, IPermission } from "@/types/IStaff";
import { useNavigate, useParams } from "react-router";
import { useStaffsDetails } from "@/hooks/useStaffDetails";
import Loader from "./_components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import type { IAssignRoleToStaff } from "@/types/IStaff";
import { useRolesAndPermissons } from "@/hooks/useRolesAndPermissions";
import {
  assignRolesToStaffFormSchema,
  type assignRolesToStaffFormValues,
} from "@/lib/validators/assignRolesToStaffFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignRoleToStaff } from "@/api/services/Staffs";
import { toast } from "sonner";

// Dummy data
// const permissions: IPermission[] = [
//   {
//     id: "1",
//     name: "View Students",
//     description: "Can view student records",
//     category: "read",
//   },
//   {
//     id: "2",
//     name: "Edit Students",
//     description: "Can modify student information",
//     category: "write",
//   },
//   {
//     id: "3",
//     name: "Delete Students",
//     description: "Can remove student records",
//     category: "delete",
//   },
//   {
//     id: "4",
//     name: "View Reports",
//     description: "Can access system reports",
//     category: "read",
//   },
//   {
//     id: "5",
//     name: "Manage Users",
//     description: "Can manage user accounts",
//     category: "admin",
//   },
//   {
//     id: "6",
//     name: "System Settings",
//     description: "Can modify system configuration",
//     category: "admin",
//   },
// ];

// const roles: IRole[] = [
//   {
//     id: "1",
//     name: "Principal",
//     description: "School administrator with full access",
//     permissions: permissions,
//     level: 5,
//   },
//   {
//     id: "2",
//     name: "Vice Principal",
//     description: "Assistant administrator with elevated privileges",
//     permissions: permissions.slice(0, 5),
//     level: 4,
//   },
//   {
//     id: "3",
//     name: "Teacher",
//     description: "Classroom instructor with student management access",
//     permissions: permissions.slice(0, 3),
//     level: 3,
//   },
//   {
//     id: "4",
//     name: "Counselor",
//     description: "Student guidance and support specialist",
//     permissions: [permissions[0], permissions[1], permissions[3]],
//     level: 2,
//   },
//   {
//     id: "5",
//     name: "Secretary",
//     description: "Administrative support with limited access",
//     permissions: [permissions[0], permissions[3]],
//     level: 1,
//   },
// ];

const ViewStaffDetails = () => {
  // const [selectedStaff, setSelectedStaff] = useState({
  //   id: "1",
  //   name: "Dr. Sarah Johnson",
  //   email: "sarah.johnson@tmit.edu",
  //   roles: roles[0],
  // });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<{
    type: "assignRoleToStaff";
    item: IAssignRoleToStaff;
  } | null>(null);

  const navigate = useNavigate();

  const { staffId } = useParams();
  const { data, loading, error, refetch } = useStaffsDetails(staffId);

  const { roles } = useRolesAndPermissons();

  const {
    // register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<assignRolesToStaffFormValues>({
    resolver: zodResolver(assignRolesToStaffFormSchema),
    defaultValues: { staff_id: Number(staffId), role_id: 1 },
  });

  const handleAssignRoleToStaff = async (
    data: assignRolesToStaffFormValues,
  ) => {
    const assignRolesToStaffData = await assignRoleToStaff(
      data.staff_id,
      data.role_id,
    );
    if (typeof assignRolesToStaffData === "object") {
      toast.success(assignRolesToStaffData.message);
      setIsOpen(false);
    } else {
      toast.error(assignRolesToStaffData);
    }
  };

  if (loading)
    return <Loader title="Loading" subtitle="Loading Staff details" />;

  if (error)
    return (
      <div className="flex items-center justify-center flex-col gap-5 py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {error === "ERR_NETWORK" ? (
              <FileText className="w-8 h-8 text-red-600" />
            ) : (
              <Angry className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {error === "ERR_NETWORK"
              ? "Failed to get staffs, pls check your internet"
              : error}
          </h3>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm py-2 cursor-pointer"
          onClick={() => {
            if (error === "ERR_NETWORK") refetch();
            else navigate(-1);
          }}
        >
          {error === "ERR_NETWORK" ? "Retry" : "Go back"}
        </Button>
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="mr-4 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Staff Details
                </h1>
                <p className="text-gray-600 mt-2">
                  Detailed information for {data?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Assign Roles to staff */}
        <div className="flex flex-col sm:flex-row lg:items-center gap-3 px-4">
          Actions
          {/* <div>
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
                <SelectValue placeholder="Add Permission To Route or Assign Roles To Permission" />
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
                    Assign Roles To Permission
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* form */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
              <Button
                className="cursor-pointer flex items-center shadow-sm bg-primary hover:bg-primary/90 transition-all duration-200"
                // onClick={() => {
                //   if (!editing) {
                //     addPermissionToRouteForm.reset();
                //     addPermissionToRouteForm.reset();
                //   }
                // }}
              >
                <Plus className="mr-2 h-4 w-4" />
                {/* 
                {selectedType === "addPermissionToRoute"
                  ? "Add Permission To Route"
                  : "Assign Roles To Permission"} */}
                Assign Role
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl">
                  {/* {editing
                    ? editing.type === "addPermissionToRoute"
                      ? "Edit Permission To Route"
                      : "Edit Assign Roles To Permission"
                    : selectedType === "addPermissionToRoute"
                    ? "Add Permission To Route"
                    : "Assign Roles To Permission"} */}
                  Assign Role To Staff
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(handleAssignRoleToStaff)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="space-y-3">
                    <Label htmlFor="staff_name" className="text-sm font-medium">
                      Staff Name: {data?.name}
                    </Label>

                    <Controller
                      name="staff_id"
                      control={control}
                      render={({ field, fieldState }) => (
                        <div className="space-y-2">
                          <Select
                            defaultValue={data?.name}
                            onValueChange={field.onChange}
                            value={field.value.toString()}
                            disabled
                          >
                            <SelectTrigger className="w-full cursor-pointer shadow-sm border-muted-foreground/20">
                              <SelectValue placeholder="Select route name" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem
                                className="cursor-pointer"
                                value={Number(data?.id).toString()}
                              >
                                {data?.name}
                              </SelectItem>
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
                    <Label htmlFor="route_name" className="text-sm font-medium">
                      Select Role
                    </Label>
                    <Controller
                      name="role_id"
                      control={control}
                      render={({ field, fieldState }) => (
                        <div className="space-y-2">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value.toString()}
                          >
                            <SelectTrigger className="w-full cursor-pointer shadow-sm border-muted-foreground/20">
                              <SelectValue placeholder="Select role name" />
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
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="cursor-pointer flex-1 shadow-sm transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {editing ? "Update" : "Assign"}
                    {isSubmitting && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                    onClick={() => {
                      reset();
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staff Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {data?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {data?.name}
                </h2>
                {/* <p className="text-green-600 font-medium">
                  {selectedStaff.roles.name}
                </p> */}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 text-green-500" />
                  <span className="text-sm">{data?.email}</span>
                </div>
              </div>

              {/* <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Access Level
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {selectedStaff.roles.level}/5
                  </span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 w-3 rounded-full mr-1 ${
                        i < selectedStaff.roles.level
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div> */}
            </div>
          </div>

          {/* Role & Permissions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Role Information
              </h3>
              {!data?.roles.length ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-center">NO ROLES FOR THIS STAFF</p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-3">
                  {data.roles.map((role, _i) => (
                    <div
                      className="bg-green-50 border border-green-200 rounded-lg p-4"
                      key={_i}
                    >
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <h4 className="font-medium text-green-900">{role}</h4>
                      </div>
                      <p className="text-green-700 text-sm">
                        {/* {data.roles.description} */}
                        Role Description
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Permissions
                {!data?.permissions.length
                  ? ""
                  : ` (${data?.permissions.length})`}
              </h3>
              {!data?.permissions.length ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-center">NO PERMISSIONS FOR THIS STAFF</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.permissions.map((permission, _i) => (
                    <div
                      key={_i}
                      className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {permission}
                        </h4>
                        {/* <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            permission.category === "admin"
                              ? "bg-red-100 text-red-700"
                              : permission.category === "write"
                              ? "bg-yellow-100 text-yellow-700"
                              : permission.category === "delete"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {permission.category}
                        </span> */}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Permission Description
                        {/* {permission.description} */}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffDetails;
