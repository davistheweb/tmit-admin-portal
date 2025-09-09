import { GetAllRoutes } from "@/api/services/getAllRoutes";
import { GetProtectedRoutes } from "@/api/services/getProtectedRoutes";
import type { IProtectedRoutes, IRoutes } from "@/types/IAccessControl";
import { useEffect, useState, useCallback } from "react";

export const useAccessControls = () => {
  const [routes, setRoutes] = useState<IRoutes | null>(null);
  const [protectedRoutes, setProtectedRoutes] = useState<IProtectedRoutes[]>(
    [],
  );
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [routesResult, protectedRoutesResult] = await Promise.all([
        GetAllRoutes(),
        GetProtectedRoutes(),
      ]);
      setRoutes(routesResult);
      setProtectedRoutes(protectedRoutesResult);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setRoutes(null);
      setProtectedRoutes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  console.log(routes);
  console.log(protectedRoutes);

  return { routes, protectedRoutes, isLoading, error, refetch: fetch };
};
