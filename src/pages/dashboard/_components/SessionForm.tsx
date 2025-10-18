"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sessionSchema,
  type SessionFormData,
  type Session,
} from "@/lib/validators/SessionFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

interface SessionFormProps {
  onSubmit: (data: SessionFormData) => Promise<void>;
  initialData?: Session;
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function SessionForm({
  onSubmit,
  initialData,
  isLoading = false,
  title = "Create Session",
  description = "Add a new academic session",
}: SessionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: initialData || {
      name: "",
      start_date: "",
      end_date: "",
      is_active: false,
    },
  });

  const isActive = watch("is_active");

  const handleFormSubmit = async (data: SessionFormData) => {
    await onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Session Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Session Name</Label>
            <Input
              id="name"
              placeholder="e.g., 2025/2026"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              {...register("start_date")}
              className={errors.start_date ? "border-destructive" : ""}
            />
            {errors.start_date && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.start_date.message}
              </div>
            )}
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              type="date"
              {...register("end_date")}
              className={errors.end_date ? "border-destructive" : ""}
            />
            {errors.end_date && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.end_date.message}
              </div>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3 rounded-lg border border-border p-4">
            <Checkbox
              id="is_active"
              {...register("is_active")}
              className="h-5 w-5"
            />
            <Label htmlFor="is_active" className="flex-1 cursor-pointer">
              <span className="font-medium">Activate Now</span>
              <p className="text-sm text-muted-foreground">
                {isActive
                  ? "This session will be active immediately"
                  : "Session will be inactive"}
              </p>
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isLoading
              ? "Saving..."
              : initialData
              ? "Update Session"
              : "Create Session"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
