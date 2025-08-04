import React from "react";
import {
  CheckSquare,
  Users,
  CircleEllipsis,
  School,
  UserCheck,
  Building2,
  Calendar,
  Mail,
  FileText,
  BarChart3,
} from "lucide-react";

// Mock hook for demonstration
const useDashboardAnalytics = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    totals: {
      students: 2,
      approved: 2,
      pending: 3,
      staff: 1,
      admins: 1,
      faculties: 4,
      departments: 11,
    },
    students_per_department: [
      {
        id: 10,
        name: "Computer Science",
        code: "CMS",
        faculty_id: 4,
        created_at: "2025-08-03T11:38:04.000000Z",
        updated_at: "2025-08-03T11:38:04.000000Z",
        students_count: 2,
      },
      {
        id: 1,
        name: "General Nursing",
        code: "GNS",
        faculty_id: 1,
        created_at: "2025-08-03T11:30:43.000000Z",
        updated_at: "2025-08-03T11:30:43.000000Z",
        students_count: 0,
      },
      {
        id: 2,
        name: "Accountancy",
        code: "ACT",
        faculty_id: 2,
        created_at: "2025-08-03T11:31:48.000000Z",
        updated_at: "2025-08-03T11:31:48.000000Z",
        students_count: 0,
      },
      {
        id: 3,
        name: "Business Administration and Management",
        code: "BAM",
        faculty_id: 2,
        created_at: "2025-08-03T11:32:31.000000Z",
        updated_at: "2025-08-03T11:32:31.000000Z",
        students_count: 0,
      },
      {
        id: 4,
        name: "Public Administration",
        code: "PAD",
        faculty_id: 2,
        created_at: "2025-08-03T11:33:11.000000Z",
        updated_at: "2025-08-03T11:33:11.000000Z",
        students_count: 0,
      },
      {
        id: 5,
        name: "Community Health",
        code: "CHT",
        faculty_id: 3,
        created_at: "2025-08-03T11:34:12.000000Z",
        updated_at: "2025-08-03T11:34:12.000000Z",
        students_count: 0,
      },
      {
        id: 6,
        name: "Medical Laboratory Technology",
        code: "MLT",
        faculty_id: 3,
        created_at: "2025-08-03T11:34:35.000000Z",
        updated_at: "2025-08-03T11:34:35.000000Z",
        students_count: 0,
      },
      {
        id: 7,
        name: "Health Information Technology",
        code: "HIM",
        faculty_id: 3,
        created_at: "2025-08-03T11:34:58.000000Z",
        updated_at: "2025-08-03T11:34:58.000000Z",
        students_count: 0,
      },
      {
        id: 8,
        name: "Electrical and Electronics Engineering",
        code: "EE",
        faculty_id: 4,
        created_at: "2025-08-03T11:36:49.000000Z",
        updated_at: "2025-08-03T11:36:49.000000Z",
        students_count: 0,
      },
      {
        id: 9,
        name: "Computer Engineering Technology",
        code: "CET",
        faculty_id: 4,
        created_at: "2025-08-03T11:37:46.000000Z",
        updated_at: "2025-08-03T11:37:46.000000Z",
        students_count: 0,
      },
      {
        id: 11,
        name: "Statistics",
        code: "STA",
        faculty_id: 4,
        created_at: "2025-08-03T11:38:19.000000Z",
        updated_at: "2025-08-03T11:38:19.000000Z",
        students_count: 0,
      },
    ],
    recent_students: [
      {
        reg_number: "TMIT/CSC/24/2021",
        name: "Josiah Davis",
        email: "josiahdave001@outlook.com",
        status: "active",
        created_at: "2025-08-03T17:43:57.000000Z",
      },
      {
        reg_number: "TMIT/CSC/25/2345",
        name: "Josiah Davis",
        email: "josiahdave001@gmail.com",
        status: "active",
        created_at: "2025-08-03T12:43:59.000000Z",
      },
    ],
  };

  return { data, loading, error: null };
};

const DashboardLoader: React.FC = () => (
  <div className="flex justify-center items-center py-20">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-12 w-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading Dashboard
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fetching your analytics data...
        </p>
      </div>
    </div>
  </div>
);

const EmptyState: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
      {description}
    </p>
  </div>
);

export const Index: React.FC = () => {
  const { data, loading, error } = useDashboardAnalytics();

  const totals = data?.totals;
  const studentsPerDepartment = data?.students_per_department || [];
  const recentStudents = data?.recent_students || [];

  if (loading) {
    return <DashboardLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Unable to Load Data
          </h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Dashboard Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Real-time insights into your institutional data
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            label="Total Students"
            value={totals?.students ?? 0}
            icon={<Users className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            label="Approved Students"
            value={totals?.approved ?? 0}
            icon={<CheckSquare className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            label="Pending Students"
            value={totals?.pending ?? 0}
            icon={<CircleEllipsis className="w-6 h-6 text-amber-600" />}
            bgColor="bg-amber-50 dark:bg-amber-900/20"
          />
          <StatCard
            label="Administrators"
            value={totals?.admins ?? 0}
            icon={<UserCheck className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            label="Faculties"
            value={totals?.faculties ?? 0}
            icon={<Building2 className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            label="Departments"
            value={totals?.departments ?? 0}
            icon={<School className="w-6 h-6 text-green-500" />}
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Students per Department - SHOWING ALL DEPARTMENTS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    All Departments ({studentsPerDepartment.length})
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Complete list of all departments
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              {studentsPerDepartment.length === 0 ? (
                <EmptyState
                  title="No Departments Found"
                  description="No department data available at the moment."
                  icon={<School className="w-8 h-8 text-gray-400" />}
                />
              ) : (
                <div className="space-y-3">
                  {studentsPerDepartment.map((dept) => (
                    <div
                      key={dept.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          {dept.code}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {dept.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {dept.students_count} student
                            {dept.students_count !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {dept.students_count}
                        </div>
                        <div className="w-12 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.max(
                                (dept.students_count /
                                  Math.max(
                                    ...studentsPerDepartment.map(
                                      (d) => d.students_count
                                    ),
                                    1
                                  )) *
                                  100,
                                5
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Recent Students
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Latest student registrations
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {recentStudents.length === 0 ? (
                <EmptyState
                  title="No Recent Students"
                  description="No recent student registrations found."
                  icon={<Users className="w-8 h-8 text-gray-400" />}
                />
              ) : (
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                          {student.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                            <p className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                              {student.name}
                            </p>
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-medium self-start ${
                                student.status === "active"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {student.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400 sm:max-w-xs">
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate">{student.reg_number}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span className="whitespace-nowrap">
                            {new Date(student.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  bgColor = "bg-gray-50 dark:bg-gray-800",
}) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`p-3 ${bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-500 transition-all duration-300">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
