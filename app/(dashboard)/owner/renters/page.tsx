"use client";

import { useState } from "react";
import { mockRenters } from "@/lib/owner-mock-data";
import { Renter } from "@/types/owner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Eye,
  Mail,
  Phone,
  Download,
  Edit,
  Trash2,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";
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

export default function RentersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [renterToDelete, setRenterToDelete] = useState<Renter | null>(null);

  // Filter renters
  const filteredRenters = mockRenters.filter((renter) => {
    const matchesSearch =
      renter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      renter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      renter.propertyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPayment =
      paymentFilter === "all" || renter.paymentStatus === paymentFilter;

    return matchesSearch && matchesPayment;
  });

  const handleDeleteRenter = (renter: Renter) => {
    setRenterToDelete(renter);
  };

  const confirmDelete = () => {
    if (renterToDelete) {
      toast.success(`Renter ${renterToDelete.name} removed successfully`);
      setRenterToDelete(null);
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      paid: "default",
      pending: "secondary",
      overdue: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Renters</h1>
          <p className="text-muted-foreground">
            Manage your tenants and rental agreements
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Renter
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Renters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRenters.length}</div>
            <p className="text-xs text-muted-foreground">Active tenants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockRenters.filter((r) => r.paymentStatus === "paid").length}
            </div>
            <p className="text-xs text-muted-foreground">On-time payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockRenters.filter((r) => r.paymentStatus === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockRenters.filter((r) => r.paymentStatus === "overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires action</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Renters ({filteredRenters.length})</CardTitle>
              <CardDescription>
                View and manage your tenant information
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Renters</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search renters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Renter</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Rent Amount</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Next Payment</TableHead>
                      <TableHead>Contract End</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRenters.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          No renters found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRenters.map((renter) => (
                        <TableRow key={renter.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{renter.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{renter.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {renter.documentId}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{renter.propertyName}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[150px]">
                                  {renter.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {renter.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${(renter.rentAmount / 1000000).toFixed(1)}M
                          </TableCell>
                          <TableCell>
                            {getPaymentStatusBadge(renter.paymentStatus)}
                          </TableCell>
                          <TableCell>
                            {format(renter.nextPaymentDate, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            {format(renter.contractEnd, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Renter
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Contract
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteRenter(renter)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove Renter
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="text-center py-8 text-muted-foreground">
                Showing only active renters with valid contracts
              </div>
            </TabsContent>

            <TabsContent value="issues">
              <div className="text-center py-8 text-muted-foreground">
                Showing only renters with overdue payments or issues
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional Information Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expiring Contracts</CardTitle>
            <CardDescription>
              Contracts expiring in the next 3 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRenters
                .filter((r) => {
                  const monthsUntilExpiry =
                    (r.contractEnd.getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24 * 30);
                  return monthsUntilExpiry <= 12 && monthsUntilExpiry > 0;
                })
                .map((renter) => (
                  <div
                    key={renter.id}
                    className="flex items-center justify-between pb-3 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{renter.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{renter.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {renter.propertyName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {format(renter.contractEnd, "MMM d, yyyy")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil(
                          (renter.contractEnd.getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24 * 30)
                        )}{" "}
                        months left
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>
              Monthly rent collection overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm">Expected This Month</span>
                <span className="font-medium">
                  $
                  {(
                    mockRenters.reduce((sum, r) => sum + r.rentAmount, 0) / 1000000
                  ).toFixed(1)}
                  M
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm text-green-600">Collected</span>
                <span className="font-medium text-green-600">
                  $
                  {(
                    mockRenters
                      .filter((r) => r.paymentStatus === "paid")
                      .reduce((sum, r) => sum + r.rentAmount, 0) / 1000000
                  ).toFixed(1)}
                  M
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm text-yellow-600">Pending</span>
                <span className="font-medium text-yellow-600">
                  $
                  {(
                    mockRenters
                      .filter((r) => r.paymentStatus === "pending")
                      .reduce((sum, r) => sum + r.rentAmount, 0) / 1000000
                  ).toFixed(1)}
                  M
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600">Overdue</span>
                <span className="font-medium text-red-600">
                  $
                  {(
                    mockRenters
                      .filter((r) => r.paymentStatus === "overdue")
                      .reduce((sum, r) => sum + r.rentAmount, 0) / 1000000
                  ).toFixed(1)}
                  M
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!renterToDelete} onOpenChange={() => setRenterToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove <span className="font-semibold">{renterToDelete?.name}</span>{" "}
              from your property. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
