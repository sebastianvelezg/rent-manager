"use client";

import { useState } from "react";
import { renterPayments, currentProperty } from "@/lib/renter-mock-data";
import { Button } from "@/components/ui/button";
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
  CreditCard,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Calendar,
  Banknote,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function RenterPaymentsPage() {
  const [paymentMethod, setPaymentMethod] = useState("bancolombia");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const pendingPayment = renterPayments.find(p => p.status === "pending");
  const paidPayments = renterPayments.filter(p => p.status === "paid");
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);

  const handlePayment = () => {
    toast.success("Payment processed successfully!");
    setIsPaymentDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      paid: "default",
      pending: "secondary",
      overdue: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage your rent payments and payment history
          </p>
        </div>
      </div>

      {/* Current Payment Due */}
      {pendingPayment && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Payment Due
                </CardTitle>
                <CardDescription>
                  Your next rent payment is due soon
                </CardDescription>
              </div>
              <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make Payment</DialogTitle>
                    <DialogDescription>
                      Complete your rent payment for {currentProperty.name}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Amount to Pay</Label>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-3xl font-bold">
                          ${(pendingPayment.amount / 1000000).toFixed(1)}M COP
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(pendingPayment.dueDate, "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bancolombia">
                            Transferencia Bancolombia
                          </SelectItem>
                          <SelectItem value="nequi">Nequi</SelectItem>
                          <SelectItem value="daviplata">Daviplata</SelectItem>
                          <SelectItem value="pse">PSE</SelectItem>
                          <SelectItem value="card">Tarjeta de Crédito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> This is a demo. No actual payment will be
                        processed.
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsPaymentDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handlePayment}>Confirm Payment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-xl font-bold">
                    ${(pendingPayment.amount / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-lg font-medium">
                    {format(pendingPayment.dueDate, "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Banknote className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property</p>
                  <p className="text-lg font-medium">{currentProperty.name}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${(totalPaid / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              {paidPayments.length} payments completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingPayment ? (pendingPayment.amount / 1000000).toFixed(1) : "0"}M
            </div>
            <p className="text-xs text-muted-foreground">
              {pendingPayment
                ? format(pendingPayment.dueDate, "MMM d, yyyy")
                : "No pending payments"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">
              All payments made on time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View all your rent payment transactions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renterPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment.status)}
                            {getStatusBadge(payment.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${(payment.amount / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell>{format(payment.dueDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          {payment.paidDate
                            ? format(payment.paidDate, "MMM d, yyyy")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {payment.paymentMethod || "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {payment.invoiceUrl && (
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="paid">
              <div className="text-center py-8 text-muted-foreground">
                Showing only completed payments
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="text-center py-8 text-muted-foreground">
                Showing only pending payments
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Available options for making your rent payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Bank Transfer</h4>
                <p className="text-sm text-muted-foreground">
                  Direct transfer via Bancolombia, Davivienda, or other banks
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Banknote className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Digital Wallets</h4>
                <p className="text-sm text-muted-foreground">
                  Pay instantly with Nequi or Daviplata
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium">PSE</h4>
                <p className="text-sm text-muted-foreground">
                  Secure online bank payments through PSE
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <CreditCard className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Credit/Debit Card</h4>
                <p className="text-sm text-muted-foreground">
                  Pay with Visa, Mastercard, or American Express
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
