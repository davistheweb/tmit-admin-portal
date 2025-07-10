import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { dummyData } from "@/data/dummyData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const Applications: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">
          Admissions Applications
        </h1>
      </div>

      {/* Scrollable table wrapper for mobile */}
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
            {dummyData.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.regNum}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell className="capitalize text-yellow-600">
                  {student.status}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-red-100 text-red-800 hover:bg-red-200"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
