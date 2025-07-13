import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePendingStudentsByDepartment } from "@/hooks/usePendingStudentsByDepartment";
import { approveStudent } from "@/api/services/approveStudent";
import { rejectStudent } from "@/api/services/rejectStudent";
import { faculties } from "@/data";

const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const ApplicationsPage: React.FC = () => {
  const { students, isLoading, error, refetch, dept } =
    usePendingStudentsByDepartment();
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);

  // Look up the full department name (normalize to lowercase codes)
  const deptFullName =
    faculties
      .flatMap((f) =>
        f.departments.map((d) => ({
          code: d.abbreviation.toLowerCase(),
          name: d.name,
        })),
      )
      .find((d) => d.code === dept)?.name ?? dept;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleApproveStudent = async (studentId: number) => {
    setApprovingId(studentId);
    try {
      const res = await approveStudent(studentId);
      toast.success(res.message || "Student approved successfully");
      await refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectStudent = async (studentId: number) => {
    setRejectingId(studentId);
    try {
      const res = await rejectStudent(studentId);
      toast.success(res.message || "Student rejected");
      await refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRejectingId(null);
    }
  };

  // Mobile card component for better mobile experience
  const MobileStudentCard = ({
    student,
    index,
  }: {
    student: any;
    index: number;
  }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {student.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            #{index + 1} • {student.reg_number}
          </p>
        </div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
          {student.department.toUpperCase()}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email:</p>
        <p className="text-sm text-gray-900 dark:text-gray-100 break-all">
          {student.email}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50 text-xs py-2 min-h-[36px]"
          disabled={approvingId === student.id}
          onClick={() => handleApproveStudent(student.id)}
        >
          {approvingId === student.id ? (
            <div className="h-3 w-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-1" />
          ) : (
            <CheckCircle className="w-3 h-3 mr-1" />
          )}
          Approve
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 text-xs py-2 min-h-[36px]"
          disabled={rejectingId === student.id}
          onClick={() => handleRejectStudent(student.id)}
        >
          {rejectingId === student.id ? (
            <div className="h-3 w-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-1" />
          ) : (
            <XCircle className="w-3 h-3 mr-1" />
          )}
          Reject
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 lg:p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6 px-2">
          Pending Applications For{" "}
          <span className="text-green-700 dark:text-green-400">
            {deptFullName.toUpperCase()}
          </span>
        </h1>

        {isLoading ? (
          <Spinner />
        ) : students.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4">
              No Applications Found For {deptFullName.toUpperCase()}.
            </p>
            <Button
              onClick={refetch}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm sm:text-base"
            >
              Recheck
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile View - Card Layout */}
            <div className="block lg:hidden">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {students.length} application
                  {students.length !== 1 ? "s" : ""} found
                </p>
              </div>
              {students.map((student, index) => (
                <MobileStudentCard
                  key={student.id}
                  student={student}
                  index={index}
                />
              ))}
            </div>

            {/* Desktop/Tablet View - Table Layout */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          S/N
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Reg Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                      {students.map((student, index) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-600/50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {student.reg_number}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {student.department.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">
                            <div
                              className="max-w-[200px] truncate"
                              title={student.email}
                            >
                              {student.email}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            <div
                              className="max-w-[150px] truncate"
                              title={student.name}
                            >
                              {student.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                                disabled={approvingId === student.id}
                                onClick={() => handleApproveStudent(student.id)}
                              >
                                {approvingId === student.id ? (
                                  <div className="h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-1" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                )}
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                                disabled={rejectingId === student.id}
                                onClick={() => handleRejectStudent(student.id)}
                              >
                                {rejectingId === student.id ? (
                                  <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-1" />
                                ) : (
                                  <XCircle className="w-4 h-4 mr-1" />
                                )}
                                Reject
                              </Button>
                            </div>
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
