export enum Role {
  GUEST = 'GUEST',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN'
}

export enum CertStatus {
  ACTIVE = 'Active',
  EXPIRING = 'Expiring Soon',
  EXPIRED = 'Expired',
  PENDING = 'Pending Approval'
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  expiryDate: string;
  status: CertStatus;
  progress: number; // For circular progress
  category: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: any;
}

export type Page = 'LANDING' | 'SIGNIN' | 'SIGNUP' | 'LOGIN' | 'EMPLOYEE' | 'ADMIN' | 'JOURNEY' | 'REPORTS';