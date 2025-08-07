import React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFacultyById } from "@/hooks/useFacultyById";
import { CreateDepartment } from "@/api/services/CreateDepartment";
import { DepartmentForm } from "./_components/DepartmentForm";
import { useNavigate, Link } from "react-router";

const Spinner = () => (
  <div className="flex justify-center items-center py-8 sm:py-12">
    <div className="h-5 w-5 sm:h-6 sm:w-6 border-2 sm:border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const DepartmentCard = ({
  department,
}: {
  department: { id: number; name: string; code: string };
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-tight break-words">
          {department.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-mono">
          Code: {department.code}
        </p>
      </div>
      <Link
        to={`/dashboard/academics/manage-department?department_id=${department.id}`}
        className="text-xs sm:text-sm font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 active:bg-green-200 px-3 py-2 rounded-md transition-all duration-200 text-center sm:text-left self-start sm:self-auto cursor-pointer min-h-[36px] flex items-center justify-center"
      >
        Manage
      </Link>
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
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Fully Responsive */}
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start md:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">
              <span className="block sm:hidden truncate">
                {faculty?.name || "Loading..."}
              </span>
              <span className="hidden sm:block truncate">
                Manage Faculty: {faculty?.name || "Loading..."}
              </span>
            </h1>
          </div>

          {/* Action Buttons - Super Responsive */}
          <div className="flex flex-row gap-2 w-full sm:w-auto sm:flex-shrink-0">
            {faculty && faculty.departments.length > 0 && (
              <Button
                onClick={() =>
                  document.getElementById("department-form")?.click()
                }
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs sm:text-sm md:text-base py-2.5 sm:py-2 px-3 sm:px-4 md:px-6 flex-1 sm:flex-initial cursor-pointer transition-all duration-200 font-medium min-h-[40px] sm:min-h-[36px]"
              >
                <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate hidden xs:inline">
                  Create Department
                </span>
                <span className="truncate xs:hidden">Create</span>
              </Button>
            )}
            <Button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white text-xs sm:text-sm md:text-base py-2.5 sm:py-2 px-3 sm:px-4 md:px-6 flex-1 sm:flex-initial cursor-pointer transition-all duration-200 font-medium min-h-[40px] sm:min-h-[36px]"
            >
              <span className="truncate">Go Back</span>
            </Button>
          </div>
        </div>

        {/* Department Form */}
        <div className="mb-4 sm:mb-6">
          <DepartmentForm onSubmit={handleCreateDepartment} />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <Spinner />
        ) : error ? (
          /* Error State */
          <div className="text-center py-6 sm:py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4 break-words">
              {error}
            </p>
            <Button
              onClick={refetch}
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base cursor-pointer transition-all duration-200 min-h-[40px] sm:min-h-[36px] font-medium"
            >
              Try Again
            </Button>
          </div>
        ) : !faculty ? (
          /* Faculty Not Found */
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="max-w-md mx-auto">
              <p className="text-gray-500 text-sm sm:text-base mb-4">
                Faculty not found.
              </p>
              <Button
                onClick={() => navigate("/dashboard/academics")}
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base cursor-pointer transition-all duration-200 min-h-[40px] sm:min-h-[36px] font-medium"
              >
                Back to Faculties
              </Button>
            </div>
          </div>
        ) : faculty.departments.length === 0 ? (
          /* Empty State */
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="max-w-md mx-auto">
              <p className="text-gray-500 text-sm sm:text-base mb-4">
                No departments found for {faculty.name}. Create one to get
                started.
              </p>
              <Button
                onClick={() =>
                  document.getElementById("department-form")?.click()
                }
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base cursor-pointer transition-all duration-200 min-h-[40px] sm:min-h-[36px] font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Department
              </Button>
            </div>
          </div>
        ) : (
          /* Department List */
          <>
            {/* Mobile & Tablet Cards (xs to xl) */}
            <div className="block xl:hidden">
              <div className="mb-3 sm:mb-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  {faculty.departments.length} department
                  {faculty.departments.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {faculty.departments.map((department) => (
                  <DepartmentCard key={department.id} department={department} />
                ))}
              </div>
            </div>

            {/* Desktop Table (xl and above) */}
            <div className="hidden xl:block">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {faculty.departments.length} department
                  {faculty.departments.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department Name
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {faculty.departments.map((department) => (
                        <tr
                          key={department.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 font-medium">
                            <div
                              className="max-w-xs truncate"
                              title={department.name}
                            >
                              {department.name}
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 font-mono">
                            {department.code}
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-sm">
                            <Link
                              to={`/dashboard/academics/manage-department?department_id=${department.id}`}
                              className="inline-flex items-center justify-center text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 active:bg-green-200 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 font-medium min-h-[32px]"
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
