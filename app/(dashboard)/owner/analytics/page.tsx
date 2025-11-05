"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  TrendingUp,
  DollarSign,
  Home,
  Users,
  Calendar,
} from "lucide-react";
import {
  ownerRevenueData,
  ownerDashboardStats,
  mockProperties,
  mockPayments,
} from "@/lib/owner-mock-data";

export default function OwnerAnalyticsPage() {
  const avgRent =
    mockProperties.reduce((sum, p) => sum + p.rentAmount, 0) / mockProperties.length;
  const paymentRate =
    (mockPayments.filter((p) => p.status === "paid").length / mockPayments.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análiticos</h1>
        <p className="text-muted-foreground">
          Análisis detallado de tus propiedades e ingresos
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${ownerDashboardStats.monthlyRevenue.toLocaleString("es-CO")}
            </div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{ownerDashboardStats.revenueGrowth}% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Ocupación</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownerDashboardStats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {ownerDashboardStats.occupiedProperties} de {ownerDashboardStats.totalProperties}{" "}
              ocupadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arriendo Promedio</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgRent.toLocaleString("es-CO", { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-muted-foreground">Por propiedad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Pago</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Pagos a tiempo</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="occupancy">Ocupación</TabsTrigger>
          <TabsTrigger value="properties">Propiedades</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos Mensuales</CardTitle>
              <CardDescription>Evolución de ingresos en los últimos meses</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-end gap-2">
                {ownerRevenueData.map((data, i) => {
                  const maxRevenue = Math.max(...ownerRevenueData.map((d) => d.revenue));
                  const height = (data.revenue / maxRevenue) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs text-muted-foreground">
                        ${(data.revenue / 1000000).toFixed(1)}M
                      </div>
                      <div
                        className="w-full bg-primary rounded-t transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs font-medium">{data.month}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasa de Ocupación</CardTitle>
              <CardDescription>Histórico de ocupación mensual</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-end gap-2">
                {ownerRevenueData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-muted-foreground">{data.occupancy}%</div>
                    <div
                      className="w-full bg-green-600 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${data.occupancy}%` }}
                    />
                    <div className="text-xs font-medium">{data.month}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(
                    mockProperties.reduce((acc, p) => {
                      acc[p.type] = (acc[p.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize">{type}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Ocupadas</span>
                    <span className="font-semibold">{ownerDashboardStats.occupiedProperties}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Disponibles</span>
                    <span className="font-semibold">{ownerDashboardStats.availableProperties}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mantenimiento</span>
                    <span className="font-semibold">
                      {mockProperties.filter((p) => p.status === "maintenance").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
