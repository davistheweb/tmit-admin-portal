import { useEffect, useState, useCallback } from "react";
import { sessionService } from "@/api/services/Sessions";
import type { Session } from "@/lib/validators/SessionFormSchema";

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.getSessions();
      setSessions(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch sessions";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveSessions = useCallback(async () => {
    try {
      const data = await sessionService.getActiveSessions();
      setActiveSessions(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch active sessions";
      setError(message);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchSessions(), fetchActiveSessions()]);
  }, [fetchSessions, fetchActiveSessions]);

  return { sessions, activeSessions, isLoading, error, refetch: fetchSessions };
};
