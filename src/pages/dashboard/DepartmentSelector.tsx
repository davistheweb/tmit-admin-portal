import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { faculties } from "@/data";
import { schoolLogo } from "@/assets";

const schema = z
  .object({
    faculty: z.string().nonempty("please select a faculty"),
    department: z.string().nonempty("please select a department"),
  })
  .refine(
    (v) =>
      !!faculties
        .find((f) => f.abbreviation === v.faculty)
        ?.departments.find((d) => d.abbreviation === v.department),
    { path: ["department"], message: "invalid department for that faculty" },
  );

type FormValues = z.infer<typeof schema>;

export const DepartmentSelector: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedFaculty = watch("faculty");
  useEffect(() => {
    resetField("department");
  }, [selectedFaculty, resetField]);

  const onSubmit = ({ department }: FormValues) => {
    navigate(`/dashboard/applications?dept=${department.toLowerCase()}`);
  };

  const depts =
    faculties.find((f) => f.abbreviation === selectedFaculty)?.departments ??
    [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
    >
      {/* ——— School Header ——— */}
      <div className="flex items-center justify-center mb-8">
        <img
          src={schoolLogo}
          alt="School Logo"
          className="h-12 w-12 mr-4 object-contain"
        />
        <span className="text-1xl font-bold">
          THOMAS MCGETTRICK INSTITUTE OF TECHNOLOGY
        </span>
      </div>

      <h2 className="text-2xl font-medium text-center mb-6">
        Please Select Department to proceed
      </h2>

      {/* Faculty */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-800 uppercase">
          faculty
        </label>
        <select
          {...register("faculty")}
          className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <option value="">Select Faculty</option>
          {faculties.map((f) => (
            <option key={f.abbreviation} value={f.abbreviation}>
              {f.name.toUpperCase()}
            </option>
          ))}
        </select>
        {errors.faculty && (
          <p className="mt-1 text-sm text-red-600 uppercase">
            {errors.faculty.message}
          </p>
        )}
      </div>

      {/* Department */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-800 uppercase">
          department
        </label>
        <select
          {...register("department")}
          disabled={!selectedFaculty}
          className="w-full px-4 py-3 border-2 border-green-700 rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <option value="">
            {selectedFaculty ? "Select Department" : "Select Faculty First"}
          </option>
          {depts.map((d) => (
            <option key={d.abbreviation} value={d.abbreviation}>
              {d.name.toUpperCase()}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="mt-1 text-sm text-red-600 lowercase">
            {errors.department.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Proceeding…" : "Proceed"}
      </button>
    </form>
  );
};
