export type PropertyStatus = "available" | "occupied" | "maintenance" | "unavailable";
export type PropertyType = "apartment" | "house" | "studio" | "penthouse" | "office";
export type PaymentStatus = "paid" | "pending" | "overdue" | "partial";
export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number; // in m²
  rentAmount: number;
  images?: string[];
  description?: string;
  amenities?: string[];
  currentRenter?: Renter;
  renterId?: string;
  availableFrom?: Date;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Renter {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  propertyId: string;
  propertyName: string;
  rentAmount: number;
  paymentStatus: PaymentStatus;
  nextPaymentDate: Date;
  contractStart: Date;
  contractEnd: Date;
  documentId: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  depositAmount: number;
  depositPaid: boolean;
  notes?: string;
}

export interface Payment {
  id: string;
  renterId: string;
  renterName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  notes?: string;
  lateFee?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  renterId: string;
  renterName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  status: InvoiceStatus;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
  quantity?: number;
}

export interface OwnerDashboardStats {
  totalProperties: number;
  occupiedProperties: number;
  availableProperties: number;
  totalRenters: number;
  monthlyRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  occupancyRate: number;
  revenueGrowth: number;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  renterId: string;
  renterName: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: Date;
  resolvedAt?: Date;
  images?: string[];
  cost?: number;
}

export interface OwnerMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: "owner" | "renter";
  message: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface OwnerConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  propertyName?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: OwnerMessage[];
}

export interface OwnerNotification {
  id: string;
  type: "payment" | "maintenance" | "inquiry" | "contract" | "message" | "general";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  relatedId?: string;
}

export interface CalendarEvent {
  id: string;
  type: "payment" | "maintenance" | "contract" | "inspection" | "meeting";
  title: string;
  description?: string;
  date: Date;
  endDate?: Date;
  propertyId?: string;
  propertyName?: string;
  renterId?: string;
  renterName?: string;
  status: "scheduled" | "completed" | "cancelled";
  color?: string;
}
