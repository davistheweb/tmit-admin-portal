import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ConfirmFormResetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmFormResetModal: React.FC<ConfirmFormResetModalProps> = ({
  open,
  setOpen,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 sm:p-6 z-50">
        <div
          ref={modalRef}
          className="w-full sm:max-w-[425px] bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Confirm Form Reset
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
          <p className="text-sm text-gray-800 uppercase mb-6">
            Are you sure you want to reset the form? All entered data will be
            lost.
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              No
            </Button>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmFormResetModal;
