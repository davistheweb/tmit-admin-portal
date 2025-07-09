import React from "react";
import { Menu, CheckCircle, XCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const dummyData = [
  {
    regNum: "TMIT/CSC/23/0001",
    email: "josiahdave@example.com",
    name: "Davis",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0002",
    email: "davis@example.com",
    name: "Davis ",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
];

export const Applications: React.FC = () => {
  const isMobile = useIsMobile();


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-4">
        {isMobile && (
          <button>
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-2xl font-bold">Admissions Applications</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left p-3 border-b dark:border-gray-700">
                S/N
              </th>
              <th className="text-left p-3 border-b dark:border-gray-700">
                Reg Number
              </th>
              <th className="text-left p-3 border-b dark:border-gray-700">
                Email
              </th>
              <th className="text-left p-3 border-b dark:border-gray-700">
                Name
              </th>
              <th className="text-left p-3 border-b dark:border-gray-700">
                Status
              </th>
              <th className="text-left p-3 border-b dark:border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((student, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-3 border-b dark:border-gray-700">
                  {index + 1}
                </td>
                <td className="p-3 border-b dark:border-gray-700">
                  {student.regNum}
                </td>
                <td className="p-3 border-b dark:border-gray-700">
                  {student.email}
                </td>
                <td className="p-3 border-b dark:border-gray-700">
                  {student.name}
                </td>
                <td className="p-3 border-b dark:border-gray-700 text-yellow-600">
                  {student.status}
                </td>
                <td className="p-3 border-b dark:border-gray-700 space-x-2">
                  <button className="text-green-600 hover:underline inline-flex items-center cursor-pointer">
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                  </button>
                  <button className="text-red-600 hover:underline inline-flex items-center cursor-pointer">
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
