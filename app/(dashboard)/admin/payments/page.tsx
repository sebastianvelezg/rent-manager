"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Eye,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock subscription data
const mockSubscriptions = [
  {
    id: "1",
    userName: "Carlos Rodríguez",
    userEmail: "carlos@email.com",
    plan: "Pro",
    status: "active",
    amount: 79000,
    billingCycle: "monthly",
    nextBilling: "2025-12-05",
    paymentMethod: "Credit Card",
    startDate: "2024-01-15",
  },
  {
    id: "2",
    userName: "María González",
    userEmail: "maria@email.com",
    plan: "Basic",
    status: "active",
    amount: 29000,
    billingCycle: "monthly",
    nextBilling: "2025-12-10",
    paymentMethod: "Nequi",
    startDate: "2024-03-20",
  },
  {
    id: "3",
    userName: "Jorge Ramírez",
    userEmail: "jorge@email.com",
    plan: "Enterprise",
    status: "active",
    amount: 150000,
    billingCycle: "monthly",
    nextBilling: "2025-12-01",
    paymentMethod: "Bank Transfer",
    startDate: "2023-11-10",
  },
  {
    id: "4",
    userName: "Ana Martínez",
    userEmail: "ana@email.com",
    plan: "Pro",
    status: "past_due",
    amount: 79000,
    billingCycle: "monthly",
    nextBilling: "2025-11-28",
    paymentMethod: "Credit Card",
    startDate: "2024-06-01",
  },
  {
    id: "5",
    userName: "Luis Fernández",
    userEmail: "luis@email.com",
    plan: "Basic",
    status: "canceled",
    amount: 29000,
    billingCycle: "monthly",
    nextBilling: "-",
    paymentMethod: "PSE",
    startDate: "2024-02-15",
  },
  {
    id: "6",
    userName: "Isabella Torres",
    userEmail: "isabella@email.com",
    plan: "Pro",
    status: "trial",
    amount: 0,
    billingCycle: "monthly",
    nextBilling: "2025-12-15",
    paymentMethod: "-",
    startDate: "2025-11-01",
  },
];

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter subscriptions
  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = planFilter === "all" || sub.plan.toLowerCase() === planFilter;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const activeSubscriptions = filteredSubscriptions.filter((s) => s.status === "active");
  const trialSubscriptions = filteredSubscriptions.filter((s) => s.status === "trial");
  const pastDueSubscriptions = filteredSubscriptions.filter((s) => s.status === "past_due");
  const canceledSubscriptions = filteredSubscriptions.filter((s) => s.status === "canceled");

  // Calculate stats
  const totalRevenue = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);
  const avgRevenuePerUser = activeSubscriptions.length > 0 ? totalRevenue / activeSubscriptions.length : 0;
  const churnRate = ((canceledSubscriptions.length / mockSubscriptions.length) * 100).toFixed(1);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string; icon: any }> = {
      active: { variant: "default", label: "Active", icon: CheckCircle },
      trial: { variant: "secondary", label: "Trial", icon: AlertCircle },
      past_due: { variant: "destructive", label: "Past Due", icon: XCircle },
      canceled: { variant: "outline", label: "Canceled", icon: XCircle },
    };
    const { variant, label, icon: Icon } = config[status] || config.active;
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getPlanBadge = (plan: string) => {
    const colors: Record<string, string> = {
      Basic: "bg-blue-100 text-blue-800",
      Pro: "bg-purple-100 text-purple-800",
      Enterprise: "bg-orange-100 text-orange-800",
    };
    return <Badge className={colors[plan] || ""}>{plan}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Payments</h1>
          <p className="text-muted-foreground">
            Manage app subscriptions and billing
          </p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Process Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From {activeSubscriptions.length} active subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per User</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgRevenuePerUser)}</div>
            <p className="text-xs text-muted-foreground">
              Average subscription value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {trialSubscriptions.length} in trial period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{churnRate}%</div>
            <p className="text-xs text-muted-foreground">
              {canceledSubscriptions.length} canceled
            </p>
            <Progress value={parseFloat(churnRate)} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
          <CardDescription>Breakdown by subscription tier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Basic", "Pro", "Enterprise"].map((plan) => {
              const count = activeSubscriptions.filter((s) => s.plan === plan).length;
              const percentage = activeSubscriptions.length > 0 ? (count / activeSubscriptions.length) * 100 : 0;
              return (
                <div key={plan} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPlanBadge(plan)}
                      <span className="text-sm text-muted-foreground">{count} subscribers</span>
                    </div>
                    <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Subscriptions ({filteredSubscriptions.length})</CardTitle>
              <CardDescription>
                Manage user subscriptions and billing
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
                <TabsTrigger value="all">All ({filteredSubscriptions.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({activeSubscriptions.length})</TabsTrigger>
                <TabsTrigger value="trial">Trial ({trialSubscriptions.length})</TabsTrigger>
                <TabsTrigger value="past_due">Past Due ({pastDueSubscriptions.length})</TabsTrigger>
                <TabsTrigger value="canceled">Canceled ({canceledSubscriptions.length})</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search subscribers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="past_due">Past Due</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {["all", "active", "trial", "past_due", "canceled"].map((tab) => {
              const tabSubscriptions =
                tab === "all" ? filteredSubscriptions :
                filteredSubscriptions.filter((s) => s.status === tab);

              return (
                <TabsContent key={tab} value={tab} className="m-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subscriber</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Billing Cycle</TableHead>
                          <TableHead>Next Billing</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tabSubscriptions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8">
                              No subscriptions found matching your criteria
                            </TableCell>
                          </TableRow>
                        ) : (
                          tabSubscriptions.map((subscription) => (
                            <TableRow key={subscription.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{subscription.userName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {subscription.userEmail}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                              <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                              <TableCell>
                                <p className="font-medium">{formatCurrency(subscription.amount)}</p>
                                <p className="text-xs text-muted-foreground">per month</p>
                              </TableCell>
                              <TableCell className="capitalize">{subscription.billingCycle}</TableCell>
                              <TableCell>{formatDate(subscription.nextBilling)}</TableCell>
                              <TableCell className="text-sm">{subscription.paymentMethod}</TableCell>
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
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      Update Payment
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Change Plan
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {subscription.status === "active" ? (
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => toast.success("Subscription canceled")}
                                      >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Cancel Subscription
                                      </DropdownMenuItem>
                                    ) : subscription.status === "canceled" ? (
                                      <DropdownMenuItem
                                        onClick={() => toast.success("Subscription reactivated")}
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Reactivate
                                      </DropdownMenuItem>
                                    ) : null}
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
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
