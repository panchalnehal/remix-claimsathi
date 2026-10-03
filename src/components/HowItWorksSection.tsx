import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, FileSearch, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Timeline pinned to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top+=80',
          end: '+=1200',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Step 1 initial highlight -> fill line to Step 2 -> highlight Step 2 -> fill line to Step 3 -> highlight Step 3
      tl.fromTo(step1Ref.current, { opacity: 0.3, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .to(progressLineRef.current, { height: '50%', duration: 1.2 }, '-=0.2')
        .fromTo(step2Ref.current, { opacity: 0.3, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to(progressLineRef.current, { height: '100%', duration: 1.2 }, '-=0.2')
        .fromTo(step3Ref.current, { opacity: 0.3, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      
      {/* Background Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          3-Step Zero-Rejection Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 font-heading">
          How ClaimSaathi Protects Your Payout
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          Scroll down to see how our intelligent engine catches deductions, unlinked pharmacy bills, and missing hospital notes before your insurer does.
        </p>
      </div>

      {/* Pinned Scroll Container */}
      <div ref={triggerRef} className="max-w-4xl mx-auto px-4 sm:px-6 min-h-[600px] flex items-center">
        <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Progress Bar Connector */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-1 bg-slate-100 rounded-full z-0">
            <div
              ref={progressLineRef}
              className="w-full bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-600 rounded-full h-0 transition-all duration-100"
            />
          </div>

          {/* Steps Column */}
          <div className="md:col-span-12 space-y-8 relative z-10 pl-0 md:pl-16">
            
            {/* STEP 1 */}
            <div
              ref={step1Ref}
              className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col md:flex-row gap-5 items-start md:items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/30">
                <UploadCloud className="w-7 h-7 stroke-[2]" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase border border-emerald-200">
                    Step 01
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Takes 30 Seconds</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Upload Hospital Discharge Summary & Bills
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Snap a photo or drop PDFs of your final hospital bill, pharmacy vouchers, and pre-auth clearance. Our OCR engine auto-extracts ICD-10 diagnosis codes and line items.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div
              ref={step2Ref}
              className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col md:flex-row gap-5 items-start md:items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-600/30">
                <FileSearch className="w-7 h-7 stroke-[2]" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-teal-700 bg-teal-100/80 px-2.5 py-0.5 rounded-full uppercase border border-teal-200">
                    Step 02
                  </span>
                  <span className="text-xs text-slate-500 font-medium">IRDAI Clause Audit</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  AI & Insurance Expert Deductions Check
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We cross-reference every item against your policy terms: room rent capping, co-pay ratios, non-medical consumable lists, and missing doctor consultation links.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div
              ref={step3Ref}
              className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col md:flex-row gap-5 items-start md:items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-700/30">
                <CheckCircle2 className="w-7 h-7 stroke-[2]" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase border border-emerald-200">
                    Step 03
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Ready to Submit</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Get Formatted Claim Docket & Appeal Template
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Download a pre-sorted, indexed PDF packet ready to email or hand over to your TPA / Insurer. Includes IRDAI dispute draft if room rent capping was misapplied.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
