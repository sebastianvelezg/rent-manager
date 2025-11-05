"use client";

import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  CreditCard,
  FileText,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailDialog({ user, open, onOpenChange }: UserDetailDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about {user.name}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "suspended"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                  <Badge
                    className={
                      user.role === "owner"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {user.role}
                  </Badge>
                  {user.subscriptionPlan && (
                    <Badge variant="outline">{user.subscriptionPlan}</Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {user.city}, {user.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {format(user.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tabs for role-specific information */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                {user.role === "owner" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Properties
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.properties}</div>
                        <p className="text-xs text-muted-foreground">
                          Total properties managed
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Total Revenue
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${((user.totalRevenue || 0) / 1000000).toFixed(1)}M
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Colombian Pesos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Subscription</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium capitalize">
                              {user.subscriptionPlan} Plan
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Active subscription
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Upgrade
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {user.role === "renter" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Property Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{user.propertyAddress}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Rent Amount
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${((user.rentAmount || 0) / 1000000).toFixed(1)}M
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Per month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge
                          variant={
                            user.paymentStatus === "paid"
                              ? "default"
                              : user.paymentStatus === "overdue"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {user.paymentStatus}
                        </Badge>
                        {user.nextPaymentDate && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Next: {format(user.nextPaymentDate, "MMM d, yyyy")}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Full Address</span>
                      <span className="font-medium">{user.address}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Document ID</span>
                      <span className="font-medium">{user.documentId}</span>
                    </div>
                    {user.lastLogin && (
                      <>
                        <Separator />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Login</span>
                          <span className="font-medium">
                            {format(user.lastLogin, "MMM d, yyyy h:mm a")}
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Activity</CardTitle>
                    <CardDescription>Latest actions and events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Logged in</p>
                          <p className="text-xs text-muted-foreground">
                            {user.lastLogin && format(user.lastLogin, "MMM d, yyyy h:mm a")}
                          </p>
                        </div>
                      </div>
                      {user.role === "renter" && user.paymentStatus === "paid" && (
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <CreditCard className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Payment completed</p>
                            <p className="text-xs text-muted-foreground">
                              ${((user.rentAmount || 0) / 1000000).toFixed(1)}M COP
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Account created</p>
                          <p className="text-xs text-muted-foreground">
                            {format(user.createdAt, "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Admin Notes</CardTitle>
                    <CardDescription>
                      Internal notes and comments about this user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.notes ? (
                      <p className="text-sm">{user.notes}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No notes available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button>Edit User</Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
