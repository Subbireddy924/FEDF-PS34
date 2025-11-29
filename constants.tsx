import { CertStatus, Certificate } from './types';
import { Layers, ShieldCheck, Zap, BarChart3, Clock, CheckCircle } from 'lucide-react';

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    expiryDate: '2025-11-15',
    status: CertStatus.ACTIVE,
    progress: 85,
    category: 'Cloud'
  },
  {
    id: '2',
    name: 'Certified Scrum Master',
    issuer: 'Scrum Alliance',
    expiryDate: '2024-06-01',
    status: CertStatus.EXPIRING,
    progress: 15,
    category: 'Agile'
  },
  {
    id: '3',
    name: 'Google Professional Data Engineer',
    issuer: 'Google Cloud',
    expiryDate: '2024-05-20',
    status: CertStatus.PENDING,
    progress: 0,
    category: 'Data'
  },
  {
    id: '4',
    name: 'React Native Expert',
    issuer: 'Meta',
    expiryDate: '2023-12-01',
    status: CertStatus.EXPIRED,
    progress: 0,
    category: 'Mobile'
  }
];

export const BENEFITS = [
  {
    title: "70% Reduced Effort",
    description: "Automated tracking eliminates manual spreadsheets and email chasers.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    title: "100% Compliance",
    description: "Real-time dashboards ensure no certification ever goes unnoticed.",
    icon: ShieldCheck,
    color: "text-brand-cyan"
  },
  {
    title: "Data-Driven Insights",
    description: "Comprehensive reports on skill gaps and training needs.",
    icon: BarChart3,
    color: "text-purple-400"
  }
];

export const APPROVAL_QUEUE = [
  { id: 1, user: 'Alice Johnson', cert: 'PMP Certification', date: '2 hrs ago' },
  { id: 2, user: 'Bob Smith', cert: 'Azure Fundamentals', date: '5 hrs ago' },
  { id: 3, user: 'Charlie Davis', cert: 'CISSP Security', date: '1 day ago' },
];

export const JOURNEY_STEPS = [
  { title: 'Upload', desc: 'User uploads certificate proof', icon: Layers },
  { title: 'AI Verification', desc: 'System validates authenticity', icon: Zap },
  { title: 'Admin Review', desc: 'Final manual approval', icon: CheckCircle },
  { title: 'Notification', desc: 'User notified & Profile updated', icon: Clock },
];
