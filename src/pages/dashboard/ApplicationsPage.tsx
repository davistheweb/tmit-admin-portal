import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        }))
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">
        Pending Applications For{" "}
        <span className="text-green-700">{deptFullName.toUpperCase()}</span>
      </h1>

      {isLoading ? (
        <Spinner />
      ) : students.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No Applications Found For {deptFullName.toUpperCase()}.
          </p>
          <Button
            onClick={refetch}
            className="mt-4 cursor-pointer bg-green-500 hover:bg-green-600"
          >
            Recheck
          </Button>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Reg Number</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s, i) => (
                <TableRow key={s.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="lowercase">{s.reg_number}</TableCell>
                  <TableCell className="lowercase">
                    {s.department.toLowerCase()}
                  </TableCell>
                  <TableCell className="lowercase">{s.email}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                        disabled={approvingId === s.id}
                        onClick={() => handleApproveStudent(s.id)}
                      >
                        {approvingId === s.id ? (
                          <div className="h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-1" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
                        disabled={rejectingId === s.id}
                        onClick={() => handleRejectStudent(s.id)}
                      >
                        {rejectingId === s.id ? (
                          <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
