import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Rent Manager</h1>
          <p className="text-muted-foreground text-lg">
            Smart Rental Management Platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Property Owner</CardTitle>
              </div>
              <CardDescription>
                Manage your properties, tenants, and rental payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Track multiple properties</li>
                <li>• Manage tenant information</li>
                <li>• Monitor payments and invoices</li>
                <li>• Handle maintenance requests</li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/owner">
                  Go to Owner Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Administrator</CardTitle>
              </div>
              <CardDescription>
                Platform administration and user management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Manage all users</li>
                <li>• Monitor platform analytics</li>
                <li>• Handle support tickets</li>
                <li>• System configuration</li>
              </ul>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/admin">
                  Go to Admin Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Built with Next.js 16 + shadcn/ui • Colombian Market Focus</p>
        </div>
      </div>
    </div>
  );
}
