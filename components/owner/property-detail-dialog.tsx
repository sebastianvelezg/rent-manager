"use client";

import { Property } from "@/types/owner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Building2,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertyDetailDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyDetailDialog({
  property,
  open,
  onOpenChange,
}: PropertyDetailDialogProps) {
  if (!property) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      occupied: "default",
      available: "secondary",
      maintenance: "destructive",
      unavailable: "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{property.name}</DialogTitle>
          <DialogDescription>
            Complete property information and details
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Property Image Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <Building2 className="h-24 w-24 text-muted-foreground" />
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{property.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.address}, {property.city}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(property.status)}
                  <Badge variant="outline" className="capitalize">
                    {property.type}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Key Details */}
              <div className="grid grid-cols-4 gap-4">
                {property.bedrooms > 0 && (
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Bed className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>
                )}
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Bath className="h-6 w-6 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Square className="h-6 w-6 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{property.area}</p>
                  <p className="text-xs text-muted-foreground">m²</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <DollarSign className="h-6 w-6 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">
                    ${(property.rentAmount / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tabbed Content */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {property.description || "No description available"}
                    </p>
                  </CardContent>
                </Card>

                {property.status === "occupied" && property.renterId && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Current Renter
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Renter Information</p>
                          <p className="text-sm text-muted-foreground">
                            View full renter details in the Renters section
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Renter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {property.status === "available" && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Availability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Available from:{" "}
                        <span className="font-medium">
                          {property.availableFrom
                            ? format(property.availableFrom, "MMMM d, yyyy")
                            : "Immediately"}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Property Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="font-medium capitalize">{property.type}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Address</span>
                      <span className="font-medium">{property.address}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">City</span>
                      <span className="font-medium">{property.city}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium">
                        {format(property.createdAt, "MMM d, yyyy")}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">
                        {format(property.lastUpdated, "MMM d, yyyy")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Property Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {property.amenities && property.amenities.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {property.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-muted rounded"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No amenities listed
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Property History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Property Created</p>
                          <p className="text-xs text-muted-foreground">
                            {format(property.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Last Updated</p>
                          <p className="text-xs text-muted-foreground">
                            {format(property.lastUpdated, "MMMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button>Edit Property</Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
