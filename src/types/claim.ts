export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'pending' | 'checking' | 'verified' | 'issue';
  requiredFor: 'both' | 'cashless' | 'reimbursement';
  irdaiTip: string;
  iconName: string;
}

export interface ClaimAuditResult {
  readinessScore: number;
  statusText: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  warnings: string[];
  tips: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  insurer: string;
  amountSaved: string;
  issue: string;
  story: string;
  avatarUrl: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Cashless' | 'Reimbursement' | 'Rejections';
}
