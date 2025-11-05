export interface RenterProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  documentId: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface RentalProperty {
  id: string;
  name: string;
  address: string;
  city: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  rentAmount: number;
  images?: string[];
  description?: string;
  amenities?: string[];
  landlordName: string;
  landlordEmail: string;
  landlordPhone: string;
}

export interface RentalContract {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  depositAmount: number;
  depositPaid: boolean;
  status: "active" | "expiring" | "expired";
  contractUrl?: string;
}

export interface RenterPayment {
  id: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: "paid" | "pending" | "overdue";
  paymentMethod?: string;
  transactionId?: string;
  invoiceUrl?: string;
  lateFee?: number;
}

export interface RenterMaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: "plumbing" | "electrical" | "appliance" | "structural" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "submitted" | "in-progress" | "resolved" | "closed";
  createdAt: Date;
  resolvedAt?: Date;
  images?: string[];
  landlordResponse?: string;
  estimatedCost?: number;
}

export interface RenterDashboardStats {
  currentRent: number;
  nextPaymentDate: Date;
  nextPaymentAmount: number;
  paymentStatus: "paid" | "pending" | "overdue";
  contractExpiresIn: number; // days
  openMaintenanceRequests: number;
  totalPaymentsMade: number;
  onTimePaymentRate: number;
}

export interface RenterDocument {
  id: string;
  name: string;
  type: "contract" | "invoice" | "receipt" | "other";
  uploadDate: Date;
  fileUrl?: string;
  fileSize?: string;
}

export interface RenterMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: "renter" | "landlord";
  message: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface RenterConversation {
  id: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: RenterMessage[];
}

export interface RenterNotification {
  id: string;
  type: "payment" | "maintenance" | "document" | "message" | "contract" | "general";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}
