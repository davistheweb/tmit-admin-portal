import React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFaculties } from "@/hooks/useFaculties";
import { FacultyForm } from "./_components/FacultyForm";
import { Link } from "react-router";
import { CreateFaculty } from "@/api/services/Academics";

const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const FacultyCard = ({
  faculty,
}: {
  faculty: { id: number; name: string; abbrev: string; departments: any[] };
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-sm text-gray-900">{faculty.name}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {faculty.departments.length} Department
          {faculty.departments.length !== 1 ? "s" : ""}
        </p>
      </div>
      <Link
        to={`manage-faculty?facultyid=${faculty.id}`}
        className="text-xs font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2 py-1 rounded"
      >
        Manage
      </Link>
    </div>
  </div>
);

export const Academics: React.FC = () => {
  const { faculties, isLoading, error, refetch } = useFaculties();

  const handleCreateFaculty = async (data: {
    name: string;
    abbrev: string;
  }) => {
    const result = await CreateFaculty(data.name, data.abbrev);
    if (typeof result === "string") {
      toast.error(result);
    } else {
      toast.success(result.message || "Faculty added successfully");
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 lg:p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
            Faculties
          </h1>
          {faculties.length > 0 && (
            <Button
              onClick={() => document.getElementById("faculty-form")?.click()}
              className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 cursor-pointer transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Faculty
            </Button>
          )}
        </div>

        <FacultyForm onSubmit={handleCreateFaculty} />

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">{error}</p>
            <Button
              onClick={refetch}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm cursor-pointer transition-colors duration-200"
            >
              Retry
            </Button>
          </div>
        ) : faculties.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              No faculties found. Create one to get started.
            </p>
            <Button
              onClick={() => document.getElementById("faculty-form")?.click()}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm cursor-pointer transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Faculty
            </Button>
          </div>
        ) : (
          <>
            <div className="block lg:hidden">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">
                  {faculties.length} facult
                  {faculties.length !== 1 ? "ies" : "y"} found
                </p>
              </div>
              {faculties.map((faculty) => (
                <FacultyCard key={faculty.id} faculty={faculty} />
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Faculty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departments
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {faculties.map((faculty) => (
                      <tr key={faculty.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {faculty.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {faculty.abbrev}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {faculty.departments.length}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <Link
                            to={`manage-faculty?facultyid=${faculty.id}`}
                            className="text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2 py-1 rounded cursor-pointer"
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
          </>
        )}
      </div>
    </div>
  );
};
