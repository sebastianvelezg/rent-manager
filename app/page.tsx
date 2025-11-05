import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Users,
  Shield,
  Home,
  CheckCircle,
  TrendingUp,
  Bell,
  CreditCard,
  FileText,
  Wrench,
  BarChart3,
  MessageSquare,
  Star,
  ArrowRight,
  Zap,
  Lock,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Rent Manager</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/renter">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
              <Link href="#pricing">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20" />
        <div className="container relative flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            🇨🇴 Built for Colombia
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
            Simplifica la gestión de
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> tus propiedades</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            La plataforma completa para propietarios y arrendatarios. Gestiona pagos, contratos,
            mantenimiento y más, todo en un solo lugar.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row mt-8">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
              <Link href="#pricing">
                Comenzar gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/owner">Ver demo</Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl w-full">
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-blue-100 dark:border-blue-900">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Propiedades</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-indigo-100 dark:border-indigo-900">
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">1,000+</p>
              <p className="text-sm text-muted-foreground mt-1">Usuarios</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-100 dark:border-purple-900">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">99.9%</p>
              <p className="text-sm text-muted-foreground mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 bg-muted/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Todo lo que necesitas
          </h2>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Gestiona propiedades, arrendatarios, pagos y mantenimiento con herramientas
            profesionales
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <Card className="border-blue-200 dark:border-blue-900 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Gestión de Propiedades</CardTitle>
              <CardDescription>
                Administra múltiples propiedades desde un solo dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Portafolio ilimitado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Fotos y documentos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Estado en tiempo real</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-900 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-2">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Pagos Automatizados</CardTitle>
              <CardDescription>
                Cobra arriendos sin complicaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Pagos PSE, Nequi, Bancolombia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Recordatorios automáticos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Historial completo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-900 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Gestión de Arrendatarios</CardTitle>
              <CardDescription>
                Toda la información de tus inquilinos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>Perfiles completos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>Contratos digitales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>Comunicación directa</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-900 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Facturación Inteligente</CardTitle>
              <CardDescription>
                Genera facturas automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Facturas electrónicas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Cumplimiento DIAN</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Reportes mensuales</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-pink-200 dark:border-pink-900 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-2">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Mantenimiento</CardTitle>
              <CardDescription>
                Gestiona solicitudes eficientemente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pink-600" />
                <span>Sistema de tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pink-600" />
                <span>Seguimiento en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pink-600" />
                <span>Historial completo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 dark:border-indigo-900 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Analytics & Reportes</CardTitle>
              <CardDescription>
                Datos para tomar mejores decisiones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                <span>Dashboard en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                <span>Reportes personalizados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                <span>Análisis de ingresos</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20" />
        <div className="container relative py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Planes para cada necesidad
            </h2>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
              Desde propietarios individuales hasta empresas inmobiliarias
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Para empezar</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                    <span>1 propiedad</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                    <span>Pagos básicos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                    <span>Soporte email</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/owner">Comenzar gratis</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-blue-600">Basic</CardTitle>
                <CardDescription>Para propietarios</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">$29K</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Hasta 3 propiedades</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Facturación automática</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Reportes básicos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Soporte prioritario</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                  <Link href="#pricing">Comenzar</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-purple-300 dark:border-purple-700 relative shadow-xl scale-105 hover:shadow-2xl transition-all">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                ⭐ Más popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-purple-600">Pro</CardTitle>
                <CardDescription>Para profesionales</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$79K</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span>Hasta 10 propiedades</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span>Todo de Basic +</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span>Analytics avanzado</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span>API access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span>Soporte 24/7</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" asChild>
                  <Link href="#pricing">Comenzar</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-orange-600">Enterprise</CardTitle>
                <CardDescription>Para empresas</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Custom</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span>Propiedades ilimitadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span>Todo de Pro +</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span>Personalización</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span>Account manager</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span>SLA garantizado</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" variant="outline" asChild>
                  <Link href="#pricing">Contactar ventas</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-24 bg-muted/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Más de 500 propietarios confían en Rent Manager
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <CardTitle className="text-base">Excelente plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Rent Manager ha simplificado completamente la gestión de mis 5 propiedades.
                Los pagos automáticos son un salvavidas."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="font-semibold text-white">CM</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Carlos Martínez</p>
                  <p className="text-xs text-muted-foreground">Propietario, Bogotá</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-900 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <CardTitle className="text-base">Muy recomendado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Como arrendatario, me encanta poder pagar mi arriendo con Nequi y tener
                todo organizado en un solo lugar."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <span className="font-semibold text-white">LP</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Laura Pérez</p>
                  <p className="text-xs text-muted-foreground">Arrendataria, Medellín</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-orange-900 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <CardTitle className="text-base">Imprescindible</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Los reportes y analytics me ayudan a tomar mejores decisiones de inversión.
                El ROI es increíble."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="font-semibold text-white">JR</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Jorge Ramírez</p>
                  <p className="text-xs text-muted-foreground">Inversionista, Cali</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-12 text-center relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ¿Listo para comenzar?
              </h2>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Únete a cientos de propietarios que ya están gestionando sus propiedades de
                forma más eficiente
              </p>
              <div className="flex flex-col gap-4 sm:flex-row mt-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                  <Link href="#pricing">
                    Comenzar gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
                  <Link href="/owner">Ver demo en vivo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Rent Manager</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plataforma de gestión de propiedades más completa para Colombia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/owner" className="text-muted-foreground hover:text-primary">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
            <p>© 2025 Rent Manager. Todos los derechos reservados.</p>
            <p>Hecho con ❤️ en Colombia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
