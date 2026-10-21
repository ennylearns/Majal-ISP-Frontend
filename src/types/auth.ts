export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  venueName: string;
  avatar: string;
  balanceNgn: number;
  activeRouters: number;
}

export interface RegisteredAccount {
  name: string;
  email: string;
  password?: string;
  venueName: string;
  role: string;
}

export interface HotspotTransaction {
  id: string;
  name: string;
  planName: string;
  date: string;
  time: string;
  status: 'Successful' | 'Pending' | 'Failed';
  amountNgn: number;
  category: 'Voucher' | 'RADIUS' | 'Corporate' | 'Payout';
  gatewayId: string;
}

export interface RouterNode {
  id: string;
  identity: string;
  model: string;
  ipAddress: string;
  apiPort: number;
  location: string;
  activeUsers: number;
  cpuLoadPercent: number;
  status: 'Online' | 'Synchronizing' | 'Offline';
  uptime: string;
}

export interface VoucherBatch {
  id: string;
  profileName: string;
  duration: string;
  bandwidthLimit: string;
  priceNgn: number;
  count: number;
  generatedAt: string;
  status: 'Active' | 'Depleted';
}

export interface WifiPlan {
  id: string;
  name: string;
  duration: string;
  priceNgn: number;
  speedLimit: string;
  deviceLimit: number;
  dataLimit: string;
  isPopular?: boolean;
  isActive: boolean;
  description?: string;
}

