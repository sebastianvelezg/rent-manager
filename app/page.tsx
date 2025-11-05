import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Users,
  CreditCard,
  FileText,
  Wrench,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-[#134686] flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#134686]">Rent Manager</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-[#134686] transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-[#134686] transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-[#134686] transition-colors">
              Testimonials
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/renter">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-[#ED3F27] hover:bg-[#ED3F27]/90 text-white" asChild>
              <Link href="#pricing">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-[#FDF4E3] text-[#134686] border-[#134686]/20 hover:bg-[#FDF4E3]">
              🇨🇴 Built for Colombia
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6">
              Simplifica la gestión de
              <span className="text-[#134686]"> tus propiedades</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl">
              La plataforma completa para propietarios y arrendatarios. Gestiona pagos, contratos,
              mantenimiento y más, todo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#ED3F27] hover:bg-[#ED3F27]/90 text-white" asChild>
                <Link href="#pricing">
                  Comenzar gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#134686] text-[#134686] hover:bg-[#134686]/5" asChild>
                <Link href="/owner">Ver demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#FDF4E3]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-4xl font-bold text-[#134686] mb-2">500+</p>
              <p className="text-gray-600">Propiedades</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#134686] mb-2">1,000+</p>
              <p className="text-gray-600">Usuarios</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#134686] mb-2">99.9%</p>
              <p className="text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-gray-600">
              Gestiona propiedades, arrendatarios, pagos y mantenimiento con herramientas profesionales
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded bg-[#134686] flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Gestión de Propiedades</CardTitle>
                <CardDescription className="text-gray-600">
                  Administra múltiples propiedades desde un solo dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Portafolio ilimitado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Fotos y documentos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Estado en tiempo real</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded bg-[#134686] flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Pagos Automatizados</CardTitle>
                <CardDescription className="text-gray-600">
                  Cobra arriendos sin complicaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Pagos PSE, Nequi, Bancolombia</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Recordatorios automáticos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Historial completo</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded bg-[#134686] flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Gestión de Arrendatarios</CardTitle>
                <CardDescription className="text-gray-600">
                  Toda la información de tus inquilinos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Perfiles completos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Contratos digitales</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Comunicación directa</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded bg-[#134686] flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Facturación Inteligente</CardTitle>
                <CardDescription className="text-gray-600">
                  Genera facturas automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Facturas electrónicas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Cumplimiento DIAN</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Reportes mensuales</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded bg-[#134686] flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Mantenimiento</CardTitle>
                <CardDescription className="text-gray-600">
                  Gestiona solicitudes eficientemente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Sistema de tickets</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Seguimiento en tiempo real</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Historial completo</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded bg-[#134686] flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Analytics & Reportes</CardTitle>
                <CardDescription className="text-gray-600">
                  Datos para tomar mejores decisiones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Dashboard en tiempo real</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Reportes personalizados</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#FEB21A]" />
                  <span>Análisis de ingresos</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-[#FDF4E3]">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
              Planes para cada necesidad
            </h2>
            <p className="text-lg text-gray-600">
              Desde propietarios individuales hasta empresas inmobiliarias
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Free</CardTitle>
                <CardDescription className="text-gray-600">Para empezar</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>1 propiedad</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>Pagos básicos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>Soporte email</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/owner">Comenzar gratis</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-[#134686]">Basic</CardTitle>
                <CardDescription className="text-gray-600">Para propietarios</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$29K</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#134686]" />
                  <span>Hasta 3 propiedades</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#134686]" />
                  <span>Facturación automática</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#134686]" />
                  <span>Reportes básicos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#134686]" />
                  <span>Soporte prioritario</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#134686] hover:bg-[#134686]/90 text-white" asChild>
                  <Link href="#pricing">Comenzar</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-[#ED3F27] border-2 bg-white relative shadow-md">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FEB21A] text-gray-900 border-0 hover:bg-[#FEB21A]">
                Más popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-[#ED3F27]">Pro</CardTitle>
                <CardDescription className="text-gray-600">Para profesionales</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$79K</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#ED3F27]" />
                  <span>Hasta 10 propiedades</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#ED3F27]" />
                  <span>Todo de Basic +</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#ED3F27]" />
                  <span>Analytics avanzado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#ED3F27]" />
                  <span>API access</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#ED3F27]" />
                  <span>Soporte 24/7</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#ED3F27] hover:bg-[#ED3F27]/90 text-white" asChild>
                  <Link href="#pricing">Comenzar</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Enterprise</CardTitle>
                <CardDescription className="text-gray-600">Para empresas</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>Propiedades ilimitadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>Todo de Pro +</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>Personalización</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>Account manager</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span>SLA garantizado</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="#pricing">Contactar ventas</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-gray-600">
              Más de 500 propietarios confían en Rent Manager
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 rounded-full bg-[#FEB21A]" />
                  ))}
                </div>
                <CardTitle className="text-base text-gray-900">Excelente plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  "Rent Manager ha simplificado completamente la gestión de mis 5 propiedades.
                  Los pagos automáticos son un salvavidas."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#134686] flex items-center justify-center">
                    <span className="font-semibold text-white text-sm">CM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Carlos Martínez</p>
                    <p className="text-xs text-gray-600">Propietario, Bogotá</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 rounded-full bg-[#FEB21A]" />
                  ))}
                </div>
                <CardTitle className="text-base text-gray-900">Muy recomendado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  "Como arrendatario, me encanta poder pagar mi arriendo con Nequi y tener
                  todo organizado en un solo lugar."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#134686] flex items-center justify-center">
                    <span className="font-semibold text-white text-sm">LP</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Laura Pérez</p>
                    <p className="text-xs text-gray-600">Arrendataria, Medellín</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 rounded-full bg-[#FEB21A]" />
                  ))}
                </div>
                <CardTitle className="text-base text-gray-900">Imprescindible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  "Los reportes y analytics me ayudan a tomar mejores decisiones de inversión.
                  El ROI es increíble."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#134686] flex items-center justify-center">
                    <span className="font-semibold text-white text-sm">JR</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Jorge Ramírez</p>
                    <p className="text-xs text-gray-600">Inversionista, Cali</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#134686]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Únete a cientos de propietarios que ya están gestionando sus propiedades de forma más eficiente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#ED3F27] hover:bg-[#ED3F27]/90 text-white" asChild>
                <Link href="#pricing">
                  Comenzar gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/owner">Ver demo en vivo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded bg-[#134686] flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#134686]">Rent Manager</span>
              </div>
              <p className="text-sm text-gray-600">
                La plataforma de gestión de propiedades más completa para Colombia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-[#134686]">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-600 hover:text-[#134686]">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/owner" className="text-gray-600 hover:text-[#134686]">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#134686]">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#134686]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#134686]">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#134686]">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#134686]">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#134686]">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-200" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <p>© 2025 Rent Manager. Todos los derechos reservados.</p>
            <p>Hecho con ❤️ en Colombia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
