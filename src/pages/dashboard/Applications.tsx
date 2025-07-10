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
import { usePendingStudents } from "@/hooks/usePendingStudents";
import { approveStudent } from "@/api/services/approveStudent";
import { rejectStudent } from "@/api/services/rejectStudent";
const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const Applications: React.FC = () => {
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);

  const { students, isLoading, error, refetch } = usePendingStudents();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleApproveStudent = async (studentId: number) => {
    try {
      setApprovingId(studentId);
      const res = await approveStudent(studentId);
      toast.success(
        res.message + ",.... refetching students list" ||
          "Student approved successfully",
      );

      await refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectStudent = async (studentId: number) => {
    try {
      setRejectingId(studentId);
      const res = await rejectStudent(studentId);
      toast.success(res.message + ",.... refetching students list");

      await refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setRejectingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">
          Admissions Applications
        </h1>
      </div>

      
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Reg Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-gray-500"
                  >
                    No student applications found.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.reg_number}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="capitalize text-yellow-600">
                      Pending
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
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
                          className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
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
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
