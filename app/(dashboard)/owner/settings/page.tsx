"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bell, CreditCard, Lock, Globe, Shield, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function OwnerSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  const [maintenanceNotifications, setMaintenanceNotifications] = useState(true);
  const [inquiryNotifications, setInquiryNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("es");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tus preferencias de cuenta</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones
          </CardTitle>
          <CardDescription>Configura cómo recibir notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="font-medium">
                  Notificaciones por correo
                </Label>
                <p className="text-sm text-muted-foreground">Recibe actualizaciones por email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications" className="font-medium">
                  Notificaciones por SMS
                </Label>
                <p className="text-sm text-muted-foreground">Alertas urgentes por SMS</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <Separator />

            <div className="space-y-4 pl-4">
              <h4 className="text-sm font-semibold">Tipos de notificaciones</h4>

              <div className="flex items-center justify-between">
                <Label htmlFor="payment-notifications" className="font-normal">
                  Pagos y facturación
                </Label>
                <Switch
                  id="payment-notifications"
                  checked={paymentNotifications}
                  onCheckedChange={setPaymentNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-notifications" className="font-normal">
                  Solicitudes de mantenimiento
                </Label>
                <Switch
                  id="maintenance-notifications"
                  checked={maintenanceNotifications}
                  onCheckedChange={setMaintenanceNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="inquiry-notifications" className="font-normal">
                  Consultas de inquilinos
                </Label>
                <Switch
                  id="inquiry-notifications"
                  checked={inquiryNotifications}
                  onCheckedChange={setInquiryNotifications}
                />
              </div>
            </div>
          </div>

          <Button onClick={() => toast.success("Preferencias guardadas")}>
            <Save className="h-4 w-4 mr-2" />
            Guardar preferencias
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Información de Pago
          </CardTitle>
          <CardDescription>Cuenta bancaria para recibir pagos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bank">Banco</Label>
              <Input id="bank" value="Bancolombia" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-type">Tipo de cuenta</Label>
              <Input id="account-type" value="Ahorros" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Número de cuenta</Label>
              <Input id="account-number" value="**** **** **** 4567" readOnly />
            </div>
          </div>
          <Button variant="outline">Actualizar información</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Seguridad
          </CardTitle>
          <CardDescription>Protege tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="current-password" className="font-medium">
              <Lock className="h-4 w-4 inline mr-2" />
              Cambiar contraseña
            </Label>
            <div className="grid gap-3 mt-3">
              <Input id="current-password" type="password" placeholder="Contraseña actual" />
              <Input id="new-password" type="password" placeholder="Nueva contraseña" />
              <Input id="confirm-password" type="password" placeholder="Confirmar contraseña" />
            </div>
            <Button
              onClick={() => toast.success("Contraseña actualizada")}
              variant="outline"
              className="mt-3"
            >
              Actualizar contraseña
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor" className="font-medium">
                Autenticación de dos factores
              </Label>
              <p className="text-sm text-muted-foreground">
                Protección adicional para tu cuenta
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={twoFactorEnabled}
              onCheckedChange={(checked) => {
                setTwoFactorEnabled(checked);
                toast.success(checked ? "2FA habilitada" : "2FA deshabilitada");
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Apariencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Tema</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Oscuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => toast.success("Preferencias guardadas")}>
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Zona de peligro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Eliminar tu cuenta es una acción permanente e irreversible.
            </AlertDescription>
          </Alert>
          <Button variant="destructive" className="mt-4">
            Eliminar cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
