import type React from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import DashboardLayout from "./_components/layouts/DashboardLayout";
import { PendingStudentsProvider } from "@/contexts/PendingStudentsContext";

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <PendingStudentsProvider>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 overflow-x-hidden">
          <Toaster richColors position="top-left" expand />
          <Outlet />
        </main>
      </PendingStudentsProvider>
    </DashboardLayout>
  );
};
