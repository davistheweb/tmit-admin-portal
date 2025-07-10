import { PendingStudentsContext } from "@/contexts/PendingStudentsContext";
import { useContext } from "react";

export const usePendingStudents = () => {
  const context = useContext(PendingStudentsContext);
  if (!context) {
    throw new Error(
      "usePendingStudents must be used within a PendingStudentsProvider",
    );
  }
  return context;
};
