import { useEffect, useState, useCallback } from "react";

import type { IRole, IPermissions } from "@/types/IRolesAndPermissions";
import { GetRoles } from "@/api/services/getRoles";
import { GetPermissions } from "@/api/services/getPermissions";

export const useRolesAndPermissons = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [permissions, setPermissions] = useState<IPermissions[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [rolesResult, permissionsResult] = await Promise.all([
        GetRoles(),
        GetPermissions(),
      ]);
      setRoles(rolesResult);
      setPermissions(permissionsResult);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setRoles([]);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  console.log(roles);

  return { roles, permissions, isLoading, error, refetch: fetch };
};
