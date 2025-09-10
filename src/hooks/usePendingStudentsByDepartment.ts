import { useSearchParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import type { IPendingStudent } from "@/types/IPendingStudent";
import { GetPendingStudentsByDepartment } from "@/api/services/Students";

export const usePendingStudentsByDepartment = () => {
  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept") || "";
  const [students, setStudents] = useState<IPendingStudent[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!dept) {
      setError("No department specified");
      setStudents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await GetPendingStudentsByDepartment(dept);
    if (typeof result === "string") {
      setError(result);
      setStudents([]);
    } else {
      setError(null);
      setStudents(result);
    }
    setLoading(false);
  }, [dept]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { students, isLoading, error, refetch: fetch, dept };
};
