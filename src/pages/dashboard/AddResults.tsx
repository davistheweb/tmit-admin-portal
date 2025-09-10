import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { useSessionOptions } from "@/hooks/useSessionOptions";
import ConfirmFormResetModal from "./_components/ui/ConfirmFormResetModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostResults } from "@/api/services/Academics";
import { resultsSchema, type ResultsForm } from "@/lib/validators/AcademicsSchema";

export const AddResults: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResultsForm>({
    resolver: zodResolver(resultsSchema),
    defaultValues: {
      reg_number: "",
      session: "",
      semester: "",
      results: [{ course_code: "", score: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "results",
  });

  const [isResetModalOpen, setResetModalOpen] = useState(false);

  const { sessionOptions, handleSessionChange } = useSessionOptions(setValue);

  const onSubmit = async (data: ResultsForm) => {
    const result = await PostResults(data);
    if ("errors" in result) {
      Object.entries(result.errors).forEach(([key, messages]) => {
        messages.forEach((message: string) => {
          if (key === "reg_number") {
            setError("reg_number", { type: "manual", message });
          } else if (key === "session") {
            setError("session", { type: "manual", message });
          } else if (key === "semester") {
            setError("semester", { type: "manual", message });
          } else if (key.startsWith("results.")) {
            const [_, index, field] = key.split(".");
            setError(`results.${index}.${field}` as any, {
              type: "manual",
              message,
            });
          }
        });
      });
      toast.error(result.message);
    } else {
      toast.success(result.message || "Results added successfully");
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Add Student Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Details */}
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="reg_number"
                    className="block mb-2 font-medium text-gray-800 uppercase text-sm"
                  >
                    Registration Number
                  </Label>
                  <Input
                    id="reg_number"
                    {...register("reg_number")}
                    placeholder="e.g., TMIT/CSC/24/2002"
                    className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                  />
                  <div className="min-h-[1.5rem]">
                    {errors.reg_number && (
                      <p className="mt-1 text-sm text-red-600 uppercase">
                        {errors.reg_number.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="session"
                      className="block mb-2 font-medium text-gray-800 uppercase text-sm"
                    >
                      Session
                    </Label>
                    <select
                      {...register("session")}
                      onChange={handleSessionChange}
                      className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                    >
                      <option value="" disabled>
                        Select Session
                      </option>
                      {sessionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="min-h-[1.5rem]">
                      {errors.session && (
                        <p className="mt-1 text-sm text-red-600 uppercase">
                          {errors.session.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="semester"
                      className="block mb-2 font-medium text-gray-800 uppercase text-sm"
                    >
                      Semester
                    </Label>
                    <select
                      {...register("semester")}
                      className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                    >
                      <option value="" disabled>
                        Select Semester
                      </option>
                      <option value="First">First</option>
                      <option value="Second">Second</option>
                    </select>
                    <div className="min-h-[1.5rem]">
                      {errors.semester && (
                        <p className="mt-1 text-sm text-red-600 uppercase">
                          {errors.semester.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Course Results
                </h2>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 sm:grid-cols-[2fr,1fr,auto] gap-4 p-4 bg-white border border-green-200 rounded-lg shadow-sm"
                  >
                    <div>
                      <Label
                        htmlFor={`results.${index}.course_code`}
                        className="block mb-2 font-medium text-gray-800 uppercase text-sm"
                      >
                        Course Code
                      </Label>
                      <Input
                        id={`results.${index}.course_code`}
                        {...register(`results.${index}.course_code`)}
                        placeholder="e.g., CHM101"
                        className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                      />
                      <div className="min-h-[1.5rem]">
                        {errors.results?.[index]?.course_code && (
                          <p className="mt-1 text-sm text-red-600 uppercase">
                            {errors.results[index].course_code.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor={`results.${index}.score`}
                        className="block mb-2 font-medium text-gray-800 uppercase text-sm"
                      >
                        Score (0-100)
                      </Label>
                      <Input
                        id={`results.${index}.score`}
                        type="number"
                        {...register(`results.${index}.score`, {
                          valueAsNumber: true,
                        })}
                        placeholder="e.g., 76"
                        className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                      />
                      <div className="min-h-[1.5rem]">
                        {errors.results?.[index]?.score && (
                          <p className="mt-1 text-sm text-red-600 uppercase">
                            {errors.results[index].score.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className="mt-8 sm:mt-0 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ course_code: "", score: 0 })}
                  className="w-full mt-5 sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Result
                </Button>
                <div className="min-h-[1.5rem]">
                  {errors.results && !errors.results[0] && (
                    <p className="mt-1 text-sm text-red-600 uppercase">
                      {errors.results.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  {isSubmitting ? "Submitting…" : "Add Results"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setResetModalOpen(true)}
                  className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <ConfirmFormResetModal
          open={isResetModalOpen}
          setOpen={setResetModalOpen}
          onConfirm={reset}
        />
      </div>
    </div>
  );
};
