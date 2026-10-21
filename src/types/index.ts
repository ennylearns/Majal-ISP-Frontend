export interface RouterDevice {
  id: string;
  name: string;
  model: string;
  routerOsVersion: string;
  ipAddress: string;
  location: string;
  status: 'online' | 'degraded' | 'offline';
  cpuLoad: number;
  memoryUsage: number;
  activeHotspotUsers: number;
  uptime: string;
  lastPing: string;
}

export interface Subscriber {
  id: string;
  name: string;
  phone: string;
  macAddress: string;
  ipAddress: string;
  packagePurchased: string;
  startedAt: string;
  expiresAt: string;
  dataUsedMb: number;
  dataLimitMb: number | null; // null = unlimited
  status: 'active' | 'expired' | 'blocked';
  routerLocation: string;
}

export interface HotspotPackage {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  durationLabel: string;
  priceNgn: number;
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
  dataCapMb?: number | null;
  isActive: boolean;
  popular?: boolean;
}

export interface Transaction {
  id: string;
  customerPhone: string;
  packageId: string;
  packageName: string;
  amountNgn: number;
  paymentMethod: 'Card' | 'Bank Transfer' | 'USSD';
  reference: string;
  status: 'verified' | 'pending' | 'failed';
  timestamp: string;
  routerLocation: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  audience: string;
  monthlyNgn: number;
  annualNgn: number;
  popular?: boolean;
  features: {
    routers: string;
    subscribers: string;
    locations: string;
    billingPortal: string;
    paymentWebhooks: string;
    analytics: string;
    support: string;
  };
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  routerCount: string;
  mikrotikModels: string;
  notes?: string;
}
