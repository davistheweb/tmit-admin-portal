import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const dummyData = [
  {
    regNum: "TMIT/CSC/23/0001",
    email: "josiahdave@example.com",
    name: "Davis",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  },
  {
    regNum: "TMIT/CSC/23/0003",
    email: "Imma@example.com",
    name: "Imma obe",
    status: "pending",
  }
];

export const Applications: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">
          Admissions Applications
        </h1>
      </div>

      {/* Responsive scrollable table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
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
                <td className="p-3 border-b dark:border-gray-700 text-yellow-600 capitalize">
                  {student.status}
                </td>
                <td className="p-3 border-b dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md hover:bg-green-200 transition cursor-pointer">
                      <CheckCircle className="w-4 h-4 inline-block mr-1" />
                      Approve
                    </button>
                    <button className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition cursor-pointer">
                      <XCircle className="w-4 h-4 inline-block mr-1" />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
