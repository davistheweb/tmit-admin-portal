import type React from "react";
import { Outlet } from "react-router";
import DashboardLayout from "./_components/layouts/DashboardLayout";

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </DashboardLayout>
  );
};
