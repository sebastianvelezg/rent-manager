"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  FileText,
  UserCircle,
  Camera,
  Save,
  AlertCircle,
} from "lucide-react";
import { currentRenter, currentProperty } from "@/lib/renter-mock-data";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RenterProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentRenter.name,
    email: currentRenter.email,
    phone: currentRenter.phone,
    documentId: currentRenter.documentId,
    emergencyName: currentRenter.emergencyContact?.name || "",
    emergencyPhone: currentRenter.emergencyContact?.phone || "",
    emergencyRelationship: currentRenter.emergencyContact?.relationship || "",
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    toast.success("Perfil actualizado exitosamente");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentRenter.name,
      email: currentRenter.email,
      phone: currentRenter.phone,
      documentId: currentRenter.documentId,
      emergencyName: currentRenter.emergencyContact?.name || "",
      emergencyPhone: currentRenter.emergencyContact?.phone || "",
      emergencyRelationship: currentRenter.emergencyContact?.relationship || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Administra tu información personal y preferencias
        </p>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary/10 text-2xl">
                  {currentRenter.avatar}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{currentRenter.name}</h2>
              <p className="text-muted-foreground">{currentRenter.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Badge variant="secondary">
                  <User className="h-3 w-3 mr-1" />
                  Arrendatario
                </Badge>
                <Badge variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  {currentRenter.documentId}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Tu información básica de contacto
            </CardDescription>
          </div>
          <Button
            variant={isEditing ? "ghost" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                <User className="h-4 w-4 inline mr-2" />
                Nombre completo
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="h-4 w-4 inline mr-2" />
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="h-4 w-4 inline mr-2" />
                Teléfono
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentId">
                <FileText className="h-4 w-4 inline mr-2" />
                Número de documento
              </Label>
              <Input
                id="documentId"
                value={formData.documentId}
                onChange={(e) =>
                  setFormData({ ...formData, documentId: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar cambios
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contacto de Emergencia</CardTitle>
          <CardDescription>
            Persona a contactar en caso de emergencia
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">
                <UserCircle className="h-4 w-4 inline mr-2" />
                Nombre
              </Label>
              <Input
                id="emergencyName"
                value={formData.emergencyName}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">
                <Phone className="h-4 w-4 inline mr-2" />
                Teléfono
              </Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyPhone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyRelationship">
                <User className="h-4 w-4 inline mr-2" />
                Relación
              </Label>
              <Input
                id="emergencyRelationship"
                value={formData.emergencyRelationship}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyRelationship: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Property Info */}
      <Card>
        <CardHeader>
          <CardTitle>Propiedad Actual</CardTitle>
          <CardDescription>
            Información del inmueble que arriendes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">{currentProperty.name}</h3>
              <p className="text-sm text-muted-foreground">
                {currentProperty.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentProperty.city}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Propietario
                </p>
                <p className="font-medium">{currentProperty.landlordName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Tipo de propiedad
                </p>
                <p className="font-medium">{currentProperty.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Arriendo mensual
                </p>
                <p className="font-medium">
                  $
                  {currentProperty.rentAmount.toLocaleString("es-CO", {
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Para cambios importantes en tu perfil o información del contrato,
          por favor contacta a tu propietario o administrador.
        </AlertDescription>
      </Alert>
    </div>
  );
}
