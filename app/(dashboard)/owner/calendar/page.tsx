"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
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
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { ownerCalendarEvents } from "@/lib/owner-mock-data";

export default function OwnerCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsOnDate = (date: Date) => {
    return ownerCalendarEvents.filter((event) => isSameDay(new Date(event.date), date));
  };

  const selectedEvents = eventsOnDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
          <p className="text-muted-foreground">
            Gestiona pagos, mantenimientos y eventos importantes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(currentDate, "MMMM yyyy", { locale: es })}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Hoy
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              {daysInMonth.map((day) => {
                const events = eventsOnDate(day);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      min-h-[80px] p-2 rounded-lg border transition-colors text-left
                      ${isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted"}
                      ${isTodayDate ? "border-primary/50" : ""}
                    `}
                  >
                    <div className={`text-sm font-medium ${isTodayDate ? "text-primary" : ""}`}>
                      {format(day, "d")}
                    </div>
                    <div className="mt-1 space-y-1">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="text-[10px] px-1 py-0.5 rounded truncate"
                          style={{ backgroundColor: event.color + "20", color: event.color }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-[10px] text-muted-foreground">+{events.length - 2} más</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>Eventos - {format(selectedDate, "d MMM", { locale: es })}</CardTitle>
            <CardDescription>
              {selectedEvents.length} evento{selectedEvents.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No hay eventos</p>
                </div>
              ) : (
                selectedEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <Badge
                        style={{ backgroundColor: event.color + "20", color: event.color }}
                        className="capitalize text-xs"
                      >
                        {event.type}
                      </Badge>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    )}
                    {event.propertyName && (
                      <p className="text-xs text-muted-foreground">{event.propertyName}</p>
                    )}
                    {event.renterName && (
                      <p className="text-xs text-muted-foreground">{event.renterName}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>Eventos importantes en los próximos días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ownerCalendarEvents
              .filter((e) => new Date(e.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div
                    className="w-1 h-full rounded"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        style={{ backgroundColor: event.color + "20", color: event.color }}
                      >
                        {format(new Date(event.date), "d MMM", { locale: es })}
                      </Badge>
                    </div>
                    {event.propertyName && (
                      <p className="text-xs text-muted-foreground mt-1">{event.propertyName}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
