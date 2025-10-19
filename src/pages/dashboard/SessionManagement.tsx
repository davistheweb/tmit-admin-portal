// pages/SessionManagement.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sessionService } from "@/api/services/Sessions";
import { useSessions } from "@/hooks/useSessions";
import type {
  Session,
  SessionFormData,
} from "@/lib/validators/SessionFormSchema";
import { sessionSchema } from "@/lib/validators/SessionFormSchema";
import { SessionFormDialog } from "./_components/SessionForm";
import { SessionList } from "./_components/SessionList";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Plus } from "lucide-react";
import { toast } from "sonner";

export default function SessionManagement() {
  const { sessions, activeSessions, isLoading, error, refetch } = useSessions();
  const [editingSession, setEditingSession] = useState<Session | undefined>();
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
      is_active: false,
    },
  });

  useEffect(() => {
    if (editingSession) {
      form.reset({
        name: editingSession.name,
        start_date: editingSession.start_date.split("T")[0],
        end_date: editingSession.end_date.split("T")[0],
        is_active: editingSession.is_active,
      });
    } else {
      form.reset({
        name: "",
        start_date: "",
        end_date: "",
        is_active: false,
      });
    }
  }, [editingSession, form]);

  const handleCreateNew = () => {
    setEditingSession(undefined);
    setFormDialogOpen(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setFormDialogOpen(true);
  };

  const handleSubmit = async (data: SessionFormData) => {
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
      await refetch();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save session";
      toast.error(message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await sessionService.deleteSession(id);
      toast.success("Session deleted successfully");
      await refetch();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete session";
      toast.error(message);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await sessionService.toggleSessionActive(id);
      toast.success("Session status updated");
      await refetch();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to toggle session";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Session Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage academic sessions for your school
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
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
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <span className="font-medium text-green-500">
                {activeSessions.length} active session
                {activeSessions.length !== 1 ? "s" : ""}
              </span>
              {activeSessions.map((s) => (
                <div key={s.id} className="text-sm text-gray-500 mt-1">
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
