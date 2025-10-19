// pages/dashboard/FeeStructureManagement.tsx
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feeStructureService } from "@/api/services/FeeStructures";
import { useSessions } from "@/hooks/useSessions";
import { useFaculties } from "@/hooks/useFaculties";
import type {
  FeeStructure,
  FeeStructureFormData,
} from "@/lib/validators/FeeStructureSchema";
import { feeStructureSchema } from "@/lib/validators/FeeStructureSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Pencil,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface FilterState {
  department_id?: number;
  session_id?: number;
  level?: number;
}

export default function FeeStructureManagement() {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingFeeStructure, setEditingFeeStructure] = useState<
    FeeStructure | undefined
  >();
  const [filters, setFilters] = useState<FilterState>({});

  const {
    sessions,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useSessions();
  const {
    faculties,
    isLoading: facultiesLoading,
    error: facultiesError,
  } = useFaculties();

  const form = useForm<FeeStructureFormData>({
    resolver: zodResolver(feeStructureSchema),
    defaultValues: {
      department_id: undefined,
      session_id: undefined,
      level: undefined,
      amount: undefined,
      installment_first: undefined,
      installment_second: undefined,
      allow_installment: false,
      description: "",
    },
  });

  const fetchFeeStructures = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await feeStructureService.getFeeStructures({
        ...filters,
        page: currentPage,
      });
      setFeeStructures(response.data);
      setTotalPages(response.last_page);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch fee structures";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchFeeStructures();
  }, [fetchFeeStructures]);

  useEffect(() => {
    if (editingFeeStructure) {
      form.reset({
        department_id: editingFeeStructure.department_id,
        session_id: editingFeeStructure.session_id,
        level: editingFeeStructure.level,
        amount: Number(editingFeeStructure.amount),
        installment_first: editingFeeStructure.installment_first
          ? Number(editingFeeStructure.installment_first)
          : undefined,
        installment_second: editingFeeStructure.installment_second
          ? Number(editingFeeStructure.installment_second)
          : undefined,
        allow_installment: editingFeeStructure.allow_installment,
        description: editingFeeStructure.description,
      });
    } else {
      form.reset({
        department_id: undefined,
        session_id: undefined,
        level: undefined,
        amount: undefined,
        installment_first: undefined,
        installment_second: undefined,
        allow_installment: false,
        description: "",
      });
    }
  }, [editingFeeStructure, form]);

  const handleCreateNew = () => {
    setEditingFeeStructure(undefined);
    setFormDialogOpen(true);
  };

  const handleEdit = (feeStructure: FeeStructure) => {
    setEditingFeeStructure(feeStructure);
    setFormDialogOpen(true);
  };

  const handleSubmit = async (data: FeeStructureFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (editingFeeStructure) {
        await feeStructureService.updateFeeStructure(
          editingFeeStructure.id,
          data
        );
        toast.success("Fee structure updated successfully");
      } else {
        await feeStructureService.createFeeStructure(data);
        toast.success("Fee structure created successfully");
      }
      setFormDialogOpen(false);
      setEditingFeeStructure(undefined);
      form.reset();
      await fetchFeeStructures();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save fee structure";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await feeStructureService.deleteFeeStructure(id);
      toast.success("Fee structure deleted successfully");
      await fetchFeeStructures();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete fee structure";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value && value !== "all" ? Number(value) : undefined,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(Number(amount));
  };

  const departments = faculties.flatMap((faculty) => faculty.departments || []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Fee Structure Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage fee structures for departments and sessions
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Fee Structure
          </Button>
        </div>

        {/* Error Alert */}
        {(error || sessionsError || facultiesError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || sessionsError || facultiesError}
            </AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="department-filter">Department</Label>
                <Select
                  value={filters.department_id?.toString() || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("department_id", value)
                  }
                  disabled={isLoading || facultiesLoading}
                >
                  <SelectTrigger id="department-filter">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="session-filter">Session</Label>
                <Select
                  value={filters.session_id?.toString() || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("session_id", value)
                  }
                  disabled={isLoading || sessionsLoading}
                >
                  <SelectTrigger id="session-filter">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    {sessions.map((session) => (
                      <SelectItem
                        key={session.id}
                        value={session.id.toString()}
                      >
                        {session.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level-filter">Level</Label>
                <Select
                  value={filters.level?.toString() || "all"}
                  onValueChange={(value) => handleFilterChange("level", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="level-filter">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {[100, 200, 300, 400, 500, 600].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Structures Display */}
        <Card>
          <CardContent className="p-0 sm:p-6">
            {feeStructures.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p>No fee structures found. Create one to get started.</p>
              </div>
            ) : (
              <>
                {/* Mobile: Cards */}
                <div className="block lg:hidden px-4 sm:px-6 pb-6">
                  <div className="space-y-4">
                    {feeStructures.map((fee) => (
                      <Card key={fee.id} className="border shadow-sm">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {fee.department.name}
                              </span>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(fee)}
                                  disabled={isLoading}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      disabled={isLoading}
                                      className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Fee Structure
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete the fee
                                        structure for "{fee.description}"? This
                                        action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className="flex gap-3 justify-end">
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => handleDelete(fee.id)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </div>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              Session: {fee.session.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Level: {fee.level}
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {formatCurrency(fee.amount)}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {fee.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              Installments:{" "}
                              {fee.allow_installment
                                ? `${formatCurrency(
                                    fee.installment_first!
                                  )} + ${formatCurrency(
                                    fee.installment_second!
                                  )}`
                                : "None"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Desktop: Table */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Session</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Installments</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeStructures.map((fee) => (
                        <TableRow key={fee.id} className="hover:bg-gray-50">
                          <TableCell>{fee.department.name}</TableCell>
                          <TableCell>{fee.session.name}</TableCell>
                          <TableCell>{fee.level}</TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            {formatCurrency(fee.amount)}
                          </TableCell>
                          <TableCell>{fee.description}</TableCell>
                          <TableCell>
                            {fee.allow_installment
                              ? `${formatCurrency(
                                  fee.installment_first!
                                )} + ${formatCurrency(fee.installment_second!)}`
                              : "None"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(fee)}
                                disabled={isLoading}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading}
                                    className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Fee Structure
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete the fee
                                      structure for "{fee.description}"? This
                                      action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="flex gap-3 justify-end">
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 hover:bg-red-700"
                                      onClick={() => handleDelete(fee.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog
          open={formDialogOpen}
          onOpenChange={(open) => {
            setFormDialogOpen(open);
            if (!open) form.reset();
          }}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingFeeStructure
                  ? "Edit Fee Structure"
                  : "Create Fee Structure"}
              </DialogTitle>
              <DialogDescription>
                {editingFeeStructure
                  ? "Update the fee structure details"
                  : "Create a new fee structure"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  <FormField
                    control={form.control}
                    name="department_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                          disabled={isLoading || facultiesLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem
                                key={dept.id}
                                value={dept.id.toString()}
                              >
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="session_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                          disabled={isLoading || sessionsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select session" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sessions.map((session) => (
                              <SelectItem
                                key={session.id}
                                value={session.id.toString()}
                              >
                                {session.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[100, 200, 300, 400, 500, 600].map((level) => (
                              <SelectItem key={level} value={level.toString()}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount (₦)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 150000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allow_installment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Allow Installments
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Enable installment payments for this fee
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch("allow_installment") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="installment_first"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Installment (₦)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 80000"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="installment_second"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Second Installment (₦)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 70000"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., School fees for 100 level Computer Science"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3 justify-end pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormDialogOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isLoading
                      ? "Saving..."
                      : editingFeeStructure
                      ? "Update Fee Structure"
                      : "Create Fee Structure"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
