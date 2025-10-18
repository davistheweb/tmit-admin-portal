import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function ManageFeesPage() {
  const navigate = useNavigate();

  const departments = [
    {
      id: "nursing",
      name: "Nursing Department",
      description: "Manage fees for nursing students",
      icon: GraduationCap,
      route: "/dashboard/bursary/manage-fees/nursing",
      color: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      id: "other",
      name: "Other Departments",
      description: "Manage fees for other departments",
      icon: Building2,
      route: "/dashboard/bursary/manage-fees/other-department",
      color: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Manage Fees
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Select a department to manage their fees
          </p>
        </div>

        {/* Department Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-green-500"
              onClick={() => navigate(dept.route)}
            >
              <CardHeader className="space-y-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center`}
                >
                  <dept.icon className={`w-8 h-8 ${dept.iconColor}`} />
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                  {dept.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {dept.description}
                </p>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(dept.route);
                  }}
                >
                  Manage Fees
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
