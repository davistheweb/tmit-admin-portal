import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  facultyFormSchema,
  type FacultyFormSchema,
} from "@/lib/validators/facultyFormSchema";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const FacultyForm: React.FC<{
  onSubmit: (data: FacultyFormSchema) => void;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FacultyFormSchema>({ resolver: zodResolver(facultyFormSchema) });
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const onFormSubmit = async (data: FacultyFormSchema) => {
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
        console.log("FacultyForm: Clicked outside modal");
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
        <button id="faculty-form" className="hidden" />
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 sm:p-6 z-50">
        <div
          ref={modalRef}
          className="sm:max-w-[425px] w-full bg-white p-6 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Add New Faculty
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => {
                  console.log("FacultyForm: Close button clicked");
                  setOpen(false);
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div className="space-y-4">
              <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                Faculty Name
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                placeholder="Enter faculty name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 uppercase">
                  {errors.name.message}
                </p>
              )}
              <label className="block mb-2 font-medium text-gray-800 uppercase text-sm">
                Faculty Code 
              </label>
              <input
                {...register("abbrev")}
                className="w-full px-4 py-3 border-2 border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
                placeholder="Enter Faculty code eg: (SMFS)"
              />
              {errors.abbrev && (
                <p className="mt-1 text-sm text-red-600 uppercase">
                  {errors.abbrev.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              {isSubmitting ? "Creating…" : "Create Faculty"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
