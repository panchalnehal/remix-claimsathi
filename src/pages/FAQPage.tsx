import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/claimData';
import { Breadcrumb } from '../components/Breadcrumb';

interface FAQPageProps {
  onBackToHome: () => void;
  onNavigateToAudit: () => void;
  onNavigateToCalculator: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onBackToHome,
  onNavigateToAudit,
  onNavigateToCalculator,
}) => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // AI Assistant Query state
  const [aiQuery, setAiQuery] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const categories = ['All', 'General', 'Reimbursement', 'Cashless', 'Rejections', 'IRDAI Guidelines'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = category === 'All' || faq.category === category;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      setAiLoading(false);
      if (aiQuery.toLowerCase().includes('room rent') || aiQuery.toLowerCase().includes('proportionate')) {
        setAiResponse(
          "Under IRDAI Master Circular 2024, if room rent exceeds policy limits, insurers can only apply proportionate deductions on associated medical expenses (doctor, surgeon, OT charges). ICU charges and implants CANNOT be proportionately deducted. You have the right to challenge invalid ICU deductions."
        );
      } else if (aiQuery.toLowerCase().includes('reject') || aiQuery.toLowerCase().includes('denied')) {
        setAiResponse(
          "Insurers must give specific legal reasons under Section 6 of IRDAI Guidelines for any rejection. You can generate an automated TPA Dispute Letter via ClaimSaathi and submit an Ombudsman escalation within 30 days."
        );
      } else {
        setAiResponse(
          "ClaimSaathi AI Recommendation: Ensure your discharge summary, final itemized hospital bill with breakup, pharmacy drug license invoice, and diagnostic lab reports are attached before filing."
        );
      }
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation Bar */}
        <Breadcrumb
          onBackToHome={onBackToHome}
          items={[
            { label: 'Frequently Asked Questions', active: true }
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-300">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Help Center & Legal Guidance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Find clear, authoritative answers regarding hospital bill auditing, room rent capping, cashless approvals, and IRDAI policyholder rights.
            </p>
          </div>
        </div>

        {/* Ask ClaimSaathi AI Assistance Widget */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>Ask ClaimSaathi AI a Specific Claim Question</span>
          </div>

          <form onSubmit={handleAskAI} className="relative flex items-center">
            <input
              type="text"
              placeholder="e.g. My TPA deducted ₹18,000 for room rent, can I challenge this?"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-28 py-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={aiLoading || !aiQuery.trim()}
              className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {aiLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ask AI</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {aiResponse && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs sm:text-sm leading-relaxed space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI Guidance Answer:</span>
              </div>
              <p>{aiResponse}</p>
            </div>
          )}
        </div>

        {/* Search & Category Tabs */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              placeholder="Search all questions (e.g. cashless, room rent, deduction, TPA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-semibold">
                No matching questions found for "{searchTerm}". Try another search term or ask AI above!
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Next Step CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Want to check your hospital bill?</h3>
            <p className="text-xs text-slate-500">Run an instant document checklist audit before submitting your claim.</p>
            <button
              onClick={onNavigateToAudit}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              <span>Audit Documents Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Calculate room rent & co-pay payout?</h3>
            <p className="text-xs text-slate-500">Estimate your approved payout amount with our interactive calculator.</p>
            <button
              onClick={onNavigateToCalculator}
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:underline cursor-pointer"
            >
              <span>Open Payout Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
