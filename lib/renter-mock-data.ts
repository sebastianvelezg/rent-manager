import {
  RenterProfile,
  RentalProperty,
  RentalContract,
  RenterPayment,
  RenterMaintenanceRequest,
  RenterDashboardStats,
  RenterDocument,
} from "@/types/renter";

// Current Renter Profile
export const currentRenter: RenterProfile = {
  id: "r1",
  name: "Ana María Jiménez",
  email: "ana.jimenez@gmail.com",
  phone: "+57 310 555 1234",
  avatar: "AJ",
  documentId: "CC 52123456",
  emergencyContact: {
    name: "Carlos Jiménez",
    phone: "+57 311 555 9876",
    relationship: "Padre",
  },
};

// Current Rental Property
export const currentProperty: RentalProperty = {
  id: "p1",
  name: "Apartamento Parque 93",
  address: "Calle 93 #15-20, Apt 801",
  city: "Bogotá",
  type: "Apartment",
  bedrooms: 3,
  bathrooms: 2,
  area: 120,
  rentAmount: 3200000,
  description:
    "Hermoso apartamento con vista al parque, completamente amoblado en una de las mejores zonas de Bogotá. Cuenta con excelente iluminación natural, acabados de primera y acceso a todas las comodidades del edificio.",
  amenities: [
    "Parqueadero",
    "Gimnasio",
    "Piscina",
    "Seguridad 24/7",
    "Zona BBQ",
    "Salón social",
    "Internet fibra óptica",
    "Cuarto útil",
  ],
  landlordName: "Carlos Rodríguez",
  landlordEmail: "carlos.rodriguez@gmail.com",
  landlordPhone: "+57 300 123 4567",
};

// Current Contract
export const currentContract: RentalContract = {
  id: "c1",
  propertyId: "p1",
  startDate: new Date("2024-06-01"),
  endDate: new Date("2025-12-01"),
  monthlyRent: 3200000,
  depositAmount: 3200000,
  depositPaid: true,
  status: "active",
  contractUrl: "/documents/contract-2024.pdf",
};

// Payment History
export const renterPayments: RenterPayment[] = [
  {
    id: "pay1",
    amount: 3200000,
    dueDate: new Date("2025-12-05"),
    status: "pending",
    invoiceUrl: "/invoices/2025-12.pdf",
  },
  {
    id: "pay2",
    amount: 3200000,
    dueDate: new Date("2025-11-05"),
    paidDate: new Date("2025-11-03"),
    status: "paid",
    paymentMethod: "Transferencia Bancolombia",
    transactionId: "TRX-2025110301234",
    invoiceUrl: "/invoices/2025-11.pdf",
  },
  {
    id: "pay3",
    amount: 3200000,
    dueDate: new Date("2025-10-05"),
    paidDate: new Date("2025-10-04"),
    status: "paid",
    paymentMethod: "Transferencia Bancolombia",
    transactionId: "TRX-2025100401234",
    invoiceUrl: "/invoices/2025-10.pdf",
  },
  {
    id: "pay4",
    amount: 3200000,
    dueDate: new Date("2025-09-05"),
    paidDate: new Date("2025-09-02"),
    status: "paid",
    paymentMethod: "PSE Davivienda",
    transactionId: "PSE-202509021234",
    invoiceUrl: "/invoices/2025-09.pdf",
  },
  {
    id: "pay5",
    amount: 3200000,
    dueDate: new Date("2025-08-05"),
    paidDate: new Date("2025-08-05"),
    status: "paid",
    paymentMethod: "Nequi",
    transactionId: "NEQ-202508051234",
    invoiceUrl: "/invoices/2025-08.pdf",
  },
  {
    id: "pay6",
    amount: 3200000,
    dueDate: new Date("2025-07-05"),
    paidDate: new Date("2025-07-03"),
    status: "paid",
    paymentMethod: "Transferencia Bancolombia",
    transactionId: "TRX-2025070301234",
    invoiceUrl: "/invoices/2025-07.pdf",
  },
  {
    id: "pay7",
    amount: 3200000,
    dueDate: new Date("2025-06-05"),
    paidDate: new Date("2025-06-04"),
    status: "paid",
    paymentMethod: "Transferencia Bancolombia",
    transactionId: "TRX-2025060401234",
    invoiceUrl: "/invoices/2025-06.pdf",
  },
];

// Maintenance Requests
export const renterMaintenanceRequests: RenterMaintenanceRequest[] = [
  {
    id: "maint1",
    title: "Fuga de agua en baño principal",
    description:
      "Se presenta goteo constante en la llave del lavamanos del baño principal. El agua gotea incluso cuando la llave está completamente cerrada.",
    category: "plumbing",
    priority: "high",
    status: "in-progress",
    createdAt: new Date("2025-11-03"),
    landlordResponse:
      "Plomero contactado, visitará el apartamento el 8 de noviembre a las 10am.",
    estimatedCost: 150000,
  },
  {
    id: "maint2",
    title: "Bombillo de cocina fundido",
    description:
      "El bombillo principal de la cocina se fundió. Necesita reemplazo.",
    category: "electrical",
    priority: "low",
    status: "resolved",
    createdAt: new Date("2025-10-28"),
    resolvedAt: new Date("2025-10-30"),
    landlordResponse: "Bombillo reemplazado por el personal de mantenimiento.",
  },
  {
    id: "maint3",
    title: "Aire acondicionado no enfría bien",
    description:
      "El aire acondicionado de la habitación principal no está enfriando adecuadamente. Parece que necesita mantenimiento o recarga de gas.",
    category: "appliance",
    priority: "medium",
    status: "resolved",
    createdAt: new Date("2025-09-15"),
    resolvedAt: new Date("2025-09-18"),
    landlordResponse:
      "Técnico realizó mantenimiento y recarga de gas. Funcionando correctamente.",
    estimatedCost: 250000,
  },
];

// Dashboard Statistics
export const renterDashboardStats: RenterDashboardStats = {
  currentRent: 3200000,
  nextPaymentDate: new Date("2025-12-05"),
  nextPaymentAmount: 3200000,
  paymentStatus: "pending",
  contractExpiresIn: 396, // days until Dec 1, 2025
  openMaintenanceRequests: 1,
  totalPaymentsMade: 6,
  onTimePaymentRate: 100,
};

// Documents
export const renterDocuments: RenterDocument[] = [
  {
    id: "doc1",
    name: "Contrato de Arrendamiento 2024-2025",
    type: "contract",
    uploadDate: new Date("2024-06-01"),
    fileUrl: "/documents/contract-2024.pdf",
    fileSize: "2.3 MB",
  },
  {
    id: "doc2",
    name: "Factura Noviembre 2025",
    type: "invoice",
    uploadDate: new Date("2025-10-25"),
    fileUrl: "/invoices/2025-11.pdf",
    fileSize: "156 KB",
  },
  {
    id: "doc3",
    name: "Recibo de Pago Noviembre 2025",
    type: "receipt",
    uploadDate: new Date("2025-11-03"),
    fileUrl: "/receipts/2025-11.pdf",
    fileSize: "98 KB",
  },
  {
    id: "doc4",
    name: "Factura Octubre 2025",
    type: "invoice",
    uploadDate: new Date("2025-09-25"),
    fileUrl: "/invoices/2025-10.pdf",
    fileSize: "156 KB",
  },
  {
    id: "doc5",
    name: "Recibo de Pago Octubre 2025",
    type: "receipt",
    uploadDate: new Date("2025-10-04"),
    fileUrl: "/receipts/2025-10.pdf",
    fileSize: "98 KB",
  },
  {
    id: "doc6",
    name: "Inventario de Entrega",
    type: "other",
    uploadDate: new Date("2024-06-01"),
    fileUrl: "/documents/inventory.pdf",
    fileSize: "1.2 MB",
  },
];

// Payment chart data
export const paymentChartData = [
  { month: "Jun", amount: 3200000, status: "paid" },
  { month: "Jul", amount: 3200000, status: "paid" },
  { month: "Ago", amount: 3200000, status: "paid" },
  { month: "Sep", amount: 3200000, status: "paid" },
  { month: "Oct", amount: 3200000, status: "paid" },
  { month: "Nov", amount: 3200000, status: "paid" },
  { month: "Dec", amount: 3200000, status: "pending" },
];

// Recent Activity
export const renterRecentActivity = [
  {
    id: "act1",
    type: "payment",
    title: "Pago procesado",
    description: "Pago de arriendo de noviembre confirmado - $3.2M",
    timestamp: new Date("2025-11-03T10:30:00"),
  },
  {
    id: "act2",
    type: "maintenance",
    title: "Solicitud de mantenimiento actualizada",
    description: "Plomero programado para fuga de agua - 8 de noviembre",
    timestamp: new Date("2025-11-05T14:20:00"),
  },
  {
    id: "act3",
    type: "document",
    title: "Nueva factura disponible",
    description: "Factura de diciembre 2025 generada",
    timestamp: new Date("2025-10-25T09:00:00"),
  },
  {
    id: "act4",
    type: "maintenance",
    title: "Mantenimiento completado",
    description: "Bombillo de cocina reemplazado exitosamente",
    timestamp: new Date("2025-10-30T16:45:00"),
  },
  {
    id: "act5",
    type: "payment",
    title: "Pago procesado",
    description: "Pago de arriendo de octubre confirmado - $3.2M",
    timestamp: new Date("2025-10-04T11:15:00"),
  },
];
