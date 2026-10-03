import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  HelpCircle,
  Clock,
  Lock,
  ArrowRight
} from 'lucide-react';
import { InteractiveAuditWidget } from '../components/InteractiveAuditWidget';
import { Breadcrumb } from '../components/Breadcrumb';

interface AuditPageProps {
  onBackToHome: () => void;
  onNavigateToCalculator: () => void;
}

export const AuditPage: React.FC<AuditPageProps> = ({
  onBackToHome,
  onNavigateToCalculator,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setAnalyzing(true);
      setAnalysisDone(false);

      setTimeout(() => {
        setAnalyzing(false);
        setAnalysisDone(true);
      }, 1800);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation Bar */}
        <Breadcrumb
          onBackToHome={onBackToHome}
          items={[
            { label: 'Audit Hospital Bill & Documents', active: true }
          ]}
        />

        {/* Page Hero Header */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI-Powered Medical Claim Inspector</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Audit Your Hospital Bill & Documents Now
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Upload your discharge summary, final hospital bill, or pharmacy receipts for a instant clause-by-clause audit. Eliminate unexpected TPA rejections before submission.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                IRDAI Circular Compliant
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                256-bit Encrypted & Confidential
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300" />
                Results in under 60 seconds
              </span>
            </div>
          </div>
        </div>

        {/* Quick File Upload Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Upload Bill or Discharge Summary for Direct AI Scan
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports PDF, JPG, PNG files up to 15MB. Standard Indian hospital bill formats supported.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
              100% Free Audit
            </span>
          </div>

          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/30 rounded-2xl p-8 text-center transition-all cursor-pointer relative group">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleSimulatedUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {uploadedFile ? uploadedFile.name : 'Drag & drop hospital bill or discharge summary here'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  or <span className="text-blue-600 font-bold underline">browse files from computer or phone</span>
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Progress or Result */}
          {analyzing && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-2 animate-fade-in">
              <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-blue-900">Scanning bill items against IRDAI non-payable list & TPA guidelines...</p>
            </div>
          )}

          {analysisDone && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 animate-scale-up">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>AI Scan Complete: 4 Issues Detected in Hospital Bill</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 pl-6 list-disc">
                <li>Pharmacy bill is missing Drug License (DL) number — required by Star & HDFC ERGO.</li>
                <li>Implant invoice for Stent/Mesh sticker not attached.</li>
                <li>Consumables charge of ₹12,400 marked under non-medical list.</li>
              </ul>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">Recommended Action: Request doctor signature on page 2</span>
                <button
                  onClick={() => alert('Detailed PDF Audit Report downloaded!')}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Embedded Interactive Audit Widget */}
        <InteractiveAuditWidget />

        {/* Frequently Detected Hospital Bill Errors & IRDAI Guidelines */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg space-y-6">
          <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Top 5 Reasons Hospital Bills Get Deducted or Rejected
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-rose-100 text-rose-800">
                Error #1: 38% of Rejections
              </span>
              <h3 className="text-sm font-bold text-slate-900">Missing Doctor Signature or Hospital Stamp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discharge summaries printed on plain paper without a seal or registration number are automatically flagged by TPA claim engines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800">
                Error #2: 29% of Deductions
              </span>
              <h3 className="text-sm font-bold text-slate-900">Proportionate Room Rent Deduction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choosing a Deluxe Room when your policy caps at 1% of Sum Insured triggers a 30-50% cut on surgeon fees and ICU charges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                Error #3: 18% of Delays
              </span>
              <h3 className="text-sm font-bold text-slate-900">Unitemized Pharmacy Invoices</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lump-sum pharmacy receipts without individual medicine name and batch numbers are routinely rejected under IRDAI guidelines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Error #4: IRDAI Master Circular
              </span>
              <h3 className="text-sm font-bold text-slate-900">Non-Payable Consumables Exclusions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gloves, PPE kits, and sanitizers are non-payable unless you hold a specialized Consumable Add-On Rider.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Want to calculate how much you will receive after co-pay and deductions?
            </p>
            <button
              onClick={onNavigateToCalculator}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
            >
              <span>Go to Reimbursement Payout Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
