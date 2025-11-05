"use client";

import { currentProperty, currentContract } from "@/lib/renter-mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Calendar,
  CheckCircle,
  User,
  Phone,
  Mail,
  FileText,
  MessageSquare,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function RenterPropertyPage() {
  const daysUntilExpiry = differenceInDays(
    currentContract.endDate,
    new Date()
  );

  const contractDuration = differenceInDays(
    currentContract.endDate,
    currentContract.startDate
  );

  const daysPassed = differenceInDays(
    new Date(),
    currentContract.startDate
  );

  const progressPercentage = (daysPassed / contractDuration) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Property</h1>
          <p className="text-muted-foreground">
            Details about your current rental property
          </p>
        </div>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Landlord
        </Button>
      </div>

      {/* Property Hero */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <Home className="h-32 w-32 text-muted-foreground" />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold">{currentProperty.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{currentProperty.address}, {currentProperty.city}</span>
                </div>
              </div>
              <Badge className="capitalize" variant="outline">
                {currentProperty.type}
              </Badge>
            </div>

            <p className="text-muted-foreground">{currentProperty.description}</p>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <Bed className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{currentProperty.bedrooms}</p>
                <p className="text-xs text-muted-foreground">Bedrooms</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{currentProperty.bathrooms}</p>
                <p className="text-xs text-muted-foreground">Bathrooms</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <Square className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{currentProperty.area}</p>
                <p className="text-xs text-muted-foreground">m²</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">
                  ${(currentProperty.rentAmount / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground">Per Month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>
              Features and facilities included
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {currentProperty.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
            <CardDescription>
              Your rental agreement details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-medium">
                  {format(currentContract.startDate, "MMM d, yyyy")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">End Date</span>
                <span className="font-medium">
                  {format(currentContract.endDate, "MMM d, yyyy")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Rent</span>
                <span className="font-medium">
                  ${(currentContract.monthlyRent / 1000000).toFixed(1)}M COP
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Security Deposit</span>
                <span className="font-medium">
                  ${(currentContract.depositAmount / 1000000).toFixed(1)}M COP{" "}
                  {currentContract.depositPaid && (
                    <Badge variant="default" className="ml-2">
                      Paid
                    </Badge>
                  )}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="default" className="capitalize">
                  {currentContract.status}
                </Badge>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Contract Progress</span>
                <span className="font-medium">{daysUntilExpiry} days left</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              View Contract
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Landlord Information */}
      <Card>
        <CardHeader>
          <CardTitle>Property Manager</CardTitle>
          <CardDescription>
            Your landlord contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {currentProperty.landlordName
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {currentProperty.landlordName}
                </h3>
                <p className="text-sm text-muted-foreground">Property Owner</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentProperty.landlordEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentProperty.landlordPhone}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Rent Payment:</strong> Monthly rent is due on the 5th of each
              month. Please ensure timely payment to avoid late fees.
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-900">
              <strong>Maintenance:</strong> For any maintenance issues, please submit
              a request through the Maintenance section. Emergency issues should be
              reported immediately.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-900">
              <strong>Contract Renewal:</strong> Your contract expires on{" "}
              {format(currentContract.endDate, "MMMM d, yyyy")}. Contact your
              landlord 60 days before expiry to discuss renewal options.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
