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
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  HelpCircle,
  Send,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Search,
  ExternalLink,
  CheckCircle,
  CreditCard,
  Wrench,
  Home,
  Users,
} from "lucide-react";
import { toast } from "sonner";

const faqs = [
  {
    category: "Propiedades",
    icon: Home,
    questions: [
      {
        question: "¿Cómo agrego una nueva propiedad?",
        answer:
          "Ve a la sección de Propiedades y haz clic en 'Agregar Propiedad'. Completa el formulario con la información básica (nombre, dirección, tipo), detalles (habitaciones, área, precio) y amenidades. La propiedad se guardará automáticamente.",
      },
      {
        question: "¿Puedo editar la información de una propiedad?",
        answer:
          "Sí, en la lista de propiedades, haz clic en los tres puntos junto a la propiedad que deseas editar y selecciona 'Editar'. Podrás modificar toda la información excepto el ID de la propiedad.",
      },
      {
        question: "¿Cómo marco una propiedad como ocupada o disponible?",
        answer:
          "Al editar una propiedad, puedes cambiar su estado entre Disponible, Ocupada, Mantenimiento o No disponible. El estado se actualiza automáticamente cuando asignas un arrendatario.",
      },
    ],
  },
  {
    category: "Arrendatarios",
    icon: Users,
    questions: [
      {
        question: "¿Cómo agrego un nuevo arrendatario?",
        answer:
          "Ve a la sección de Arrendatarios y haz clic en 'Agregar Arrendatario'. Completa la información personal, asigna la propiedad, establece el monto del arriendo y las fechas del contrato. El sistema calculará automáticamente las fechas de pago.",
      },
      {
        question: "¿Cómo rastreo los pagos de un arrendatario?",
        answer:
          "En la página del arrendatario, verás su estado de pago actualizado. También puedes ir a la sección de Pagos para ver el historial completo de transacciones, con filtros por estado y fechas.",
      },
      {
        question: "¿Qué hago si un arrendatario no paga?",
        answer:
          "El sistema marcará automáticamente los pagos como vencidos. Puedes enviar recordatorios desde la sección de Mensajes o revisar el contrato para aplicar las cláusulas de mora según lo acordado.",
      },
    ],
  },
  {
    category: "Pagos y Facturación",
    icon: CreditCard,
    questions: [
      {
        question: "¿Cómo registro un pago recibido?",
        answer:
          "Ve a la sección de Pagos, encuentra el pago pendiente y haz clic en 'Registrar Pago'. Ingresa la fecha de pago, método y número de transacción. El sistema generará automáticamente un comprobante.",
      },
      {
        question: "¿Cómo genero facturas?",
        answer:
          "Las facturas se generan automáticamente cada mes. Puedes personalizarlas o crear facturas manuales en la sección de Facturas. Incluye conceptos, montos y notas adicionales según sea necesario.",
      },
      {
        question: "¿Dónde veo mis ingresos totales?",
        answer:
          "En la sección de Análisis encontrarás gráficos detallados de tus ingresos mensuales, tasas de ocupación y comparaciones entre periodos. El dashboard principal también muestra un resumen de ingresos.",
      },
    ],
  },
  {
    category: "Mantenimiento",
    icon: Wrench,
    questions: [
      {
        question: "¿Cómo gestiono solicitudes de mantenimiento?",
        answer:
          "Las solicitudes de tus arrendatarios aparecen automáticamente en la sección de Mantenimiento. Puedes clasificarlas por prioridad, asignar técnicos, actualizar el estado y registrar costos.",
      },
      {
        question: "¿Cómo programo mantenimiento preventivo?",
        answer:
          "Usa el Calendario para programar inspecciones y mantenimiento preventivo. Puedes crear eventos recurrentes y recibir recordatorios automáticos.",
      },
      {
        question: "¿Quién paga las reparaciones?",
        answer:
          "Según la ley colombiana, el propietario cubre reparaciones mayores y estructurales, mientras que el arrendatario es responsable del mantenimiento menor y daños causados por mal uso.",
      },
    ],
  },
];

export default function OwnerSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleSubmitTicket = () => {
    if (!ticketCategory || !ticketSubject || !ticketMessage) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    toast.success("Ticket enviado exitosamente");
    setTicketCategory("");
    setTicketSubject("");
    setTicketMessage("");
  };

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayuda y Soporte</h1>
        <p className="text-muted-foreground">
          Encuentra respuestas y obtén ayuda con la gestión de tus propiedades
        </p>
      </div>

      {/* Quick Contact */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Chat en vivo</h3>
              <p className="text-sm text-muted-foreground">Lun-Vie 9am-6pm</p>
              <Button variant="outline" size="sm" className="w-full">
                Iniciar chat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-green-500/10 rounded-full">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Soporte telefónico</h3>
              <p className="text-sm text-muted-foreground">+57 300 123 4567</p>
              <Button variant="outline" size="sm" className="w-full">
                Llamar ahora
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">soporte@rentmanager.co</p>
              <Button variant="outline" size="sm" className="w-full">
                Enviar email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar en preguntas frecuentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="¿Qué necesitas saber?"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      {filteredFaqs.map(
        (category) =>
          category.questions.length > 0 && (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                    >
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex gap-2 pl-6">
                          <CheckCircle className="h-4 w-4 mt-1 shrink-0 text-green-600" />
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )
      )}

      {/* Submit Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Crear ticket de soporte</CardTitle>
          <CardDescription>¿No encontraste lo que buscabas?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={ticketCategory} onValueChange={setTicketCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property">Propiedades</SelectItem>
                <SelectItem value="renter">Arrendatarios</SelectItem>
                <SelectItem value="payment">Pagos</SelectItem>
                <SelectItem value="maintenance">Mantenimiento</SelectItem>
                <SelectItem value="technical">Soporte técnico</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              placeholder="Describe brevemente"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Describe tu problema en detalle..."
              className="min-h-[150px]"
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmitTicket} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Enviar ticket
          </Button>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos útiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3 text-left">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Guía del propietario</p>
                  <p className="text-sm text-muted-foreground">
                    Mejores prácticas
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto shrink-0" />
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3 text-left">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Ley de arrendamiento</p>
                  <p className="text-sm text-muted-foreground">
                    Ley 820 de 2003
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto shrink-0" />
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
