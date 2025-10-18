import { useState, useEffect } from "react";
import { SessionForm } from "./_components/SessionForm";
import { SessionList } from "./_components/SessionList";
import { sessionService } from "@/api/services/Sessions";
import type { Session, SessionFormData } from "@/lib/validators/SessionFormSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function SessionManagement() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | undefined>();
  const [error, setError] = useState<string | null>(null);

  // Fetch all sessions
  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await sessionService.getSessions();
      setSessions(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch sessions";
      const fullMessage = `${message}. Please ensure the API server is running and VITE_API_URL is configured correctly.`;
      setError(fullMessage);
      toast.error(fullMessage);
      console.error("[v0] Fetch sessions error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch active sessions
  const fetchActiveSessions = async () => {
    try {
      console.log("[v0] Fetching active sessions...");
      const data = await sessionService.getActiveSessions();
      console.log("[v0] Active sessions fetched:", data);
      setActiveSessions(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch active sessions";
      const fullMessage = `${message}. Please ensure the API server is running and VITE_API_URL is configured correctly.`;
      console.error("[v0] Failed to fetch active sessions:", fullMessage);
      toast.error(fullMessage);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSessions();
    fetchActiveSessions();
  }, []);

  // Handle create/update session
  const handleSubmit = async (data: SessionFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (editingSession) {
        await sessionService.updateSession(editingSession.id, data);
        toast.success("Session updated successfully");
      } else {
        await sessionService.createSession(data);
        toast.success("Session created successfully");
      }

      setEditingSession(undefined);
      await fetchSessions();
      await fetchActiveSessions();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save session";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete session
  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await sessionService.deleteSession(id);
      toast.success("Session deleted successfully");
      await fetchSessions();
      await fetchActiveSessions();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete session";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggle session active
  const handleToggle = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await sessionService.toggleSessionActive(id);
      toast.success("Session status updated");
      await fetchSessions();
      await fetchActiveSessions();
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
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Session Management
          </h1>
          <p className="text-muted-foreground">
            Manage academic sessions for your school
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Active Sessions Summary */}
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

        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Sessions</TabsTrigger>
            <TabsTrigger value="create">
              {editingSession ? "Edit Session" : "Create Session"}
            </TabsTrigger>
          </TabsList>

          {/* All Sessions Tab */}
          <TabsContent value="all" className="space-y-4">
            <SessionList
              sessions={sessions}
              onEdit={setEditingSession}
              onDelete={handleDelete}
              onToggle={handleToggle}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* Create/Edit Session Tab */}
          <TabsContent value="create">
            <SessionForm
              onSubmit={handleSubmit}
              initialData={editingSession}
              isLoading={isLoading}
              title={editingSession ? "Edit Session" : "Create New Session"}
              description={
                editingSession
                  ? "Update the session details"
                  : "Add a new academic session to the system"
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
