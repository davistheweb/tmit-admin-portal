import React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router";
import { useCoursesByDepartmentId } from "@/hooks/useCoursesByDepartmentId";
import { CreateCourse } from "@/api/services/CreateCourse";
import { CourseForm } from "./_components/CourseForm";
import { useFaculties } from "@/hooks/useFaculties";

const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const ManageDepartment: React.FC = () => {
  const location = useLocation();
  const departmentId = new URLSearchParams(location.search).get(
    "department_id",
  );
  const navigate = useNavigate();
  const { courses, isLoading, error, refetch } =
    useCoursesByDepartmentId(departmentId);

  const { faculties } = useFaculties();

  const getDepartmentNameByID = (dept_id: number) =>
    faculties
      .flatMap((faculty) => faculty.departments)
      .find((dept) => dept.id === dept_id)?.name;

  const handleCreateCourse = async (data: {
    code: string;
    title: string;
    unit: number;
    level: number;
    semester: string;
    session: string;
  }) => {
    if (!departmentId) return;
    const result = await CreateCourse({
      ...data,
      department_id: parseInt(departmentId),
    });
    if (typeof result === "string") {
      toast.error(result);
    } else {
      toast.success(result.message || "Course added successfully");
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 lg:p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">
            Manage Department:{" "}
            {getDepartmentNameByID(Number(departmentId)) || "Loding...."}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => document.getElementById("course-form")?.click()}
              className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 w-full sm:w-auto cursor-pointer transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Course
            </Button>
            <Button
              onClick={() => navigate(-1)}
              className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 w-full sm:w-auto cursor-pointer transition-colors duration-200"
            >
              Go Back
            </Button>
          </div>
        </div>

        <CourseForm onSubmit={handleCreateCourse} />

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
        ) : courses.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              No courses found. Add one to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="block lg:hidden">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">
                  {courses.length} course{courses.length !== 1 ? "s" : ""} found
                </p>
              </div>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
                >
                  <h3 className="font-semibold text-sm text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Code: {course.code}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Unit: {course.unit}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Level: {course.level}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Semester: {course.semester}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Session: {course.session}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Semester
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Session
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {course.title}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {course.code}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {course.unit}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {course.level}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {course.semester}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {course.session}
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
