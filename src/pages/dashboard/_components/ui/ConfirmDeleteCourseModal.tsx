import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ConfirmDeleteCourseModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  courseTitle: string;
}

const ConfirmDeleteCourseModal: React.FC<ConfirmDeleteCourseModalProps> = ({
  open,
  setOpen,
  onConfirm,
  courseTitle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close modal
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
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 p-3 sm:p-4 lg:p-6 z-50">
        <div
          ref={modalRef}
          className="w-full max-w-[90vw] sm:max-w-[425px] bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
              Confirm Delete Course
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </DialogClose>
          </div>
          <p className="text-xs sm:text-sm text-gray-800 uppercase mb-4 sm:mb-6">
            Are you sure you want to delete the course "{courseTitle}"? This
            action cannot be undone.
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors duration-200 cursor-pointer"
            >
              No
            </Button>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteCourseModal;
