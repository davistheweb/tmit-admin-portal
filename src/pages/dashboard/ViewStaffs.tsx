import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  FileText,
} from "lucide-react";
import { useStaffs } from "@/hooks/useStaffs";
import Loader from "./_components/ui/Loader";
import { Link } from "react-router";

export default function ViewStaffsPage() {
  const { data, loading, error, refetch } = useStaffs();

  if (loading)
    return (
      <Loader
        title="Getting Staffs"
        subtitle="Loading staffs from server....."
      />
    );

  if (error) {
    return (
      <div className="flex items-center justify-center flex-col gap-5 py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Unable to Load Data
          </h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>

        <Button
          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm py-2 cursor-pointer"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                View Staffs
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage school staff members and their permissions
              </p>
            </div>
          </div>
          {/* <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm py-2 cursor-pointer">
            <UserPlus className="mr-1 h-4 w-4" />
            Add Staff
          </Button> */}
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-primary">
                {data?.data.length}
              </div>
            </CardContent>
          </Card>
          {/* <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">
                {new Set(staffList.map((s) => s.role.name)).size}
              </div>
            </CardContent>
          </Card> */}
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0 sm:p-6">
            {/* Mobile Cards */}
            <div className="block lg:hidden px-4 sm:px-6 pb-6">
              <div className="mb-4 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {data?.data.length} staff member
                  {data?.data.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="space-y-4">
                {data?.data.map((staff) => (
                  <Card
                    key={staff.id}
                    className="border border-muted shadow-sm"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="min-w-0">
                            <div className="font-medium text-sm sm:text-base truncate">
                              {staff.name}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground truncate">
                              {staff.email}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {staff.roles.length} Roles
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {staff.permissions.length} permissions
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <Link to={`${staff.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Staff
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">
                        Staff Member
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">Role</TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Permissions
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.map((staff) => (
                      <TableRow key={staff.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {/* <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={staff.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {staff.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar> */}
                            <div className="min-w-0">
                              <div className="font-medium text-sm sm:text-base truncate">
                                {staff.name}
                              </div>
                              <div className="text-xs sm:text-sm text-muted-foreground truncate">
                                {staff.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {staff.roles.length} Roles
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {staff.permissions.length} permissions
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="cursor-pointer"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                <Link to={`${staff.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Staff
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Staff
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
