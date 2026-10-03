import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, CheckCircle2, MapPin, Building2, TrendingUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/claimData';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Counter states
  const [amount, setAmount] = useState(0);
  const [approval, setApproval] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setAmount(14.2);
      setApproval(98.4);
      setDays(4.2);
      return;
    }

    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to({}, {
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
              const p = this.progress();
              setAmount(Number((p * 14.2).toFixed(1)));
              setApproval(Number((p * 98.4).toFixed(1)));
              setDays(Number((p * 4.2).toFixed(1)));
            }
          });
        }
      });
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Animated Impact Numbers */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-emerald-950 text-white rounded-3xl p-8 shadow-xl text-center">
          
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-400">
              ₹{amount} Cr+
            </p>
            <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              Legitimate Payouts Recovered
            </p>
          </div>

          <div className="space-y-1 sm:border-x border-emerald-800/80 px-4">
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-400">
              {approval}%
            </p>
            <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              First-Pass Settlement Rate
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-400">
              {days} Days
            </p>
            <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              Average Approval Timeline
            </p>
          </div>

        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
            Real Stories, Real Settlements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            How Indians Saved Lakhs on Rejected Claims
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    Saved {t.amountSaved}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-800 bg-white p-2 rounded-lg border border-slate-200/80">
                  Issue: {t.issue}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{t.story}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-300"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">{t.name}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" /> {t.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Building2 className="w-3 h-3 text-slate-400" /> {t.insurer}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
