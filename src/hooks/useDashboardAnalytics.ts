import { useEffect, useState } from "react";
import {
  getDashboardAnalytics,
  type DashboardResponse,
} from "@/api/services/getDashboardAnalytics";

export const useDashboardAnalytics = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    const result = await getDashboardAnalytics();
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
