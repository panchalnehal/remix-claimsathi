import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Upload, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw,
  FileText,
  Info,
  Sparkles
} from 'lucide-react';
import { INITIAL_CHECKLIST } from '../data/claimData';
import { DocumentItem } from '../types/claim';

export const InteractiveAuditWidget: React.FC = () => {
  const [claimType, setClaimType] = useState<'cashless' | 'reimbursement'>('reimbursement');
  const [estimatedBill, setEstimatedBill] = useState<number>(185000);
  const [roomCategory, setRoomCategory] = useState<'single_private' | 'shared_twin' | 'deluxe_suite'>('single_private');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'discharge-summary': true,
    'itemized-bill': true,
    'pre-auth': false,
    'pharmacy-bills': true,
    'payment-receipts': true,
    'diagnostic-reports': false
  });

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter docs required for selected claim type
  const relevantDocs = INITIAL_CHECKLIST.filter(doc => 
    doc.requiredFor === 'both' || doc.requiredFor === claimType
  );

  const totalRequired = relevantDocs.length;
  const totalChecked = relevantDocs.filter(d => checkedDocs[d.id]).length;
  const scorePercent = Math.round((totalChecked / totalRequired) * 100);

  // Risk & deduction calculations
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let riskColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  
  if (scorePercent < 50) {
    riskLevel = 'High';
    riskColor = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (scorePercent < 85) {
    riskLevel = 'Medium';
    riskColor = 'text-amber-600 bg-amber-50 border-amber-200';
  }

  // Estimated potential deduction preview
  const estimatedDeduction = scorePercent < 100 
    ? Math.round((estimatedBill * (100 - scorePercent) * 0.25) / 100) 
    : 0;

  return (
    <section id="audit-widget" className="py-20 bg-gradient-to-b from-[#FAF8F5] via-emerald-50/10 to-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Claim Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Audit Your Hospital Bill & Documents Now
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your claim type and toggle your available documents to see your instant Approval Likelihood Score and potential deduction warnings.
          </p>
        </div>

        {/* Main Interactive Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Inputs & Checklist */}
          <div className="lg:col-span-7 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/70 p-6 shadow-xl space-y-6">
            
            {/* Claim Type Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                1. Select Claim Type
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setClaimType('reimbursement')}
                  className={`py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    claimType === 'reimbursement'
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Reimbursement Claim
                </button>
                <button
                  type="button"
                  onClick={() => setClaimType('cashless')}
                  className={`py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    claimType === 'cashless'
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cashless Approval
                </button>
              </div>
            </div>

            {/* Bill Amount Slider & Room Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Estimated Bill Amount</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    ₹{estimatedBill.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={estimatedBill}
                  onChange={(e) => setEstimatedBill(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Hospital Room Category
                </label>
                <select
                  value={roomCategory}
                  onChange={(e) => setRoomCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="shared_twin">Shared / Twin Sharing Room</option>
                  <option value="single_private">Single Private AC Room</option>
                  <option value="deluxe_suite">Deluxe Suite / Executive Room</option>
                </select>
              </div>
            </div>

            {/* Document Checklist Selection */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Check Available Documents ({totalChecked}/{totalRequired})
                </label>
                <button
                  onClick={() => {
                    const allTrue: Record<string, boolean> = {};
                    relevantDocs.forEach(d => { allTrue[d.id] = true; });
                    setCheckedDocs(allTrue);
                  }}
                  className="text-[11px] font-semibold text-emerald-600 hover:underline"
                >
                  Select All
                </button>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {relevantDocs.map((doc) => {
                  const isChecked = !!checkedDocs[doc.id];
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDoc(doc.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-rose-50/40 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div
                        className="mt-1 w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">{doc.title}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isChecked ? 'Attached' : 'Missing'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{doc.subtitle}</p>
                        {/* IRDAI Tip */}
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-emerald-800 bg-emerald-100/60 px-2 py-1 rounded">
                          <Info className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{doc.irdaiTip}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Panel: Instant Audit Results & Risk Report */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
            
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Live Audit Diagnosis</h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${riskColor}`}>
                {riskLevel} Risk
              </span>
            </div>

            {/* Score Ring / Meter */}
            <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100 text-center space-y-3">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Claim Approval Likelihood
              </p>
              
              <div className="flex items-baseline justify-center gap-1 font-heading">
                <span className={`text-5xl font-extrabold ${
                  scorePercent >= 85 ? 'text-emerald-700' : scorePercent >= 50 ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {scorePercent}%
                </span>
                <span className="text-slate-400 text-lg">/ 100%</span>
              </div>

              {/* Status Message */}
              <p className="text-xs font-semibold text-slate-700">
                {scorePercent === 100
                  ? '🎉 Excellent! All mandatory documents attached. Minimal risk of rejection.'
                  : scorePercent >= 60
                  ? '⚠️ Good, but missing key attachments could trigger TPA queries and 10-14 days delay.'
                  : '🚨 High Rejection Risk! Critical mandatory documents are missing.'}
              </p>
            </div>

            {/* Potential Deduction Warning Box */}
            {estimatedDeduction > 0 && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Estimated Out-of-Pocket Risk</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  You risk losing up to <strong className="text-amber-950 font-bold">₹{estimatedDeduction.toLocaleString('en-IN')}</strong> in non-payable deductions due to missing documentation links.
                </p>
              </div>
            )}

            {/* Room Rent Capping Note if Deluxe Suite */}
            {roomCategory === 'deluxe_suite' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <p className="font-bold text-rose-800 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Room Category Tip:
                </p>
                <p className="text-[11px] leading-tight text-rose-800">
                  Deluxe suite choice may trigger 25-40% Proportionate Deduction on surgeon & nursing fees if your policy has a 1% sum insured cap.
                </p>
              </div>
            )}

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  alert("Your full audit report is generated! Scroll down to generate your pre-formatted TPA packet.");
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span>Get Complete Audit Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
