import React from 'react';
import { Shield, CheckCircle2, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigatePage?: (page: 'home' | 'audit' | 'calculator' | 'faqs') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const handleNav = (page: 'home' | 'audit' | 'calculator' | 'faqs', sectionId?: string) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
    if (sectionId && page === 'home') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                Claim<span className="text-emerald-500">Saathi</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's intelligent health insurance claim checklist and document audit assistant. Helping policyholders claim their rightful payouts without unfair room rent deductions or TPA delays.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Navigation</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleNav('home', 'how-it-works')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('audit')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Audit Your Hospital Bill & Documents Now
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Reimbursement Payout & Co-pay Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home', 'trust-rights')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  IRDAI Consumer Rights
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faqs')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* IRDAI Disclaimer */}
          <div className="md:col-span-4 space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-800">
            <p className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">Regulatory Information</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              ClaimSaathi is an independent educational tool providing document auditing based on public IRDAI Master Circular guidelines (2024). We are not an insurance broker or TPA. For legal disputes, escalate via the official Bima Bharosa portal.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 ClaimSaathi India. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Indian Policyholders
          </p>
        </div>

      </div>
    </footer>
  );
};
