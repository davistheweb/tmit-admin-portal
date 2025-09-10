// import { useState } from "react";
import { Mail, Shield, ArrowLeft, Angry, FileText } from "lucide-react";
// import type { IRole, IPermission } from "@/types/IStaff";
import { useNavigate, useParams } from "react-router";
import { useStaffsDetails } from "@/hooks/useStaffDetails";
import Loader from "./_components/ui/Loader";
import { Button } from "@/components/ui/button";

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

  const navigate = useNavigate();

  const { staffId } = useParams();
  const { data, loading, error, refetch } = useStaffsDetails(staffId);
  console.log(data);

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
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
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
