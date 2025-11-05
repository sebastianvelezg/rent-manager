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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  CreditCard,
  Wrench,
  MessageSquare,
  FileCheck,
  Info,
  Trash2,
  ExternalLink,
  Users,
} from "lucide-react";
import { ownerNotifications } from "@/lib/owner-mock-data";
import { OwnerNotification } from "@/types/owner";
import Link from "next/link";

export default function OwnerNotificationsPage() {
  const [notifications, setNotifications] = useState<OwnerNotification[]>(ownerNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: OwnerNotification["type"]) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "maintenance":
        return <Wrench className="h-5 w-5" />;
      case "inquiry":
        return <Users className="h-5 w-5" />;
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      case "contract":
        return <FileCheck className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: OwnerNotification["type"]) => {
    switch (type) {
      case "payment":
        return "text-green-600 bg-green-50";
      case "maintenance":
        return "text-orange-600 bg-orange-50";
      case "inquiry":
        return "text-blue-600 bg-blue-50";
      case "message":
        return "text-purple-600 bg-purple-50";
      case "contract":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
          <p className="text-muted-foreground">
            Mantente al día con todas tus actualizaciones
          </p>
        </div>
        <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
          <CheckCheck className="h-4 w-4 mr-2" />
          Marcar todas como leídas
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No leídas</CardTitle>
            <BellOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leídas</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length - unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">
                No leídas
                {unreadCount > 0 && (
                  <Badge variant="default" className="ml-2 h-5 px-1.5">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-4 space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {filter === "unread" ? "No tienes notificaciones sin leer" : "No tienes notificaciones"}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      notification.read ? "bg-background" : "bg-primary/5 border-primary/20"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{notification.title}</h4>
                          {!notification.read && (
                            <Badge variant="default" className="h-5">
                              Nuevo
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-xs text-muted-foreground">
                          {format(notification.timestamp, "d MMM yyyy, HH:mm", { locale: es })}
                        </p>
                        {notification.actionUrl && (
                          <Link href={notification.actionUrl}>
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                              {notification.actionLabel || "Ver más"}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
