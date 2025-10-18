import { format } from "date-fns";
import type { Session } from "@/lib/validators/SessionFormSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2, Power, PowerOff } from "lucide-react";

interface SessionListProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export function SessionList({
  sessions,
  onEdit,
  onDelete,
  onToggle,
  isLoading = false,
}: SessionListProps) {
  if (!sessions?.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">
            No sessions found. Create one to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{session.name}</CardTitle>
                  <Badge variant={session.is_active ? "default" : "secondary"}>
                    {session.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription className="mt-1">
                  {format(new Date(session.start_date), "MMM dd, yyyy")} -{" "}
                  {format(new Date(session.end_date), "MMM dd, yyyy")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(session)}
                disabled={isLoading}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggle(session.id)}
                disabled={isLoading}
              >
                {session.is_active ? (
                  <>
                    <PowerOff className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Power className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Session</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{session.name}"? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(session.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
