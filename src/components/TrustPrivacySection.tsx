import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Lock, Award, FileText, Scale, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_INSURERS } from '../data/claimData';

gsap.registerPlugin(ScrollTrigger);

export const TrustPrivacySection: React.FC = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const insurersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1, // 100ms stagger between cards
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (insurersRef.current) {
      gsap.fromTo(
        insurersRef.current.children,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: insurersRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section id="trust-rights" className="py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">
            IRDAI Compliant & Consumer-First
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Your Rights Under Indian Insurance Regulations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We empower Indian policyholders with absolute transparency, strict 256-bit encryption, and zero hidden clauses.
          </p>
        </div>

        {/* 3 Core Trust Pillars Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">30-Day Mandatory Settlement Rule</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Under IRDAI Master Circular 2024, insurers MUST settle claims within 30 days of receiving all documents. Failure incurs 2% interest per annum above bank rate payable to you.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Auto-Interest Penalty Drafting</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100/90 text-teal-700 flex items-center justify-center border border-teal-200">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero Cloud Retention Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your sensitive medical records, discharge bills, and Diagnostic reports are processed strictly in encrypted memory and purged immediately after downloading your claim docket.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>256-Bit SSL Bank Grade Security</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center border border-amber-200">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Insurance Ombudsman Escalation</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If your claim is unfairly rejected or delayed beyond 30 days, ClaimSaathi auto-formats your Bima Bharosa / Ombudsman grievance filing for free resolution up to ₹50 Lakhs.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>100% Free Ombudsman Drafts</span>
            </div>
          </div>

        </div>

        {/* Supported Insurers Banner */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-8 text-center space-y-6 shadow-xl">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Compatible with All Major Indian Health Insurers & TPA Services
          </p>
          <div ref={insurersRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {SUPPORTED_INSURERS.map((partner) => (
              <div
                key={partner.name}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 text-slate-700 hover:text-emerald-900 text-xs font-extrabold flex items-center gap-2 transition-all cursor-default"
              >
                <span>{partner.logo}</span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
