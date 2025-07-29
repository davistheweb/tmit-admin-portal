import { useEffect, useState, useCallback } from "react";
import { GetFaculties } from "@/api/services/GetFaculties";
import type { IFaculty } from "@/types/IFaculty";

export const useFaculties = () => {
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await GetFaculties();
      if (typeof result === "string") {
        console.error("useFaculties error:", result);
        setError(result);
        setFaculties([]);
      } else {
        console.log("useFaculties fetched faculties:", result);
        setError(null);
        setFaculties(result || []);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("useFaculties unexpected error:", message, err);
      setError("Failed to fetch faculties: " + message);
      setFaculties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { faculties, isLoading, error, refetch: fetch };
};
