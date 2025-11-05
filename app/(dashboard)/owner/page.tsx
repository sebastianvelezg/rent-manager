"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  Wrench,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  ownerDashboardStats,
  ownerRecentActivity,
  ownerRevenueData,
  mockProperties,
  mockRenters,
  mockMaintenanceRequests,
} from "@/lib/owner-mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function OwnerDashboard() {
  const occupiedProperties = mockProperties.filter(p => p.status === "occupied");
  const availableProperties = mockProperties.filter(p => p.status === "available");
  const pendingMaintenance = mockMaintenanceRequests.filter(m => m.status !== "resolved" && m.status !== "closed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, Carlos! Here's what's happening with your properties.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownerDashboardStats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                {ownerDashboardStats.occupiedProperties} occupied •{" "}
                {ownerDashboardStats.availableProperties} available
              </span>
            </p>
            <Progress value={ownerDashboardStats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(ownerDashboardStats.monthlyRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +{ownerDashboardStats.revenueGrowth}% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Renters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownerDashboardStats.totalRenters}</div>
            <p className="text-xs text-muted-foreground">
              Across {ownerDashboardStats.occupiedProperties} properties
            </p>
            <div className="mt-2 flex gap-2">
              <Badge variant="default" className="text-xs">
                {mockRenters.filter(r => r.paymentStatus === "paid").length} Paid
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {mockRenters.filter(r => r.paymentStatus === "pending").length} Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownerDashboardStats.pendingPayments + ownerDashboardStats.overduePayments}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">
                {ownerDashboardStats.overduePayments} overdue payments
              </span>
            </p>
            <Button variant="destructive" size="sm" className="mt-2 w-full">
              Review Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue & Occupancy</CardTitle>
            <CardDescription>
              Monthly performance tracking for 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="space-y-4">
                <div className="h-[300px]">
                  <div className="grid grid-cols-11 gap-2 h-full items-end">
                    {ownerRevenueData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary rounded-t"
                          style={{
                            height: `${(data.revenue / 22000000) * 100}%`,
                          }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {data.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="occupancy">
                <div className="text-center py-20 text-muted-foreground">
                  Occupancy rate chart visualization
                </div>
              </TabsContent>
              <TabsContent value="comparison">
                <div className="text-center py-20 text-muted-foreground">
                  Year-over-year comparison
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {ownerRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${
                      activity.type === "payment"
                        ? "bg-green-100"
                        : activity.type === "maintenance"
                        ? "bg-orange-100"
                        : activity.type === "contract"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}>
                      {activity.type === "payment" && (
                        <DollarSign className="h-4 w-4 text-green-600" />
                      )}
                      {activity.type === "maintenance" && (
                        <Wrench className="h-4 w-4 text-orange-600" />
                      )}
                      {activity.type === "contract" && (
                        <Calendar className="h-4 w-4 text-blue-600" />
                      )}
                      {activity.type === "inquiry" && (
                        <Home className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(activity.timestamp, "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Properties & Maintenance Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Status</CardTitle>
            <CardDescription>
              Current status of all your properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Occupied</span>
                  </div>
                  <span className="text-sm font-medium">
                    {occupiedProperties.length} ({ownerDashboardStats.occupancyRate}%)
                  </span>
                </div>
                <Progress value={ownerDashboardStats.occupancyRate} />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Available</span>
                  </div>
                  <span className="text-sm font-medium">
                    {availableProperties.length} ({((availableProperties.length / ownerDashboardStats.totalProperties) * 100).toFixed(0)}%)
                  </span>
                </div>
                <Progress value={(availableProperties.length / ownerDashboardStats.totalProperties) * 100} className="bg-blue-100" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">In Maintenance</span>
                  </div>
                  <span className="text-sm font-medium">
                    1 (12.5%)
                  </span>
                </div>
                <Progress value={12.5} className="bg-orange-100" />
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  View All Properties
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>
              Active maintenance and repair requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingMaintenance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No pending maintenance requests
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingMaintenance.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium text-sm">
                        {request.propertyName.split(" ")[0]}
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.title.substring(0, 20)}...
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.priority === "urgent"
                              ? "destructive"
                              : request.priority === "high"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                Expected payments for this month
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Renter</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRenters.map((renter) => (
                <TableRow key={renter.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{renter.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{renter.name}</p>
                        <p className="text-sm text-muted-foreground">{renter.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{renter.propertyName}</TableCell>
                  <TableCell className="font-medium">
                    ${(renter.rentAmount / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell>{format(renter.nextPaymentDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        renter.paymentStatus === "paid"
                          ? "default"
                          : renter.paymentStatus === "overdue"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {renter.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
