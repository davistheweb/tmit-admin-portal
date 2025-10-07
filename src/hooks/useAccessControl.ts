import { GetAllRoutes, GetProtectedRoutes } from "@/api/services/AccessControl";
import type { IProtectedRoutes, IRoutes } from "@/types/IAccessControl";
import { useEffect, useState, useCallback } from "react";

export const useAccessControls = () => {
  const [routes, setRoutes] = useState<IRoutes | null>(null);
  const [protectedRoutes, setProtectedRoutes] = useState<IProtectedRoutes[]>(
    []
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

    const refetchInterval = setInterval(async () => {
      try {
        const protectedRoutesResult = await GetProtectedRoutes();

        setProtectedRoutes(protectedRoutesResult);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setRoutes(null);
        setProtectedRoutes([]);
      }
    }, 3000);

    return () => clearInterval(refetchInterval);
  }, [fetch]);

  console.log(routes);
  console.log(protectedRoutes);

  return { routes, protectedRoutes, isLoading, error, refetch: fetch };
};
