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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  Send,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  CreditCard,
  Wrench,
  Home,
  Search,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { currentProperty } from "@/lib/renter-mock-data";

const faqs = [
  {
    category: "Pagos",
    icon: CreditCard,
    questions: [
      {
        question: "¿Cómo puedo pagar mi arriendo?",
        answer:
          "Puedes realizar tu pago a través de varios métodos: transferencia bancaria, Nequi, Daviplata, PSE o tarjeta de crédito. Ve a la sección de Pagos, selecciona el pago pendiente y elige tu método preferido. Los pagos son procesados inmediatamente.",
      },
      {
        question: "¿Qué pasa si pago después de la fecha de vencimiento?",
        answer:
          "Los pagos realizados después de la fecha de vencimiento pueden estar sujetos a cargos por mora según lo establecido en tu contrato. Te recomendamos pagar siempre a tiempo para evitar estos cargos adicionales. Puedes revisar los términos específicos en tu contrato.",
      },
      {
        question: "¿Puedo obtener un comprobante de pago?",
        answer:
          "Sí, cada pago genera automáticamente un comprobante que puedes descargar desde la sección de Pagos o Documentos. También recibirás una copia por correo electrónico después de cada transacción exitosa.",
      },
      {
        question: "¿Cómo cambio mi método de pago preferido?",
        answer:
          "Puedes cambiar tu método de pago en cualquier momento. Ve a Configuración > Métodos de Pago y selecciona el método que prefieras usar por defecto. Esta configuración se aplicará a futuros pagos.",
      },
    ],
  },
  {
    category: "Mantenimiento",
    icon: Wrench,
    questions: [
      {
        question: "¿Cómo solicito un servicio de mantenimiento?",
        answer:
          "Ve a la sección de Mantenimiento y haz clic en 'Nueva Solicitud'. Describe el problema, selecciona la categoría y prioridad, y envía la solicitud. Tu propietario será notificado inmediatamente y podrás hacer seguimiento del estado en tiempo real.",
      },
      {
        question: "¿Cuánto tiempo tarda en atenderse una solicitud?",
        answer:
          "El tiempo de respuesta depende de la prioridad de la solicitud. Las urgencias (fugas mayores, problemas eléctricos peligrosos) se atienden en 24 horas. Las prioridades medias en 2-3 días, y las bajas en una semana. Tu propietario te mantendrá informado del progreso.",
      },
      {
        question: "¿Quién cubre los costos de mantenimiento?",
        answer:
          "Según la ley colombiana, el propietario cubre las reparaciones mayores y mantenimiento estructural. El arrendatario es responsable de daños causados por mal uso. Cada caso se evalúa individualmente según tu contrato.",
      },
      {
        question: "¿Puedo contratar mi propio técnico?",
        answer:
          "Para mantenimientos menores puedes hacerlo, pero para reparaciones mayores debes coordinarlo con tu propietario. Es importante documentar cualquier reparación para evitar problemas al finalizar el contrato.",
      },
    ],
  },
  {
    category: "Contrato y Propiedad",
    icon: Home,
    questions: [
      {
        question: "¿Cómo renuevo mi contrato?",
        answer:
          "Debes contactar a tu propietario al menos 2 meses antes del vencimiento. Puedes hacerlo a través de la sección de Mensajes o usando la información de contacto en tu perfil. El propietario te enviará las condiciones de renovación.",
      },
      {
        question: "¿Puedo terminar mi contrato antes de tiempo?",
        answer:
          "Depende de las condiciones establecidas en tu contrato. Generalmente se requiere notificar con 1-2 meses de anticipación. Revisa tu contrato o contacta a tu propietario para conocer las condiciones específicas.",
      },
      {
        question: "¿Cómo recupero mi depósito de seguridad?",
        answer:
          "Al finalizar el contrato, se realiza una inspección de la propiedad. Si todo está en orden, el depósito se devuelve en un plazo de 15-30 días. Cualquier daño o deuda pendiente se descuenta del depósito.",
      },
      {
        question: "¿Puedo subarrendar la propiedad?",
        answer:
          "Solo si tu contrato lo permite explícitamente. La mayoría de los contratos prohíben el subarriendo sin autorización escrita del propietario. Consulta tu contrato o pregunta directamente a tu propietario.",
      },
    ],
  },
  {
    category: "Documentos",
    icon: FileText,
    questions: [
      {
        question: "¿Dónde encuentro mi contrato?",
        answer:
          "Tu contrato está disponible en la sección de Documentos. También lo puedes encontrar en la sección de Propiedad. Si no lo ves, contacta a tu propietario para que lo suba al sistema.",
      },
      {
        question: "¿Cómo descargo mis facturas?",
        answer:
          "Ve a la sección de Documentos o Pagos. Cada factura tiene un botón de descarga. También puedes filtrar por tipo de documento para encontrar rápidamente lo que necesitas.",
      },
      {
        question: "¿Necesito algún certificado especial?",
        answer:
          "Si necesitas un certificado de arrendamiento, certificado de paz y salvo, o cualquier otro documento, contacta a tu propietario a través de la sección de Mensajes con tu solicitud específica.",
      },
    ],
  },
];

export default function RenterSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleSubmitTicket = () => {
    if (!ticketCategory || !ticketSubject || !ticketMessage) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    toast.success("Ticket enviado exitosamente. Te responderemos pronto.");
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
        <h1 className="text-3xl font-bold tracking-tight">
          Ayuda y Soporte
        </h1>
        <p className="text-muted-foreground">
          Encuentra respuestas rápidas o contacta con soporte
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Chat en vivo</h3>
              <p className="text-sm text-muted-foreground">
                Habla con tu propietario
              </p>
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
              <h3 className="font-semibold">Llamar</h3>
              <p className="text-sm text-muted-foreground">
                {currentProperty.landlordPhone}
              </p>
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
              <p className="text-sm text-muted-foreground">
                {currentProperty.landlordEmail}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Enviar email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar en preguntas frecuentes</CardTitle>
          <CardDescription>
            Encuentra respuestas rápidas a tus preguntas
          </CardDescription>
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

      {/* FAQs by Category */}
      {filteredFaqs.map(
        (category) =>
          category.questions.length > 0 && (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.category}
                  <Badge variant="secondary">{category.questions.length}</Badge>
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

      {/* Submit Support Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Crear ticket de soporte</CardTitle>
          <CardDescription>
            ¿No encontraste lo que buscabas? Envíanos un mensaje
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={ticketCategory} onValueChange={setTicketCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Pagos</SelectItem>
                <SelectItem value="maintenance">Mantenimiento</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="documents">Documentos</SelectItem>
                <SelectItem value="technical">Soporte técnico</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              placeholder="Describe brevemente tu consulta"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Describe tu problema o pregunta en detalle..."
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

      {/* Useful Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos útiles</CardTitle>
          <CardDescription>
            Información adicional que puede serte útil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3 text-left">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Guía del arrendatario</p>
                  <p className="text-sm text-muted-foreground">
                    Derechos y responsabilidades
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

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3 text-left">
                <HelpCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Tutoriales en video</p>
                  <p className="text-sm text-muted-foreground">
                    Aprende a usar la plataforma
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto shrink-0" />
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3 text-left">
                <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">Centro de ayuda</p>
                  <p className="text-sm text-muted-foreground">
                    Artículos y guías completas
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
