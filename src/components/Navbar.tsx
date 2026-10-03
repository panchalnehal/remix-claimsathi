import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield, CheckCircle2, ArrowRight, Menu, X, Search, UserCheck, LogOut, ChevronDown, FileCheck } from 'lucide-react';
import { UserProfile } from './AuthModal';

interface NavbarProps {
  currentUser: UserProfile | null;
  activePage?: 'home' | 'audit' | 'calculator' | 'faqs';
  onNavigatePage?: (page: 'home' | 'audit' | 'calculator' | 'faqs') => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenAudit: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activePage = 'home',
  onNavigatePage,
  onOpenAuth,
  onLogout,
  onOpenAudit,
  onOpenCalculator,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 0ms: Nav bar fades in from top (slide down 10px + fade, 300ms ease-out)
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion && navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0 }
      );
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'audit' | 'calculator' | 'faqs', sectionId?: string) => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage(page);
    }
    if (sectionId && page === 'home') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: ClaimSaathi Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left border-0 bg-transparent"
            aria-label="ClaimSaathi Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 fill-blue-500/30" />
              <CheckCircle2 className="w-4 h-4 text-white absolute" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 leading-none">
                Claim<span className="text-blue-600">Saathi</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide">
                Health Claim Assistant
              </span>
            </div>
          </button>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home', 'how-it-works')}
              className={`nav-link-underline px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === 'home' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              How it works
            </button>
            <button
              onClick={() => handleNavClick('audit')}
              className={`nav-link-underline px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === 'audit' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              Doc Auditor
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className={`nav-link-underline px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === 'calculator' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              Payout Calculator
            </button>
            <button
              onClick={() => handleNavClick('home', 'trust-rights')}
              className="nav-link-underline px-3 py-2 rounded-lg hover:text-blue-600 transition-colors cursor-pointer"
            >
              IRDAI Rights
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className={`nav-link-underline px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === 'faqs' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
              }`}
            >
              Help & FAQ
            </button>
          </nav>

          {/* Right: Auth & CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Search / Audit Trigger */}
            <button 
              onClick={onOpenAudit}
              aria-label="Search or check documents"
              className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {currentUser ? (
              /* User Profile Menu when logged in */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 pr-2.5 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 rounded-full transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Profile Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      {currentUser.insurer && (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          <UserCheck className="w-3 h-3" />
                          <span>{currentUser.insurer}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAudit();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4 text-blue-600" />
                      <span>My Saved Claim Audits</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Controls */
              <>
                {/* Sign in link with arrow nudge on hover */}
                <button
                  onClick={() => onOpenAuth('login')}
                  className="group flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-150 ease-out" />
                </button>

                {/* Filled Pill Button ("Get Started") */}
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}

          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={() => onOpenAuth('signup')}
                className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs"
              >
                Get Started
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-lg">
          <button
            onClick={() => handleNavClick('home', 'how-it-works')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('audit')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Audit Your Hospital Bill & Documents Now
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Reimbursement Payout & Co-pay Calculator
          </button>
          <button
            onClick={() => handleNavClick('home', 'trust-rights')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            IRDAI Rights
          </button>
          <button
            onClick={() => handleNavClick('faqs')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="p-3 rounded-2xl bg-slate-50 space-y-2">
                <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-center py-2 text-xs font-bold text-rose-600 bg-rose-50 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-full"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full text-center py-2.5 text-sm font-bold text-white bg-blue-600 rounded-full shadow-md"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

