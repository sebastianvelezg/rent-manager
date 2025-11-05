"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  FileText,
  Wrench,
  Calendar,
  Settings,
  BarChart3,
  MessageSquare,
  Bell,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Overview",
    href: "/owner",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/owner/properties",
    icon: Building2,
    badge: "8",
  },
  {
    title: "Renters",
    href: "/owner/renters",
    icon: Users,
    badge: "5",
  },
  {
    title: "Payments",
    href: "/owner/payments",
    icon: CreditCard,
    badge: "2",
  },
  {
    title: "Invoices",
    href: "/owner/invoices",
    icon: FileText,
  },
  {
    title: "Maintenance",
    href: "/owner/maintenance",
    icon: Wrench,
    badge: "2",
  },
  {
    title: "Analytics",
    href: "/owner/analytics",
    icon: BarChart3,
  },
  {
    title: "Messages",
    href: "/owner/messages",
    icon: MessageSquare,
  },
];

const bottomNavigationItems = [
  {
    title: "Calendar",
    href: "/owner/calendar",
    icon: Calendar,
  },
  {
    title: "Notifications",
    href: "/owner/notifications",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Settings",
    href: "/owner/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/owner/support",
    icon: HelpCircle,
  },
];

export function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Rent Manager
        </h2>
        <p className="text-sm text-muted-foreground">Owner Dashboard</p>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {bottomNavigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
