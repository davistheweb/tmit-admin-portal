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
  departmentFormSchema,
  type DepartmentFormSchema,
} from "@/lib/validators/AcademicsSchema";

export const DepartmentForm: React.FC<{
  onSubmit: (data: DepartmentFormSchema) => void;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormSchema>({
    resolver: zodResolver(departmentFormSchema),
  });
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const onFormSubmit = async (data: DepartmentFormSchema) => {
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
        console.log("DepartmentForm: Clicked outside modal");
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
        <button id="department-form" className="hidden" />
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 sm:p-6 z-50">
        <div
          ref={modalRef}
          className="sm:max-w-[425px] w-full bg-white p-6 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Add New Department
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => {
                  console.log("DepartmentForm: Close button clicked");
                  setOpen(false);
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                Department Name
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                placeholder="Enter department name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 uppercase">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                Department Code
              </label>
              <input
                {...register("code")}
                className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                placeholder="Enter department code"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600 uppercase">
                  {errors.code.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              {isSubmitting ? "Creating…" : "Create Department"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
