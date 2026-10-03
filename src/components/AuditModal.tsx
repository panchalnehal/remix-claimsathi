import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  Building2,
  RefreshCw,
  FileCheck2
} from 'lucide-react';
import { SUPPORTED_INSURERS } from '../data/claimData';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'upload' | 'scanning' | 'results'>('upload');
  const [selectedInsurer, setSelectedInsurer] = useState<string>('Star Health');
  const [claimAmount, setClaimAmount] = useState<string>('185000');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleStartScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('results');
    }, 2200);
  };

  const handleReset = () => {
    setStep('upload');
    setUploadedFile(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white/85 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/80"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 font-bold border border-white/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg leading-tight text-white">
                  Document Audit & Claim Assistant
                </h3>
                <p className="text-xs text-emerald-200/80">
                  100% Confidential • Zero Data Saved on Cloud
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            
            {step === 'upload' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Insurance Company</label>
                    <select
                      value={selectedInsurer}
                      onChange={(e) => setSelectedInsurer(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {SUPPORTED_INSURERS.map((ins) => (
                        <option key={ins.name} value={ins.name}>{ins.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Estimated Claim Amount (₹)</label>
                    <input
                      type="number"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-mono font-bold rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. 185000"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Upload Hospital Discharge Summary / Final Bill
                  </label>
                  <div
                    onClick={() => setUploadedFile("Discharge_Summary_Fortis.pdf")}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      uploadedFile
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/20'
                    }`}
                  >
                    {uploadedFile ? (
                      <div className="flex items-center justify-center gap-3 text-emerald-800">
                        <FileCheck2 className="w-8 h-8 text-emerald-600" />
                        <div className="text-left">
                          <p className="text-xs font-bold">{uploadedFile}</p>
                          <p className="text-[10px] text-emerald-600">Document Ready (2.4 MB)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
                        <p className="text-xs font-bold text-slate-800">
                          Click to select PDF or image, or drag & drop file
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Supports PDF, JPG, PNG (Max 25MB). You can also click to load sample file.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  onClick={handleStartScan}
                  disabled={!uploadedFile && false} // allow sample click anytime
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Run IRDAI Rules Audit Scan</span>
                </button>
              </div>
            )}

            {step === 'scanning' && (
              <div className="py-12 text-center space-y-4">
                <RefreshCw className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">
                  Scanning Document Against 2026 IRDAI Norms...
                </h4>
                <div className="max-w-xs mx-auto space-y-1 text-xs text-slate-500">
                  <p>• Extracting ICD-10 Diagnosis codes...</p>
                  <p>• Checking room rent capping clauses...</p>
                  <p>• Verifying pharmacy prescription links...</p>
                </div>
              </div>
            )}

            {step === 'results' && (
              <div className="space-y-5">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-sm text-emerald-950">
                        Audit Complete: 94% Approval Likelihood
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Target Insurer: {selectedInsurer} • Bill: ₹{Number(claimAmount).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full">
                    LOW RISK
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="font-bold text-slate-800">Key Audit Findings:</p>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Hospital Discharge Summary Validated</p>
                      <p className="text-slate-500">Features ICD-10 diagnosis code and treating doctor signature.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Missing Pharmacy Prescription Link</p>
                      <p className="text-amber-800">Attach doctor consultation notes for medicine bills exceeding ₹1,500 to avoid ₹4,200 deduction.</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Scan Another File
                  </button>
                  <button
                    onClick={() => {
                      alert("Downloading pre-formatted IRDAI TPA Claim Docket (PDF)!");
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download TPA Docket</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
