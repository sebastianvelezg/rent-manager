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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  CreditCard,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Shield,
  Moon,
  Sun,
  AlertCircle,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RenterSettingsPage() {
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [maintenanceUpdates, setMaintenanceUpdates] = useState(true);
  const [documentAlerts, setDocumentAlerts] = useState(true);
  const [contractRenewals, setContractRenewals] = useState(true);

  // Appearance Settings
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("es");

  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveNotifications = () => {
    toast.success("Preferencias de notificaciones guardadas");
  };

  const handleSaveAppearance = () => {
    toast.success("Preferencias de apariencia guardadas");
  };

  const handleChangePassword = () => {
    toast.success("Contraseña actualizada exitosamente");
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(
      twoFactorEnabled
        ? "Autenticación de dos factores deshabilitada"
        : "Autenticación de dos factores habilitada"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administra tus preferencias y configuraciones de cuenta
        </p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Configura cómo y cuándo quieres recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="font-medium">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Notificaciones por correo
                </Label>
                <p className="text-sm text-muted-foreground">
                  Recibe actualizaciones importantes por email
                </p>
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
                  <Smartphone className="h-4 w-4 inline mr-2" />
                  Notificaciones por SMS
                </Label>
                <p className="text-sm text-muted-foreground">
                  Recibe alertas urgentes por mensaje de texto
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <Separator />

            <div className="space-y-4 pl-4">
              <h4 className="text-sm font-semibold">
                Tipos de notificaciones
              </h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="payment-reminders" className="font-normal">
                    Recordatorios de pago
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recuerda pagos próximos a vencer
                  </p>
                </div>
                <Switch
                  id="payment-reminders"
                  checked={paymentReminders}
                  onCheckedChange={setPaymentReminders}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="maintenance-updates"
                    className="font-normal"
                  >
                    Actualizaciones de mantenimiento
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Estado de tus solicitudes de mantenimiento
                  </p>
                </div>
                <Switch
                  id="maintenance-updates"
                  checked={maintenanceUpdates}
                  onCheckedChange={setMaintenanceUpdates}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="document-alerts" className="font-normal">
                    Alertas de documentos
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Nuevos documentos y facturas disponibles
                  </p>
                </div>
                <Switch
                  id="document-alerts"
                  checked={documentAlerts}
                  onCheckedChange={setDocumentAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="contract-renewals" className="font-normal">
                    Renovación de contrato
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recordatorios de vencimiento de contrato
                  </p>
                </div>
                <Switch
                  id="contract-renewals"
                  checked={contractRenewals}
                  onCheckedChange={setContractRenewals}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSaveNotifications}>
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
            Métodos de Pago
          </CardTitle>
          <CardDescription>
            Administra tus métodos de pago guardados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Los métodos de pago se configuran durante el proceso de pago. No
              se almacena información de tarjetas en este sistema.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Transferencia Bancolombia</p>
                  <p className="text-sm text-muted-foreground">
                    Método preferido
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Nequi</p>
                  <p className="text-sm text-muted-foreground">
                    Pago rápido móvil
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Agregar nuevo método
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Seguridad
          </CardTitle>
          <CardDescription>
            Mantén tu cuenta segura con estas opciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="font-medium">
                <Lock className="h-4 w-4 inline mr-2" />
                Cambiar contraseña
              </Label>
              <div className="grid gap-3 mt-3">
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Contraseña actual"
                />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Nueva contraseña"
                />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirmar nueva contraseña"
                />
              </div>
              <Button
                onClick={handleChangePassword}
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
                  Agrega una capa extra de seguridad a tu cuenta
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactorEnabled}
                onCheckedChange={handleEnable2FA}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Apariencia y Lenguaje
          </CardTitle>
          <CardDescription>
            Personaliza la apariencia de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">
                {theme === "light" ? (
                  <Sun className="h-4 w-4 inline mr-2" />
                ) : (
                  <Moon className="h-4 w-4 inline mr-2" />
                )}
                Tema
              </Label>
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
              <Label htmlFor="language">
                <Globe className="h-4 w-4 inline mr-2" />
                Idioma
              </Label>
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
          </div>

          <Button onClick={handleSaveAppearance}>
            <Save className="h-4 w-4 mr-2" />
            Guardar preferencias
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
          <CardDescription>
            Acciones irreversibles que afectan tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor,
              asegúrate de estar completamente seguro antes de continuar.
            </AlertDescription>
          </Alert>

          <Button variant="destructive" className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
