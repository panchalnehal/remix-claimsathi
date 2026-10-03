import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building2, 
  Sparkles,
  FileCheck
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  insurer?: string;
  policyNo?: string;
  isVerified?: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [method, setMethod] = useState<'email' | 'otp'>('email');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [insurer, setInsurer] = useState('HDFC ERGO');
  const [policyNo, setPolicyNo] = useState('');
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Password strength logic
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (pass.length < 10) return { score: 2, label: 'Good', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const nameToUse = fullName || (email ? email.split('@')[0] : 'Valued User');
      const userObj: UserProfile = {
        name: nameToUse,
        email: email || `${phone}@phone.auth`,
        insurer: insurer,
        policyNo: policyNo || 'CS-DEMO-9912',
        isVerified: true,
      };

      setSuccessMessage(mode === 'login' ? 'Successfully signed in!' : 'Account created successfully!');
      setTimeout(() => {
        onLoginSuccess(userObj);
        onClose();
        setSuccessMessage('');
      }, 1000);
    }, 1200);
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 grid grid-cols-1 md:grid-cols-12 animate-scale-up">
        
        {/* Left Side: Premium Brand Feature Banner */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Shapes */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-600/30 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />

          {/* Brand Logo Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                Claim<span className="text-blue-400">Saathi</span>
              </span>
            </div>
            
            <p className="mt-6 text-2xl font-serif-editorial font-normal leading-snug text-blue-50">
              {mode === 'login' 
                ? 'Welcome back to your zero-stress claim manager.' 
                : 'Join 45,000+ policyholders getting 100% fair claims.'}
            </p>
          </div>

          {/* Features Checklist */}
          <div className="relative z-10 my-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">60-Second Document Audit</p>
                <p className="text-[11px] text-slate-300">Detect missing hospital bills before submission</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">IRDAI Master Circular Rights</p>
                <p className="text-[11px] text-slate-300">Enforce statutory 100% payout guidelines</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Dispute Letter Generator</p>
                <p className="text-[11px] text-slate-300">Auto-draft legal appeal letters for deductions</p>
              </div>
            </div>
          </div>

          {/* Bottom Security Assurance Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Bank-grade 256-bit Encryption
            </span>
            <span className="font-semibold text-emerald-400">IRDAI Compliant</span>
          </div>

        </div>

        {/* Right Side: Form Controls */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative bg-white">
          
          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            {/* Mode Selector Tabs (Sign In vs Create Account) */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl max-w-xs mb-8">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-slate-900 tracking-tight">
                {mode === 'login' ? 'Sign in to your account' : 'Create your free account'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'login' 
                  ? 'Access your saved claim audits and payout calculations.' 
                  : 'Get instant access to AI health claim assistance.'}
              </p>
            </div>

            {/* Quick Method Toggle (Email vs Mobile OTP) */}
            <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`text-xs font-bold pb-2 border-b-2 transition-colors cursor-pointer ${
                  method === 'email'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Email Address
              </button>
              <button
                type="button"
                onClick={() => setMethod('otp')}
                className={`text-xs font-bold pb-2 border-b-2 transition-colors cursor-pointer ${
                  method === 'otp'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Mobile OTP
              </button>
            </div>

            {/* Success Message Banner */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name (In Signup Mode) */}
              {mode === 'signup' && method === 'email' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              {method === 'email' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Password Input */}
              {method === 'email' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to your email.')}
                        className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter in Signup Mode */}
                  {mode === 'signup' && password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                        <div className={`h-full flex-1 ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                        <div className={`h-full flex-1 ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                        <div className={`h-full flex-1 ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{strength.label}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile OTP Method */}
              {method === 'otp' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-bold text-slate-500">+91</span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-28 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={phone.length < 10 || loading}
                        className="absolute right-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="animate-fade-in">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        6-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-widest text-base font-mono font-bold py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Health Insurer Selection in Signup Mode */}
              {mode === 'signup' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Health Insurer
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={insurer}
                        onChange={(e) => setInsurer(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      >
                        <option value="HDFC ERGO">HDFC ERGO</option>
                        <option value="Star Health">Star Health</option>
                        <option value="Niva Bupa">Niva Bupa</option>
                        <option value="Care Health">Care Health</option>
                        <option value="ICICI Lombard">ICICI Lombard</option>
                        <option value="Bajaj Allianz">Bajaj Allianz</option>
                        <option value="Aditya Birla">Aditya Birla</option>
                        <option value="Other">Other IRDAI Insurer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Policy No. (Optional)
                    </label>
                    <div className="relative">
                      <FileCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. 1100-2918"
                        value={policyNo}
                        onChange={(e) => setPolicyNo(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Google Single Sign-On Button */}
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  onLoginSuccess({
                    name: 'Rahul Verma',
                    email: 'rahul.verma@gmail.com',
                    insurer: 'Star Health',
                    policyNo: 'P-998241',
                    isVerified: true,
                  });
                  onClose();
                }, 900);
              }}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

          </div>

          {/* Footer Terms */}
          <div className="mt-6 text-center text-[10px] text-slate-400">
            By signing in, you agree to ClaimSaathi's{' '}
            <a href="#" className="text-blue-600 underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
          </div>

        </div>

      </div>
    </div>
  );
};
