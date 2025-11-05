"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  UserPlus,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { dashboardStats, recentActivity, revenueChartData } from "@/lib/mock-data";
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

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <Button>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +{dashboardStats.newUsersThisMonth} this month
              </span>
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Owners</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalOwners}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.totalRenters} renters registered
            </p>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary">{dashboardStats.totalOwners} Owners</Badge>
              <Badge variant="outline">{dashboardStats.totalRenters} Renters</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(dashboardStats.totalRevenue / 1000000).toFixed(1)}M COP
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +{dashboardStats.monthlyGrowth}% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
            <Button variant="destructive" size="sm" className="mt-2 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue and user growth for 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="growth">Growth</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="space-y-4">
                <div className="h-[300px]">
                  <div className="grid grid-cols-11 gap-2 h-full items-end">
                    {revenueChartData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary rounded-t"
                          style={{
                            height: `${(data.revenue / 14000000) * 100}%`,
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
              <TabsContent value="users">
                <div className="text-center py-20 text-muted-foreground">
                  User growth chart visualization
                </div>
              </TabsContent>
              <TabsContent value="growth">
                <div className="text-center py-20 text-muted-foreground">
                  Growth metrics visualization
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
              Latest actions from users and system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                        {activity.amount && (
                          <span className="font-medium text-green-600">
                            {" "}
                            ${(activity.amount / 1000000).toFixed(1)}M COP
                          </span>
                        )}
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

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Status Distribution</CardTitle>
            <CardDescription>
              Current status breakdown of all users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Users</span>
                <span className="text-sm font-medium">
                  {dashboardStats.activeUsers} ({((dashboardStats.activeUsers / dashboardStats.totalUsers) * 100).toFixed(0)}%)
                </span>
              </div>
              <Progress value={(dashboardStats.activeUsers / dashboardStats.totalUsers) * 100} />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Verification</span>
                <span className="text-sm font-medium">2 (13%)</span>
              </div>
              <Progress value={13} className="bg-yellow-100" />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Inactive/Suspended</span>
                <span className="text-sm font-medium">2 (13%)</span>
              </div>
              <Progress value={13} className="bg-red-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Owners</CardTitle>
            <CardDescription>
              Owners with highest revenue this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Jorge Martínez</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell className="text-right">$18.9M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Luis Herrera</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell className="text-right">$14.3M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Carlos Rodríguez</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell className="text-right">$12.5M</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
