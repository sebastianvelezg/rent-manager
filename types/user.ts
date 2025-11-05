export type UserRole = "owner" | "renter" | "admin";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";
export type SubscriptionPlan = "free" | "basic" | "pro" | "enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;

  // Owner specific
  properties?: number;
  totalRevenue?: number;
  subscriptionPlan?: SubscriptionPlan;

  // Renter specific
  propertyAddress?: string;
  rentAmount?: number;
  paymentStatus?: "paid" | "pending" | "overdue";
  nextPaymentDate?: Date;

  // Additional info
  address?: string;
  city?: string;
  country?: string;
  documentId?: string;
  notes?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalOwners: number;
  totalRenters: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  pendingPayments: number;
  newUsersThisMonth: number;
}
