import { useState, useEffect } from "react";
import api from "@/api/api";
import { type ICourse } from "@/types/ICourse";

export const useCoursesByDepartmentId = (departmentId: string | null) => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!departmentId) {
      setError("No department ID provided.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    api
      .get("/api/admin/courses", { params: { department_id: departmentId } })
      .then((response) => setCourses(response.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch courses."),
      )
      .finally(() => setIsLoading(false));
  }, [departmentId]);

  return { courses, isLoading, error, refetch: () => window.location.reload() };
};
