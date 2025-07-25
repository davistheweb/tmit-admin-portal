import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, LibraryBig } from "lucide-react";

export const Setup: React.FC = () => {
  const [facultyName, setFacultyName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");

  const [faculties, setFaculties] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const handleAddFaculty = async () => {
    if (!facultyName.trim()) return;

    const newFaculty = { id: Date.now().toString(), name: facultyName };
    setFaculties((prev) => [...prev, newFaculty]);
    setFacultyName("");
  };

  const handleAddDepartment = async () => {
    if (!departmentName.trim() || !selectedFacultyId) return;
    const newDept = {
      id: Date.now().toString(),
      name: departmentName,
      facultyId: selectedFacultyId,
    };
    setDepartments((prev) => [...prev, newDept]);
    setDepartmentName("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">School Setup</h1>

      {/* Faculty Section */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10 border">
        <div className="flex items-center gap-3 mb-5">
          <Building2 className="text-green-500" size={24} />
          <h2 className="text-xl font-semibold">Create Faculty</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <Label htmlFor="facultyName">Faculty Name</Label>
            <Input
              id="facultyName"
              placeholder="e.g. Faculty of Science"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
            />
          </div>
          <div>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleAddFaculty}
            >
              Add Faculty
            </Button>
          </div>
        </div>

        {/* Faculty List */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Existing Faculties</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {faculties.map((f) => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Department Section */}
      <section className="bg-white rounded-xl shadow-md p-6 border">
        <div className="flex items-center gap-3 mb-5">
          <LibraryBig className="text-green-500" size={24} />
          <h2 className="text-xl font-semibold">Create Department</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="facultySelect">Select Faculty</Label>
            <select
              id="facultySelect"
              value={selectedFacultyId}
              onChange={(e) => setSelectedFacultyId(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select Faculty --</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="departmentName">Department Name</Label>
            <Input
              id="departmentName"
              placeholder="e.g. Computer Science"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleAddDepartment}
            >
              Add Department
            </Button>
          </div>
        </div>

        {/* Department List */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Existing Departments</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {departments.map((d) => {
              const facultyName =
                faculties.find((f) => f.id === d.facultyId)?.name || "";
              return (
                <li key={d.id}>
                  {d.name}{" "}
                  <span className="text-gray-500">({facultyName})</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
