import React, { useState } from 'react';
import { Calculator, DollarSign, CheckCircle2, AlertCircle, ArrowUpRight, Percent, Building2 } from 'lucide-react';

export const PayoutCalculator: React.FC = () => {
  const [totalBill, setTotalBill] = useState<number>(250000);
  const [sumInsured, setSumInsured] = useState<number>(500000);
  const [roomRentCap, setRoomRentCap] = useState<number>(5000); // Daily limit
  const [actualRoomRent, setActualRoomRent] = useState<number>(8000); // Daily actual
  const [hospitalStayDays, setHospitalStayDays] = useState<number>(4);
  const [copayPercent, setCopayPercent] = useState<number>(10);
  const [consumablesAmount, setConsumablesAmount] = useState<number>(18000);

  // Calculations
  // 1. Room rent excess
  const maxRoomRentAllowed = roomRentCap * hospitalStayDays;
  const actualRoomRentTotal = actualRoomRent * hospitalStayDays;
  const roomRentExcess = Math.max(0, actualRoomRentTotal - maxRoomRentAllowed);

  // 2. Proportionate deduction multiplier if room rent capped
  const roomRatio = actualRoomRent > roomRentCap ? roomRentCap / actualRoomRent : 1;
  const roomDeductionAmount = actualRoomRent > roomRentCap ? Math.round((totalBill - consumablesAmount - actualRoomRentTotal) * (1 - roomRatio)) : 0;

  // 3. Consumables deduction
  const consumablesDeduction = consumablesAmount;

  // 4. Co-pay calculation on remaining bill
  const subtotalEligible = Math.max(0, totalBill - roomDeductionAmount - consumablesDeduction - roomRentExcess);
  const copayDeduction = Math.round(subtotalEligible * (copayPercent / 100));

  // 5. Final Approved Payout
  const netApprovedPayout = Math.max(0, subtotalEligible - copayDeduction);
  const totalOutofPocket = Math.round(totalBill - netApprovedPayout);

  return (
    <section id="payout-calculator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 uppercase tracking-widest">
            Fair Share Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Reimbursement Payout & Co-pay Calculator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Understand exactly how room rent capping, co-pay ratios, and non-payable consumables impact your net bank payout before you file.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Input Claim & Policy Parameters</span>
            </h3>

            {/* Total Bill & Sum Insured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total Hospital Bill (₹)</label>
                <input
                  type="number"
                  step="5000"
                  value={totalBill}
                  onChange={(e) => setTotalBill(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 font-mono font-bold text-sm rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Policy Sum Insured (₹)</label>
                <input
                  type="number"
                  step="50000"
                  value={sumInsured}
                  onChange={(e) => setSumInsured(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 font-mono font-bold text-sm rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Room Rent Daily Limit vs Actual */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Policy Room Cap / Day</label>
                <input
                  type="number"
                  step="500"
                  value={roomRentCap}
                  onChange={(e) => setRoomRentCap(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 font-mono text-xs font-bold rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Actual Room Rent / Day</label>
                <input
                  type="number"
                  step="500"
                  value={actualRoomRent}
                  onChange={(e) => setActualRoomRent(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 font-mono text-xs font-bold rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Hospital Stay (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={hospitalStayDays}
                  onChange={(e) => setHospitalStayDays(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 font-mono text-xs font-bold rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Co-pay & Consumables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Co-pay Clause (%)</label>
                <div className="flex gap-2">
                  {[0, 10, 20].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCopayPercent(val)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        copayPercent === val
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Consumables / Non-medical Items (₹)</label>
                <input
                  type="number"
                  step="1000"
                  value={consumablesAmount}
                  onChange={(e) => setConsumablesAmount(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 font-mono text-xs font-bold rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xl space-y-5">
            
            <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Estimated Settlement Breakdown</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                IRDAI Standard
              </span>
            </h3>

            {/* Main Net Payout Hero */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 text-center space-y-1">
              <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
                Expected Net Bank Credit
              </p>
              <p className="text-4xl font-extrabold font-heading text-emerald-700">
                ₹{netApprovedPayout.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] font-medium text-emerald-800">
                {Math.round((netApprovedPayout / totalBill) * 100)}% of total hospital bill covered
              </p>
            </div>

            {/* Deduction Items Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
              
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Total Hospital Bill</span>
                <span className="font-bold text-slate-900">₹{totalBill.toLocaleString('en-IN')}</span>
              </div>

              {roomDeductionAmount > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-slate-100 text-rose-700 font-medium">
                  <span>Room Rent Proportionate Deduction</span>
                  <span className="font-bold">- ₹{roomDeductionAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {consumablesDeduction > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-slate-100 text-rose-700 font-medium">
                  <span>Non-Payable Consumables</span>
                  <span className="font-bold">- ₹{consumablesDeduction.toLocaleString('en-IN')}</span>
                </div>
              )}

              {copayDeduction > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-slate-100 text-amber-700 font-medium">
                  <span>Co-pay Share ({copayPercent}%)</span>
                  <span className="font-bold">- ₹{copayDeduction.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 font-bold text-rose-700 text-sm">
                <span>Total Out-of-Pocket Expense</span>
                <span>₹{totalOutofPocket.toLocaleString('en-IN')}</span>
              </div>

            </div>

            {/* Smart Tip Box */}
            <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 space-y-1">
              <p className="font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ClaimSaathi Optimization Tip:
              </p>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Attach your Consumables Rider add-on policy to recover up to ₹{consumablesDeduction.toLocaleString('en-IN')} in glove, syringe, and mask charges!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
