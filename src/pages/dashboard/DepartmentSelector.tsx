import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
// import { faculties } from "@/data";
import { schoolLogo } from "@/assets";
import { useFaculties } from "@/hooks/useFaculties";
import { Button } from "@/components/ui/button";

const SelectionsLoader: React.FC = () => (
  <div className="flex justify-center items-center py-20">
    <div className="flex flex-col items-center space-y-2">
      <div className="h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading Selections data...
      </p>
    </div>
  </div>
);
export const DepartmentSelector: React.FC = () => {
  const { faculties, isLoading, error, refetch } = useFaculties();

  const schema = z
    .object({
      faculty: z.string().nonempty("please select a faculty"),
      department: z.string().nonempty("please select a department"),
    })
    .refine(
      (v) =>
        !!faculties
          .find((f) => f.abbrev === v.faculty)
          ?.departments.find((d) => d.code === v.department),
      { path: ["department"], message: "invalid department for that faculty" }
    );

  type FormValues = z.infer<typeof schema>;

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
    faculties.find((f) => f.abbrev === selectedFaculty)?.departments ?? [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
    >
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

      {isLoading ? (
        <SelectionsLoader />
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
      ) : !faculties.length ? (
        <div className="text-center py-8 px-4">
          <p className="text-gray-500 text-sm sm:text-base mb-4">
            No faculties or department found
          </p>
          <Link
            to="/dashboard/academics"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm cursor-pointer transition-colors duration-200"
          >
            Create Faculty
          </Link>
        </div>
      ) : (
        <div>
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
                <option key={f.abbrev} value={f.abbrev}>
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
                <option key={d.code} value={d.code}>
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
        </div>
      )}
    </form>
  );
};
