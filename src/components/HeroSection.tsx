import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ShieldCheck, ArrowRight, FileText, Lock, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenAudit: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAudit, onOpenCalculator }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const phoneDeviceRef = useRef<HTMLDivElement>(null);

  // References to the 12 scattered geometric shapes
  const shape0Ref = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const shape4Ref = useRef<HTMLDivElement>(null);
  const shape5Ref = useRef<HTMLDivElement>(null);
  const shape6Ref = useRef<HTMLDivElement>(null);
  const shape7Ref = useRef<HTMLDivElement>(null);
  const shape8Ref = useRef<HTMLDivElement>(null);
  const shape9Ref = useRef<HTMLDivElement>(null);
  const shape10Ref = useRef<HTMLDivElement>(null);
  const shape11Ref = useRef<HTMLDivElement>(null);

  // Animated Inner Phone Checklist State (Continuous loop)
  const [checkedCount, setCheckedCount] = useState<number>(0);

  const checklistItems = [
    { title: 'Discharge Summary & Breakup', code: 'IRDAI-01' },
    { title: 'Itemized Hospital Bill & Receipts', code: 'IRDAI-02' },
    { title: 'Pharmacy Invoices & Prescriptions', code: 'IRDAI-03' },
    { title: 'Diagnostic Lab Reports', code: 'IRDAI-04' },
    { title: 'KYC & Bank Mandate Verified', code: 'IRDAI-05' },
  ];

  // Animated Device Screen Checklist Loop
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current > checklistItems.length) {
        current = 0;
      }
      setCheckedCount(current);
    }, 2200);

    return () => clearInterval(interval);
  }, [checklistItems.length]);

  // Master Entrance Sequence & Motion Effects
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) return;

    const shapesList = [
      shape0Ref.current,
      shape1Ref.current,
      shape2Ref.current,
      shape3Ref.current,
      shape4Ref.current,
      shape5Ref.current,
      shape6Ref.current,
      shape7Ref.current,
      shape8Ref.current,
      shape9Ref.current,
      shape10Ref.current,
      shape11Ref.current,
    ].filter(Boolean);

    // 0ms: Nav bar animates (handled in Navbar)
    const masterTimeline = gsap.timeline();

    // 150ms: Background Photo fades & scales in subtly (scale 1.05 to 1.0, opacity 0 to 1, 600ms ease-out)
    if (photoRef.current) {
      masterTimeline.fromTo(
        photoRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.15
      );
    }

    // 300ms: Geometric shapes staggered entrance (scale 0 to 1, opacity 0 to target, staggered 70ms apart)
    if (shapesList.length > 0) {
      masterTimeline.fromTo(
        shapesList,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: (i, el) => parseFloat(el.getAttribute('data-target-opacity') || '0.85'),
          duration: 0.5,
          stagger: 0.07,
          ease: 'back.out(1.4)',
        },
        0.3
      );
    }

    // 600ms: Headline line 1 slides up 20px + fades in
    if (headlineLine1Ref.current) {
      masterTimeline.fromTo(
        headlineLine1Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.6
      );
    }

    // 750ms: Headline line 2 slides up + fades in
    if (headlineLine2Ref.current) {
      masterTimeline.fromTo(
        headlineLine2Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.75
      );
    }

    // 900ms: Subheadline fades + slides up
    if (subheadlineRef.current) {
      masterTimeline.fromTo(
        subheadlineRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        0.9
      );
    }

    // 1050ms: CTA button scales from 0.9 to 1.0 + fades in
    if (ctaRef.current) {
      masterTimeline.fromTo(
        ctaRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 0.25, ease: 'back.out(1.5)' },
        1.05
      );
    }

    // Floating Phone Device Entrance
    if (phoneDeviceRef.current) {
      masterTimeline.fromTo(
        phoneDeviceRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.8
      );
    }

    // Ambient Continuous Floating Motion on selected 4 shapes
    const floatingShapes = [shape1Ref.current, shape3Ref.current, shape6Ref.current, shape9Ref.current].filter(Boolean);
    floatingShapes.forEach((shape, index) => {
      gsap.to(shape, {
        y: index % 2 === 0 ? -12 : 10,
        duration: 4 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.3,
      });
    });

    // Parallax Scroll-Based Animations
    if (containerRef.current) {
      // Photo moves slower than foreground
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Large background shapes move at 0.7x speed
      const bgShapes = [shape0Ref.current, shape2Ref.current, shape5Ref.current].filter(Boolean);
      if (bgShapes.length) {
        gsap.to(bgShapes, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Smaller foreground shapes move faster at 1.1x speed
      const fgShapes = [shape4Ref.current, shape7Ref.current, shape8Ref.current, shape10Ref.current].filter(Boolean);
      if (fgShapes.length) {
        gsap.to(fgShapes, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // As hero scrolls out of view, shapes and text scale/fade down slightly
      if (contentWrapperRef.current) {
        gsap.to(contentWrapperRef.current, {
          opacity: 0.3,
          scale: 0.97,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: '60% top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#FAF8F5]"
    >
      {/* ============================================================ */}
      {/* 1. BASE LAYER: FULL-BLEED CANDID PHOTOGRAPHY WITH WARM LIGHTING */}
      {/* ============================================================ */}
      <div
        ref={photoRef}
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
      >
        {/* Editorial Candid Photograph */}
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
          alt="Relieved person reviewing health insurance paperwork calmly at home"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-[0.88] brightness-[0.96]"
        />

        {/* Soft Warm Vignette & Overlay Gradients for High Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-slate-900/40" />
      </div>

      {/* ============================================================ */}
      {/* 2. OVERLAY LAYER: 12 SOFT GEOMETRIC SHAPES (BRAND PALETTE)  */}
      {/* Colors: Cobalt Blue, Warm Amber/Coral, Soft Teal/Sage Green  */}
      {/* ============================================================ */}
      {/* 2. OVERLAY LAYER: SOFT AMBIENT GLOW ACCENTS (BRAND PALETTE)  */}
      {/* Soft blurred ambient glow fields for depth without text overlap */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        
        {/* Shape 0: Large Cobalt Anchor Glow (Top Left) */}
        <div
          ref={shape0Ref}
          data-target-opacity="0.25"
          className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl opacity-25"
        />

        {/* Shape 1: Coral Soft Glow Accent (Upper Center-Left) */}
        <div
          ref={shape1Ref}
          data-target-opacity="0.2"
          className="absolute top-12 left-1/3 w-64 h-32 rounded-full bg-orange-500/25 blur-2xl opacity-20"
        />

        {/* Shape 2: Large Teal Ambient Blob (Top Right) */}
        <div
          ref={shape2Ref}
          data-target-opacity="0.2"
          className="absolute -top-10 -right-20 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl opacity-20"
        />

        {/* Shape 3: Soft Amber Glow (Mid Right) */}
        <div
          ref={shape3Ref}
          data-target-opacity="0.2"
          className="absolute top-1/3 right-10 w-48 h-48 rounded-full bg-amber-500/25 blur-2xl opacity-20"
        />

        {/* Shape 4: Cobalt Small Glow (Center Left edge) */}
        <div
          ref={shape4Ref}
          data-target-opacity="0.25"
          className="absolute top-1/2 -left-10 w-40 h-40 rounded-full bg-blue-500/30 blur-2xl opacity-25"
        />

        {/* Shape 5: Rose Soft Glow (Mid Right) */}
        <div
          ref={shape5Ref}
          data-target-opacity="0.2"
          className="absolute top-1/2 -right-12 w-64 h-64 rounded-full bg-rose-500/20 blur-3xl opacity-20"
        />

        {/* Shape 6: Emerald Soft Glow (Bottom Left edge) */}
        <div
          ref={shape6Ref}
          data-target-opacity="0.2"
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl opacity-20"
        />

        {/* Shape 7: Cobalt Soft Glow (Bottom Center) */}
        <div
          ref={shape7Ref}
          data-target-opacity="0.25"
          className="absolute -bottom-10 left-1/3 w-72 h-36 rounded-full bg-blue-700/25 blur-3xl opacity-25"
        />

        {/* Shape 8: Amber Accent Glow (Far Bottom Right) */}
        <div
          ref={shape8Ref}
          data-target-opacity="0.25"
          className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full bg-amber-400/25 blur-2xl opacity-25"
        />

        {/* Shape 9: Teal Glow (Upper Center) */}
        <div
          ref={shape9Ref}
          data-target-opacity="0.2"
          className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-24 rounded-full bg-teal-500/20 blur-2xl opacity-20"
        />

        {/* Shape 10: Deep Indigo Soft Backdrop Glow (Bottom Right) */}
        <div
          ref={shape10Ref}
          data-target-opacity="0.2"
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-indigo-700/20 blur-3xl opacity-20"
        />

        {/* Shape 11: Emerald Small Accent Glow (Right Edge) */}
        <div
          ref={shape11Ref}
          data-target-opacity="0.25"
          className="absolute top-2/3 right-8 w-24 h-24 rounded-full bg-emerald-400/25 blur-xl opacity-25"
        />

      </div>

      {/* ============================================================ */}
      {/* 3. HERO CONTENT & TYPOGRAPHY & PHONE CHECKLIST DEMO OVERLAY  */}
      {/* ============================================================ */}
      <div
        ref={contentWrapperRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subheadline & Primary CTA */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>IRDAI Claim Master Circular Aligned • 100% Free Audit</span>
            </div>

            {/* Headline: Warm High-Contrast Editorial Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[68px] font-normal tracking-tight text-white leading-[1.08] font-serif-editorial">
              <span ref={headlineLine1Ref} className="block drop-shadow-sm">
                Get it right,
              </span>
              <span ref={headlineLine2Ref} className="block text-amber-200 drop-shadow-sm italic">
                the first time.
              </span>
            </h1>

            {/* Subheadline: Muted Sans-Serif Single Sentence */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg lg:text-xl text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-xs"
            >
              Scan hospital bills and discharge summaries in 60 seconds to eliminate unexpected rejections and unfair deductions before you submit.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                ref={ctaRef}
                onClick={onOpenAudit}
                className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] hover:scale-[1.03] text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-150 ease-out cursor-pointer group"
              >
                <span>Check Your Claim</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white border border-white/30 font-semibold text-base px-6 py-3.5 rounded-full backdrop-blur-md transition-all duration-150 cursor-pointer"
              >
                <span>Calculate Payout</span>
              </button>
            </div>

            {/* Key Assurance Statistics */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/20 max-w-md text-white">
              <div>
                <p className="text-2xl font-bold font-heading">₹14.2 Cr+</p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">Claims Scanned</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-emerald-300">98.4%</p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">Settlement Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">60 Sec</p>
                <p className="text-xs text-slate-200 font-medium mt-0.5">Instant Readiness</p>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Device Overlay showing Interactive Claim-Checklist */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={phoneDeviceRef}
              className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-white/80 p-5 sm:p-6 shadow-2xl shadow-slate-950/40 relative"
            >
              {/* Phone Device Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Live Claim Audit
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Simulated Checklist Preview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{Math.round((checkedCount / checklistItems.length) * 100)}% Ready</span>
                </div>
              </div>

              {/* Document Checklist Items */}
              <div className="py-4 space-y-2.5">
                {checklistItems.map((item, idx) => {
                  const isChecked = idx < checkedCount;

                  return (
                    <div
                      key={item.code}
                      className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-200/90 text-slate-900 shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200/60 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isChecked
                              ? 'bg-emerald-500 text-white scale-110 shadow-xs'
                              : 'border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : (
                            <FileText className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold truncate ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.code}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                          isChecked
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200/60 text-slate-600'
                        }`}
                      >
                        {isChecked ? 'Passed' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Confidential Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>256-bit Encrypted • Zero Logs</span>
                </div>
                <button
                  onClick={onOpenAudit}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Full Audit →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
