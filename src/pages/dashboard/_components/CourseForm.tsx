import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  courseFormSchema,
  type CourseFormSchema,
} from "@/lib/validators/courseFormSchema";
import { useSessionOptions } from "@/hooks/useSessionOptions";

interface CourseFormProps {
  onSubmit: (data: CourseFormSchema) => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CourseFormSchema>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      code: "",
      title: "",
      unit: 3,
      level: 100,
      semester: "First",
      session: "21",
    },
  });
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { sessionOptions, handleSessionChange } = useSessionOptions(setValue);

  const onFormSubmit = async (data: CourseFormSchema) => {
    await onSubmit(data);
    reset();
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button id="course-form" className="hidden" />
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 sm:p-6 z-50">
        <div
          ref={modalRef}
          className="sm:max-w-[425px] w-full bg-white p-6 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Add New Course
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                Course Code
              </label>
              <input
                {...register("code")}
                className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                placeholder="e.g., PHY101"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600 uppercase">
                  {errors.code.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                Course Title
              </label>
              <input
                {...register("title")}
                className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                placeholder="e.g., General Chemistry I"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 uppercase">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                  Unit
                </label>
                <input
                  type="number"
                  {...register("unit", { valueAsNumber: true })}
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                  placeholder="e.g., 3"
                />
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600 uppercase">
                    {errors.unit.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                  Level
                </label>
                <select
                  {...register("level", { valueAsNumber: true })}
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                >
                  {Array.from({ length: 6 }, (_, i) => 100 + i * 100).map(
                    (level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ),
                  )}
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600 uppercase">
                    {errors.level.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                  Semester
                </label>
                <select
                  {...register("semester")}
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                >
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                </select>
                {errors.semester && (
                  <p className="mt-1 text-sm text-red-600 uppercase">
                    {errors.semester.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                  Session
                </label>
                <select
                  {...register("session")}
                  onChange={handleSessionChange}
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                >
                  {sessionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.session && (
                  <p className="mt-1 text-sm text-red-600 uppercase">
                    {errors.session.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? "Creating…" : "Add Course"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
