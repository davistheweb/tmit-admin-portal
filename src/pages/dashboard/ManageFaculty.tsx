import React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFacultyById } from "@/hooks/useFacultyById";
import { CreateDepartment } from "@/api/services/CreateDepartment";
import { DepartmentForm } from "./_components/DepartmentForm";
import { useNavigate } from "react-router";

const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const DepartmentCard = ({
  department,
}: {
  department: { id: number; name: string; code: string };
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-sm text-gray-900">
          {department.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">Code: {department.code}</p>
      </div>
    </div>
  </div>
);

export const ManageFaculty: React.FC = () => {
  const { faculty, isLoading, error, refetch } = useFacultyById();
  const navigate = useNavigate();

  const handleCreateDepartment = async (data: {
    name: string;
    code: string;
  }) => {
    if (!faculty) return;
    const result = await CreateDepartment({
      ...data,
      faculty_id: faculty.id.toString(),
    });
    if (typeof result === "string") {
      toast.error(result);
    } else {
      toast.success(result.message || "Department added successfully");
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 lg:p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">
            Manage Faculty: {faculty?.name || "Loading..."}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            {faculty && faculty.departments.length > 0 && (
              <Button
                onClick={() =>
                  document.getElementById("department-form")?.click()
                }
                className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 w-full sm:w-auto cursor-pointer transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Create Department
              </Button>
            )}
            <Button
              onClick={() => navigate(-1)}
              className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 w-full sm:w-auto cursor-pointer transition-colors duration-200"
            >
              Go Back
            </Button>
          </div>
        </div>

        <DepartmentForm onSubmit={handleCreateDepartment} />

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">{error}</p>
            <Button
              onClick={refetch}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-200"
            >
              Retry
            </Button>
          </div>
        ) : !faculty ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Faculty not found.
            </p>
            <Button
              onClick={() => navigate("/dashboard/academics")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-200"
            >
              Back to Faculties
            </Button>
          </div>
        ) : faculty.departments.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              No departments found for {faculty.name}. Create one to get
              started.
            </p>
            <Button
              onClick={() =>
                document.getElementById("department-form")?.click()
              }
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Department
            </Button>
          </div>
        ) : (
          <>
            <div className="block lg:hidden">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">
                  {faculty.departments.length} department
                  {faculty.departments.length !== 1 ? "s" : ""} found
                </p>
              </div>
              {faculty.departments.map((department) => (
                <DepartmentCard key={department.id} department={department} />
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {faculty.departments.map((department) => (
                      <tr key={department.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {department.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {department.code}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
