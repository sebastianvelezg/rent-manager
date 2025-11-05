"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wrench,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Eye,
} from "lucide-react";
import { mockMaintenanceRequests } from "@/lib/owner-mock-data";
import { MaintenanceRequest } from "@/types/owner";

export default function OwnerMaintenancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MaintenanceRequest["status"]>("all");

  const filteredRequests = mockMaintenanceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.renterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockMaintenanceRequests.length,
    open: mockMaintenanceRequests.filter((r) => r.status === "open").length,
    inProgress: mockMaintenanceRequests.filter((r) => r.status === "in-progress").length,
    resolved: mockMaintenanceRequests.filter((r) => r.status === "resolved").length,
    totalCost: mockMaintenanceRequests
      .filter((r) => r.cost)
      .reduce((sum, r) => sum + (r.cost || 0), 0),
  };

  const getPriorityBadge = (priority: MaintenanceRequest["priority"]) => {
    const variants = {
      low: { variant: "secondary" as const, label: "Baja" },
      medium: { variant: "default" as const, label: "Media" },
      high: { variant: "default" as const, label: "Alta" },
      urgent: { variant: "destructive" as const, label: "Urgente" },
    };
    return <Badge variant={variants[priority].variant}>{variants[priority].label}</Badge>;
  };

  const getStatusBadge = (status: MaintenanceRequest["status"]) => {
    const variants = {
      open: { variant: "destructive" as const, icon: AlertCircle, label: "Abierta" },
      "in-progress": { variant: "default" as const, icon: Clock, label: "En Progreso" },
      resolved: { variant: "secondary" as const, icon: CheckCircle, label: "Resuelta" },
      closed: { variant: "outline" as const, icon: XCircle, label: "Cerrada" },
    };
    const config = variants[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mantenimiento</h1>
          <p className="text-muted-foreground">
            Gestiona solicitudes de mantenimiento de tus propiedades
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abiertas</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.open}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              Costo: ${stats.totalCost.toLocaleString("es-CO")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Solicitudes de Mantenimiento</CardTitle>
              <CardDescription>Lista de todas las solicitudes</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="open">Abiertas</TabsTrigger>
              <TabsTrigger value="in-progress">En Progreso</TabsTrigger>
              <TabsTrigger value="resolved">Resueltas</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter} className="mt-4">
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No hay solicitudes</p>
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-start gap-4 p-4 rounded-lg border"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{request.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {request.propertyName} • {request.renterName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(request.priority)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                        <p className="text-sm">{request.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            Creada: {format(request.createdAt, "d MMM yyyy", { locale: es })}
                          </span>
                          {request.cost && <span>Costo: ${request.cost.toLocaleString("es-CO")}</span>}
                          {request.resolvedAt && (
                            <span>
                              Resuelta: {format(request.resolvedAt, "d MMM yyyy", { locale: es })}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
