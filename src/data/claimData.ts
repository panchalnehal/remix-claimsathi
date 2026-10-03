import { DocumentItem, Testimonial, FAQItem } from '../types/claim';

export const INITIAL_CHECKLIST: DocumentItem[] = [
  {
    id: 'discharge-summary',
    title: 'Hospital Discharge Summary',
    subtitle: 'Must feature Admission & Discharge time, ICD-10 Diagnosis code & Doctor signature',
    status: 'pending',
    requiredFor: 'both',
    irdaiTip: 'IRDAI Mandate: Hospital must issue within 2 hours of bill settlement.',
    iconName: 'FileText'
  },
  {
    id: 'itemized-bill',
    title: 'Detailed Itemized Breakup Bill',
    subtitle: 'Line-by-line breakdown for ICU, Nursing, Pharmacy & Consumables',
    status: 'pending',
    requiredFor: 'both',
    irdaiTip: 'Crucial to prevent bulk deduction under "Miscellaneous charges".',
    iconName: 'Receipt'
  },
  {
    id: 'pre-auth',
    title: 'TPA Pre-Authorization Approval',
    subtitle: 'Initial approval letter or cashless query reply from Insurance TPA',
    status: 'pending',
    requiredFor: 'cashless',
    irdaiTip: 'Check if initial sanctioned amount matches final hospital estimate.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'pharmacy-bills',
    title: 'Pharmacy Bills with Prescriptions',
    subtitle: 'Original tax invoices paired with attending doctor consultation note',
    status: 'pending',
    requiredFor: 'reimbursement',
    irdaiTip: 'Every medicine purchase over ₹500 must have matching doctor notes.',
    iconName: 'Pill'
  },
  {
    id: 'payment-receipts',
    title: 'Payment Receipts & Paid Vouchers',
    subtitle: 'Stamped original receipts showing patient name, transaction ID & UPI/Card ref',
    status: 'pending',
    requiredFor: 'reimbursement',
    irdaiTip: 'Advance deposit receipts paid at admission must be explicitly attached.',
    iconName: 'CreditCard'
  },
  {
    id: 'diagnostic-reports',
    title: 'Diagnostic Test Reports (Lab/MRI/CT)',
    subtitle: 'All Blood tests, X-Rays & Imaging reports corresponding to billed investigations',
    status: 'pending',
    requiredFor: 'both',
    irdaiTip: 'Insurers reject lab bill claims if test results/film images are missing.',
    iconName: 'Activity'
  }
];

export const SUPPORTED_INSURERS = [
  { name: 'Star Health', logo: '⭐' },
  { name: 'Care Insurance', logo: '🛡️' },
  { name: 'HDFC ERGO', logo: '🏥' },
  { name: 'Niva Bupa', logo: '💙' },
  { name: 'ICICI Lombard', logo: '🔶' },
  { name: 'Bajaj Allianz', logo: '⚡' },
  { name: 'Tata AIG', logo: '🌟' },
  { name: 'Medi Assist TPA', logo: '🤝' },
  { name: 'Paramount TPA', logo: '📍' },
  { name: 'Heritage TPA', logo: '🏢' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kulkarni',
    location: 'Mumbai, Maharashtra',
    insurer: 'Star Health',
    amountSaved: '₹1,42,000',
    issue: 'Illegal Room Rent Proportionate Deduction',
    story: 'The TPA unfairly deducted 35% across all surgeon fees claiming room rent capping. ClaimSaathi generated the exact IRDAI Circular clause and re-file template. Settled in 9 days!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    id: '2',
    name: 'Priya Sundaram',
    location: 'Bengaluru, Karnataka',
    insurer: 'Care Health',
    amountSaved: '₹88,500',
    issue: 'Missing Doctor Prescription Rejection',
    story: 'Reimbursement for post-hospitalization medicines was flat rejected. ClaimSaathi flagged missing OPD prescription links before re-submission. 100% money credited!',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    id: '3',
    name: 'Amitabh Sharma',
    location: 'Delhi NCR',
    insurer: 'Niva Bupa',
    amountSaved: '₹2,15,000',
    issue: 'Delayed Cashless Discharge Sanction',
    story: 'Hospital held my elderly father for 7 hours waiting for TPA final clearance. ClaimSaathi escalation workflow pushed emergency priority processing within 25 minutes.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is ClaimSaathi and how does it help with health insurance claims?',
    answer: 'ClaimSaathi is an intelligent claim preparation and document verification platform designed for Indian policyholders. We audit your hospital bills, discharge summaries, and receipts against official IRDAI guidelines to catch missing documents, illegal room-rent deductions, and hidden exclusions BEFORE you submit to your insurer or TPA.'
  },
  {
    id: 'faq-2',
    category: 'Reimbursement',
    question: 'How does ClaimSaathi prevent "Proportionate Deduction" penalties on room rent?',
    answer: 'If your daily room tariff exceeds your policy room rent cap (e.g., policy cap is ₹5,000/day but you stayed in a ₹8,000/day room), insurers proportionately reduce doctors, nursing, and ICU fees. ClaimSaathi calculates this beforehand and identifies non-deductible items (like fixed MRP implants & medicine costs) that legally CANNOT be proportionately reduced.'
  },
  {
    id: 'faq-3',
    category: 'Cashless',
    question: 'Can I use ClaimSaathi during an emergency hospital admission?',
    answer: 'Yes! Our Instant Cashless Readiness Tool allows you to scan or cross-check your pre-authorization request, ID proofs, and doctor recommendation letter on your smartphone at the hospital desk to ensure immediate TPA approval without query delays.'
  },
  {
    id: 'faq-4',
    category: 'Rejections',
    question: 'What if my health claim has already been partially or fully rejected?',
    answer: 'Don\'t panic. Over 40% of initial rejections in India are due to clerical mistakes, unlinked lab reports, or vague hospital notes. ClaimSaathi provides automated re-appeal drafting referencing IRDAI Master Circular 2024 to escalate directly to the insurer\'s grievance officer or Insurance Ombudsman.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Is my medical data and hospital documents secure on ClaimSaathi?',
    answer: '100% private and encrypted. We follow bank-grade 256-bit SSL encryption. Documents are processed in-memory for instant audit and never sold, shared, or retained without your explicit permission.'
  }
];
