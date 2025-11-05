"use client";

import { useState } from "react";
import { mockProperties } from "@/lib/owner-mock-data";
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
  Edit,
  Trash2,
  Building2,
  TrendingUp,
  Home,
  Users,
  DollarSign,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function AdminPropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter properties
  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || property.type === typeFilter;
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const occupiedProperties = filteredProperties.filter((p) => p.status === "occupied");
  const availableProperties = filteredProperties.filter((p) => p.status === "available");
  const maintenanceProperties = filteredProperties.filter((p) => p.status === "maintenance");

  // Calculate stats
  const totalProperties = mockProperties.length;
  const totalRevenue = mockProperties.reduce((sum, p) => sum + p.rent, 0);
  const avgOccupancy = ((occupiedProperties.length / totalProperties) * 100).toFixed(1);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      occupied: "default",
      available: "secondary",
      maintenance: "destructive",
    };
    const labels: Record<string, string> = {
      occupied: "Ocupada",
      available: "Disponible",
      maintenance: "Mantenimiento",
    };
    return <Badge variant={variants[status] || "outline"}>{labels[status] || status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      apartment: "bg-blue-100 text-blue-800",
      house: "bg-green-100 text-green-800",
      studio: "bg-purple-100 text-purple-800",
      penthouse: "bg-orange-100 text-orange-800",
      office: "bg-gray-100 text-gray-800",
    };
    const labels: Record<string, string> = {
      apartment: "Apartamento",
      house: "Casa",
      studio: "Estudio",
      penthouse: "Penthouse",
      office: "Oficina",
    };
    return <Badge className={colors[type] || ""}>{labels[type] || type}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
          <p className="text-muted-foreground">
            Manage all properties across all owners
          </p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              Across all owners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}/mo</div>
            <p className="text-xs text-muted-foreground">
              Monthly rental income
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
            <p className="text-xs text-muted-foreground">
              {occupiedProperties.length} of {totalProperties} occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableProperties.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to rent
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Properties ({filteredProperties.length})</CardTitle>
              <CardDescription>
                View and manage properties from all owners
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
                <TabsTrigger value="all">All ({filteredProperties.length})</TabsTrigger>
                <TabsTrigger value="occupied">Occupied ({occupiedProperties.length})</TabsTrigger>
                <TabsTrigger value="available">Available ({availableProperties.length})</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance ({maintenanceProperties.length})</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {["all", "occupied", "available", "maintenance"].map((tab) => {
              const tabProperties =
                tab === "all" ? filteredProperties :
                tab === "occupied" ? occupiedProperties :
                tab === "available" ? availableProperties :
                maintenanceProperties;

              return (
                <TabsContent key={tab} value={tab} className="m-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Rent</TableHead>
                          <TableHead>Current Renter</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tabProperties.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8">
                              No properties found matching your criteria
                            </TableCell>
                          </TableRow>
                        ) : (
                          tabProperties.map((property) => (
                            <TableRow key={property.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{property.name}</p>
                                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                      {property.address}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{getTypeBadge(property.type)}</TableCell>
                              <TableCell>{getStatusBadge(property.status)}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p>{property.city}</p>
                                  <p className="text-muted-foreground">{property.country}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <p>{property.bedrooms} bed • {property.bathrooms} bath</p>
                                  <p className="text-muted-foreground">{property.area}m²</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="font-medium">{formatCurrency(property.rent)}</p>
                                <p className="text-xs text-muted-foreground">per month</p>
                              </TableCell>
                              <TableCell>
                                {property.currentRenter ? (
                                  <div className="text-sm">
                                    <p className="font-medium">{property.currentRenter.name}</p>
                                    <p className="text-muted-foreground">
                                      Until {new Date(property.currentRenter.leaseEnd).toLocaleDateString()}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">-</p>
                                )}
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
                                      Edit Property
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Users className="mr-2 h-4 w-4" />
                                      View Owner
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => toast.success("Property deleted")}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Property
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
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
