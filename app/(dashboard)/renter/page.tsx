"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  FileText,
  MessageSquare,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  currentProperty,
  currentContract,
  renterDashboardStats,
  renterRecentActivity,
  renterPayments,
  renterMaintenanceRequests,
  paymentChartData,
  currentRenter,
} from "@/lib/renter-mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";

export default function RenterDashboard() {
  const nextPayment = renterPayments.find(p => p.status === "pending");
  const daysUntilPayment = nextPayment
    ? differenceInDays(nextPayment.dueDate, new Date())
    : 0;

  const daysUntilExpiry = differenceInDays(
    currentContract.endDate,
    new Date()
  );

  const openRequests = renterMaintenanceRequests.filter(
    r => r.status !== "resolved" && r.status !== "closed"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {currentRenter.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your rental
          </p>
        </div>
        <Button size="lg">
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Rent Now
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            {daysUntilPayment <= 5 ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <Calendar className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(renterDashboardStats.nextPaymentAmount / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Due {format(renterDashboardStats.nextPaymentDate, "MMM d, yyyy")}
            </p>
            <Badge
              variant={
                daysUntilPayment <= 5
                  ? "destructive"
                  : daysUntilPayment <= 10
                  ? "secondary"
                  : "outline"
              }
              className="mt-2"
            >
              {daysUntilPayment} days left
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(renterDashboardStats.currentRent / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              {renterDashboardStats.totalPaymentsMade} payments made
            </p>
            <Progress value={renterDashboardStats.onTimePaymentRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contract Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Expires {format(currentContract.endDate, "MMM d, yyyy")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {daysUntilExpiry} days remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {openRequests.length === 0 ? "No" : "Active"} requests
            </p>
            {openRequests.length > 0 && (
              <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                <Link href="/renter/maintenance">View Requests</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Property Information */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Property</CardTitle>
                <CardDescription>{currentProperty.name}</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/renter/property">View Details</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <Home className="h-24 w-24 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{currentProperty.bedrooms}</p>
                <p className="text-xs text-muted-foreground">Bedrooms</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{currentProperty.bathrooms}</p>
                <p className="text-xs text-muted-foreground">Bathrooms</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{currentProperty.area}</p>
                <p className="text-xs text-muted-foreground">m²</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{currentProperty.address}, {currentProperty.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>${(currentProperty.rentAmount / 1000000).toFixed(1)}M per month</span>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {currentProperty.amenities?.slice(0, 6).map((amenity, index) => (
                  <Badge key={index} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
                {currentProperty.amenities && currentProperty.amenities.length > 6 && (
                  <Badge variant="outline">
                    +{currentProperty.amenities.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Landlord Contact & Recent Activity */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Landlord Contact</CardTitle>
              <CardDescription>Your property manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {currentProperty.landlordName
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentProperty.landlordName}</p>
                  <p className="text-sm text-muted-foreground">Property Owner</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{currentProperty.landlordEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{currentProperty.landlordPhone}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {renterRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          activity.type === "payment"
                            ? "bg-green-100"
                            : activity.type === "maintenance"
                            ? "bg-orange-100"
                            : activity.type === "document"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                        }`}
                      >
                        {activity.type === "payment" && (
                          <DollarSign className="h-4 w-4 text-green-600" />
                        )}
                        {activity.type === "maintenance" && (
                          <Wrench className="h-4 w-4 text-orange-600" />
                        )}
                        {activity.type === "document" && (
                          <FileText className="h-4 w-4 text-blue-600" />
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
      </div>

      {/* Payment Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <div className="grid grid-cols-7 gap-2 h-full items-end">
                {paymentChartData.map((data, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t ${
                        data.status === "paid" ? "bg-green-600" : "bg-yellow-500"
                      }`}
                      style={{
                        height: "100%",
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-600 rounded"></div>
                <span className="text-sm">Paid</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-yellow-500 rounded"></div>
                <span className="text-sm">Pending</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/renter/payments">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" size="lg" asChild>
              <Link href="/renter/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg" asChild>
              <Link href="/renter/maintenance">
                <Wrench className="mr-2 h-4 w-4" />
                Request Maintenance
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg" asChild>
              <Link href="/renter/documents">
                <FileText className="mr-2 h-4 w-4" />
                View Documents
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg" asChild>
              <Link href="/renter/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Landlord
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
