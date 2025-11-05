"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CreditCard,
  Wrench,
  FileText,
  MessageSquare,
  User,
  Settings,
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
    href: "/renter",
    icon: LayoutDashboard,
  },
  {
    title: "My Property",
    href: "/renter/property",
    icon: Home,
  },
  {
    title: "Payments",
    href: "/renter/payments",
    icon: CreditCard,
    badge: "1",
  },
  {
    title: "Maintenance",
    href: "/renter/maintenance",
    icon: Wrench,
    badge: "1",
  },
  {
    title: "Documents",
    href: "/renter/documents",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/renter/messages",
    icon: MessageSquare,
  },
];

const bottomNavigationItems = [
  {
    title: "Notifications",
    href: "/renter/notifications",
    icon: Bell,
    badge: "2",
  },
  {
    title: "Profile",
    href: "/renter/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/renter/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/renter/support",
    icon: HelpCircle,
  },
];

export function RenterSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Rent Manager
        </h2>
        <p className="text-sm text-muted-foreground">Renter Dashboard</p>
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
