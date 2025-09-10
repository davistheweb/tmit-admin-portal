import { useCallback, useEffect, useState } from "react";
import { getStaffDetails } from "@/api/services/Staffs";
import type { IStaff } from "@/types/IStaff";

export const useStaffsDetails = (id: string | number | undefined) => {
  const [data, setData] = useState<IStaff | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const result = await getStaffDetails(id);
    if (typeof result === "string") {
      setError(result);
      setData(null);
    } else {
      setError(null);
      setData(result);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
};
