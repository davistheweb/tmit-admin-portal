import React, { createContext, useEffect, useState, useCallback } from "react";
import {
  GetPendingStudents,
} from "@/api/services/GetPendingStudents";
import type { IPendingStudent } from "@/types/IPendingStudent";


interface PendingStudentsContextType {
  students: IPendingStudent[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const PendingStudentsContext = createContext<
  PendingStudentsContextType | undefined
>(undefined);

export const PendingStudentsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [students, setStudents] = useState<IPendingStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await GetPendingStudents();

      if (typeof result === "string") {
        setError(result);
        setStudents([]);
      } else {
        setStudents(result);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch students" + err);
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingStudents();
  }, [fetchPendingStudents]);

  return (
    <PendingStudentsContext.Provider
      value={{
        students,
        isLoading,
        error,
        refetch: fetchPendingStudents,
      }}
    >
      {children}
    </PendingStudentsContext.Provider>
  );
};

export { PendingStudentsContext };
