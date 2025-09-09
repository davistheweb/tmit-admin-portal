import { useEffect, useState } from "react";
import { getStaffs } from "@/api/services/getStaffs";
import type { IStaffListResponse } from "@/types/IStaff";

export const useStaffs = () => {
  const [data, setData] = useState<IStaffListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    const result = await getStaffs();
    console.log("result froom createHook", result);

    if (typeof result === "string") {
      setError(result);
      setData(null);
    } else {
      setError(null);
      setData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refetch: fetch };
};
