import React from "react";
import { CheckSquare, Users, CircleEllipsis, School } from "lucide-react";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";

const DashboardLoader: React.FC = () => (
  <div className="flex justify-center items-center py-20">
    <div className="flex flex-col items-center space-y-2">
      <div className="h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading dashboard data...
      </p>
    </div>
  </div>
);

export const Index: React.FC = () => {
  const { data, loading, error } = useDashboardAnalytics();
  const totals = data?.totals;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mt-0 mt-16">
        {loading ? (
          <div className="col-span-full">
            <DashboardLoader />
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 text-sm">
            {error}
          </div>
        ) : (
          <>
            <StatCard
              label="Total Students"
              value={totals?.students ?? 0}
              icon={<Users className="w-6 h-6 text-blue-500" />}
              bg="bg-green-700"
              iconBg="bg-blue-500/10"
            />
            <StatCard
              label="Approved Students"
              value={totals?.approved ?? 0}
              icon={<CheckSquare className="w-6 h-6 text-emerald-500" />}
              bg="bg-green-700"
              iconBg="bg-emerald-500/10"
            />
            <StatCard
              label="Pending Students"
              value={totals?.pending ?? 0}
              icon={<CircleEllipsis className="w-6 h-6 text-yellow-500" />}
              bg="bg-green-700"
              iconBg="bg-yellow-500/10"
            />
            <StatCard
              label="Admins"
              value={totals?.admins ?? 0}
              icon={<Users className="w-6 h-6 text-purple-500" />}
              bg="bg-green-700"
              iconBg="bg-purple-500/10"
            />
            <StatCard
              label="Faculties"
              value={totals?.faculties ?? 0}
              icon={<School className="w-6 h-6 text-pink-500" />}
              bg="bg-green-700"
              iconBg="bg-pink-500/10"
            />
            <StatCard
              label="Departments"
              value={totals?.departments ?? 0}
              icon={<School className="w-6 h-6 text-orange-500" />}
              bg="bg-green-700"
              iconBg="bg-orange-500/10"
            />
          </>
        )}
      </div>
    </>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg?: string;
  iconBg?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  bg,
  iconBg,
}) => {
  return (
    <div
      className={`p-4 sm:p-6 ${
        bg || "bg-gray-800"
      } border border-black rounded-xl`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 ${iconBg || "bg-gray-600/10"} rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-white">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};
