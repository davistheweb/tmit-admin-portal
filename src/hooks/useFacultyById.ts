import { useSearchParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import type { IFaculty } from "@/types/IFaculty";
import { GetFaculties } from "@/api/services/Academics";

export const useFacultyById = () => {
  const [searchParams] = useSearchParams();
  const facultyId = searchParams.get("facultyid") || "";
  const [faculty, setFaculty] = useState<IFaculty | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!facultyId) {
      setError("No faculty ID Provided");
      setFaculty(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await GetFaculties();
    if (typeof result === "string") {
      setError(result);
      setFaculty(null);
    } else {
      const selectedFaculty = result.find((f) => f.id.toString() === facultyId);

      if (!selectedFaculty) {
        setError("Faculty not found");
        setFaculty(null);
      } else {
        setError(null);
        setFaculty(selectedFaculty);
      }
    }
    setLoading(false);
  }, [facultyId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { faculty, isLoading, error, refetch: fetch };
};
