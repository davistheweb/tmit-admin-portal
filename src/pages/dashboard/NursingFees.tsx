"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router";

interface Fee {
  id: number;
  title: string;
  amount: number;
}

export default function NursingFees() {
  const navigate = useNavigate();

  const [fees, setFees] = useState<Fee[]>([
    { id: 1, title: "Tuition Fee", amount: 150000 },
    { id: 2, title: "Laboratory Fee", amount: 25000 },
    { id: 3, title: "Library Fee", amount: 10000 },
    { id: 4, title: "Sports Fee", amount: 5000 },
    { id: 5, title: "Medical Fee", amount: 15000 },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({ title: "", amount: "" });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateOrEdit = () => {
    if (isEditing && selectedFee) {
      setFees(
        fees.map((fee) =>
          fee.id === selectedFee.id
            ? { ...fee, title: formData.title, amount: Number(formData.amount) }
            : fee,
        ),
      );
    } else {
      const newFee: Fee = {
        id: fees.length + 1,
        title: formData.title,
        amount: Number(formData.amount),
      };
      setFees([...fees, newFee]);
    }
    setIsCreateOpen(false);
    setFormData({ title: "", amount: "" });
    setIsEditing(false);
    setSelectedFee(null);
  };

  const handleEdit = (fee: Fee) => {
    setSelectedFee(fee);
    setFormData({ title: fee.title, amount: fee.amount.toString() });
    setIsEditing(true);
    setIsCreateOpen(true);
  };

  const handleView = (fee: Fee) => {
    setSelectedFee(fee);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (fee: Fee) => {
    setSelectedFee(fee);
    setTimeout(() => {
      setIsDeleteOpen(true);
    }, 100);
  };

  const handleDeleteConfirm = () => {
    if (selectedFee) {
      setFees(fees.filter((fee) => fee.id !== selectedFee.id));
      setIsDeleteOpen(false);
      setSelectedFee(null);
    }
  };

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="mb-2 -ml-2"
              onClick={() => navigate("/dashboard/bursary/manage-fees")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Departments
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  Nursing Fees
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Manage fees for {"Nursing".toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <Dialog
            open={isCreateOpen}
            onOpenChange={(open) => {
              setIsCreateOpen(open);
              if (!open) {
                setFormData({ title: "", amount: "" });
                setIsEditing(false);
                setSelectedFee(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create New Fee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Fee" : "Create New Fee"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Fee Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Tuition Fee"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="e.g., 150000"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleCreateOrEdit}
                  disabled={!formData.title || !formData.amount}
                >
                  {isEditing ? "Update Fee" : "Create Fee"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Fees Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {fees.length} fee{fees.length !== 1 ? "s" : ""} configured
            </p>
          </CardContent>
        </Card>

        {/* Fees Table/Cards */}
        <Card>
          <CardContent className="p-0 sm:p-6">
            <div className="block lg:hidden px-4 sm:px-6 pb-6">
              <div className="space-y-4">
                {fees.map((fee) => (
                  <Card key={fee.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base truncate">
                            {fee.title}
                          </div>
                          <div className="text-lg font-bold text-green-600 mt-1">
                            {formatCurrency(fee.amount)}
                          </div>
                        </div>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(fee)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(fee)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteClick(fee)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((fee) => (
                    <TableRow key={fee.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{fee.title}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {formatCurrency(fee.amount)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(fee)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(fee)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-red-600"
                              onClick={() => handleDeleteClick(fee)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fee Details</DialogTitle>
            </DialogHeader>
            {selectedFee && (
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Fee Title</Label>
                  <p className="text-lg font-medium mt-1">
                    {selectedFee.title}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {formatCurrency(selectedFee.amount)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Fee ID</Label>
                  <p className="text-sm mt-1">#{selectedFee.id}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the fee "{selectedFee?.title}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteConfirm}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
