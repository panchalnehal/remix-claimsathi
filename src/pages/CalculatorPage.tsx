import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Download, 
  DollarSign, 
  Percent, 
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { PayoutCalculator } from '../components/PayoutCalculator';
import { Breadcrumb } from '../components/Breadcrumb';

interface CalculatorPageProps {
  onBackToHome: () => void;
  onNavigateToAudit: () => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onBackToHome,
  onNavigateToAudit,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('hdfc');

  // Preset policies for top Indian health insurers
  const insurerPresets = [
    { id: 'hdfc', name: 'HDFC ERGO Optima Secure', roomCap: 'No Cap (Single Private)', copay: '0%', consumablesCover: 'Covered via Rider' },
    { id: 'star', name: 'Star Health Comprehensive', roomCap: '1% Sum Insured', copay: '10% if >60 yrs', consumablesCover: 'Non-payable' },
    { id: 'niva', name: 'Niva Bupa ReAssure 2.0', roomCap: 'No Cap', copay: '0%', consumablesCover: 'Included' },
    { id: 'care', name: 'Care Health Supreme', roomCap: '1% Sum Insured', copay: '20% Zone Co-pay', consumablesCover: 'Non-payable' },
    { id: 'icici', name: 'ICICI Lombard Elevate', roomCap: 'Single Private Room', copay: '0%', consumablesCover: 'Covered' },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation Bar */}
        <Breadcrumb
          onBackToHome={onBackToHome}
          items={[
            { label: 'Reimbursement Payout & Co-pay Calculator', active: true }
          ]}
        />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-teal-300">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>IRDAI Standard Fair Settlement Estimator</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Reimbursement Payout & Co-pay Calculator
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Calculate your exact approved reimbursement payout after room rent proportionate deductions, co-payment percentages, and non-medical consumables exclusions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Updated with 2024 IRDAI Master Circular
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero Secret Deductions
              </span>
            </div>
          </div>
        </div>

        {/* Insurer Preset Quick Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Select Your Health Insurer Policy Preset</span>
            </h2>
            <span className="text-[11px] font-semibold text-slate-500">Auto-applies room rent & co-pay rules</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {insurerPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPreset === preset.id
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <p className="text-xs font-bold truncate">{preset.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">Room: {preset.roomCap}</p>
                <p className="text-[10px] text-slate-500">Co-pay: {preset.copay}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Embedded Calculator Engine */}
        <PayoutCalculator />

        {/* Detailed Breakdown Rules Matrix */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg space-y-6">
          <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-teal-600" />
            How Insurers Calculate Your Health Insurance Claim Deductions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5 rounded-l-xl">Deduction Clause</th>
                  <th className="p-3.5">Trigger Condition</th>
                  <th className="p-3.5">Calculation Formula</th>
                  <th className="p-3.5 rounded-r-xl">IRDAI Legal Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Room Rent Capping</td>
                  <td className="p-3.5">Actual room rent exceeds policy daily limit</td>
                  <td className="p-3.5 text-rose-700 font-semibold">(Allowed Rent / Actual Rent) × Associated Medical Expenses</td>
                  <td className="p-3.5 text-emerald-700">ICU charges excluded from proportionate deduction under 2024 rules</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Consumables & Non-Medical</td>
                  <td className="p-3.5">Gloves, PPE, syringes, administrative charges</td>
                  <td className="p-3.5 text-rose-700 font-semibold">100% deducted unless rider present</td>
                  <td className="p-3.5 text-emerald-700">Max 5-8% of total bill for surgical procedures</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Co-Payment Share</td>
                  <td className="p-3.5">Senior citizen policy or cross-zone hospitalization</td>
                  <td className="p-3.5 text-rose-700 font-semibold">Policy % × (Total Eligible Bill Amount)</td>
                  <td className="p-3.5 text-emerald-700">Deducted strictly AFTER room rent & non-payable deductions</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Pre/Post Hospitalization</td>
                  <td className="p-3.5">Diagnostic & pharmacy expenses 60 days before / 90 days after</td>
                  <td className="p-3.5 text-emerald-700 font-semibold">100% Payable when linked to ailment</td>
                  <td className="p-3.5 text-emerald-700">Must submit within 30 days of post-discharge completion</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Need to scan your hospital bill and discharge summary to ensure no missing documents?
            </p>
            <button
              onClick={onNavigateToAudit}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
            >
              <span>Audit Hospital Bill Documents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
