import { useState, useEffect, useCallback } from "react";
import { sessionService } from "@/api/services/Sessions";
import type {
  Session,
  SessionFormData,
} from "@/lib/validators/SessionFormSchema";
import { SessionFormDialog } from "./_components/SessionForm";
import { SessionList } from "./_components/SessionList";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Plus } from "lucide-react";
import { toast } from "sonner";

export default function SessionManagement() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | undefined>();
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sessionService.getSessions();
      setSessions(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch sessions";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchActiveSessions = useCallback(async () => {
    try {
      const data = await sessionService.getActiveSessions();
      setActiveSessions(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch active sessions";
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
    fetchActiveSessions();
  }, [fetchSessions, fetchActiveSessions]);

  const handleCreateNew = () => {
    setEditingSession(undefined);
    setFormDialogOpen(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setFormDialogOpen(true);
  };

  const handleSubmit = async (data: SessionFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (editingSession) {
        await sessionService.updateSession(editingSession.id, data);
        toast.success("Session updated successfully");
      } else {
        await sessionService.createSession(data);
        toast.success("Session created successfully");
      }
      setEditingSession(undefined);
      setFormDialogOpen(false);
      await Promise.all([fetchSessions(), fetchActiveSessions()]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save session";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await sessionService.deleteSession(id);
      toast.success("Session deleted successfully");
      await Promise.all([fetchSessions(), fetchActiveSessions()]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete session";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await sessionService.toggleSessionActive(id);
      toast.success("Session status updated");
      await Promise.all([fetchSessions(), fetchActiveSessions()]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to toggle session";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Session Management
            </h1>
            <p className="text-muted-foreground">
              Manage academic sessions for your school
            </p>
          </div>
          <Button onClick={handleCreateNew} size="lg" disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {activeSessions.length > 0 && (
          <Alert className="border-accent bg-accent/5">
            <CheckCircle className="h-4 w-4 text-accent" />
            <AlertDescription>
              <span className="font-medium text-accent">
                {activeSessions.length} active session
                {activeSessions.length !== 1 ? "s" : ""}
              </span>
              {activeSessions.map((s) => (
                <div key={s.id} className="text-sm text-muted-foreground mt-1">
                  {s.name}
                </div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        <SessionList
          sessions={sessions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
          isLoading={isLoading}
        />

        <SessionFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          onSubmit={handleSubmit}
          initialData={editingSession}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
