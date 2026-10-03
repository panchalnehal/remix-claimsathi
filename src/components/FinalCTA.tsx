import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onOpenAudit: () => void;
  onOpenCalculator: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenAudit, onOpenCalculator }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    if (cardRef.current && btnRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      ).fromTo(
        btnRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' },
        '-=0.2'
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div
          ref={cardRef}
          className="relative bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-700/50 text-center space-y-8 overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Reassuring Pill */}
          <div className="inline-flex items-center gap-2 bg-emerald-700/60 border border-emerald-500/40 px-4 py-1.5 rounded-full text-emerald-100 text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>100% Free & Confidential Health Claim Audit</span>
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
              Don't Let Hospital Bills Stress Your Family.
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-normal">
              Scan your discharge summary and bills in 60 seconds. Get your complete, organized claim packet ready for hospital & TPA submission.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              ref={btnRef}
              onClick={onOpenAudit}
              className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold px-8 py-4 rounded-xl shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Start Free Document Audit</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-bold px-6 py-4 rounded-xl border border-emerald-600/50 hover:border-emerald-500 transition-all text-sm cursor-pointer"
            >
              Calculate Reimbursement
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-[11px] text-emerald-200/80 font-medium">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-300" /> Confidential & Encrypted</span>
            <span>•</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> No Sign-Up Needed</span>
          </div>

        </div>

      </div>
    </section>
  );
};
