import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Lock, 
  School, 
  Mail, 
  KeyRound, 
  User,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth, RESTRICTED_ERROR_MESSAGE, PERSONAL_EMAIL_PROVIDERS } from '../context/AuthContext';
import { getCollegeName } from '../data/colleges';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasonMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, reasonMessage }) => {
  const { 
    loginWithGoogle, 
    signupWithEmail, 
    loginWithEmail, 
    whitelistDomains,
    whitelistedEntries,
    error, 
    clearError,
    validateCollegeDomain
  } = useAuth();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Live domain inspection as the student types
  const trimmedEmail = emailInput.trim().toLowerCase();
  const enteredDomain = trimmedEmail.includes('@') ? trimmedEmail.split('@')[1]?.trim() : '';
  const validation = enteredDomain ? validateCollegeDomain(trimmedEmail) : null;
  const isPersonalProvider = enteredDomain ? PERSONAL_EMAIL_PROVIDERS.includes(enteredDomain) : false;
  const detectedCollegeName = enteredDomain ? getCollegeName(enteredDomain) : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let success = false;
    if (authMode === 'signup') {
      success = await signupWithEmail(emailInput, passwordInput, nameInput);
    } else {
      success = await loginWithEmail(emailInput, passwordInput);
    }
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    const success = await loginWithGoogle();
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 w-full box-border">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-black overflow-hidden flex flex-col max-h-[92vh] box-border">
        {/* Header Ribbon - Obsidian Black & Electric Orange */}
        <div className="bg-[#09090B] px-5 sm:px-6 py-5 text-white shrink-0 border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(255,87,34,0.2)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-[#18181B] text-[#FF5722] rounded-xl border border-white/10 shadow-sm shrink-0">
                <School className="w-5 h-5 text-[#FF5722]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white font-sans truncate">Campus Placement Portal</h3>
                <p className="text-xs text-slate-400 truncate">Domain-Verified Student Access</p>
              </div>
            </div>
            <button
              onClick={() => {
                clearError();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex space-x-2 mt-4 pt-2 border-t border-white/10 text-xs relative z-10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                clearError();
              }}
              className={`pb-1.5 px-3 border-b-2 font-bold transition-all cursor-pointer min-h-[36px] ${
                authMode === 'signin'
                  ? 'border-[#FF5722] text-[#FF5722]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                clearError();
              }}
              className={`pb-1.5 px-3 border-b-2 font-bold transition-all cursor-pointer min-h-[36px] ${
                authMode === 'signup'
                  ? 'border-[#FF5722] text-[#FF5722]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Register Account
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Reason Notification Banner (e.g. Triggered by Unauthenticated Form Submit) */}
          {reasonMessage && !error && (
            <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-3.5 text-xs text-amber-900 flex items-start space-x-2.5 animate-in fade-in">
              <ShieldCheck className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-amber-950">Action Blocked: Authentication Guard</p>
                <p className="mt-0.5 leading-relaxed font-medium">{reasonMessage}</p>
              </div>
            </div>
          )}

          {/* Prominent Access Restricted Alert Modal Box (Task #1 UI Requirement) */}
          {error && (
            <div className="rounded-2xl bg-rose-50 border-2 border-rose-500 p-4 text-xs text-rose-900 flex items-start space-x-3 shadow-md animate-in shake">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-black text-rose-950 text-sm">Access Restricted</p>
                <p className="mt-1 leading-relaxed font-semibold text-rose-800">{error}</p>
              </div>
            </div>
          )}



          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50/50 min-h-[44px]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official College Email ID
                <span className="text-slate-400 font-normal ml-1">(e.g. yourname@college.edu.in)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. student@college.edu.in..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50/50 min-h-[44px]"
                />
              </div>
              {enteredDomain && validation?.isValid && (
                <div className="mt-1 flex items-center text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" />
                  <span>Verified: {detectedCollegeName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50/50 min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs sm:text-sm font-bold ring-4 ring-[#FF5722]/20 shadow-md shadow-[#FF5722]/30 transition-all duration-200 disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              {isSubmitting ? 'Verifying Institutional Domain...' : (authMode === 'signup' ? 'Create Verified College Account' : 'Sign In with College Email')}
            </button>
          </form>

          {/* Google Sign-In Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Or Continue With Google
              </span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer min-h-[44px]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="truncate">Sign In via Google</span>
          </button>

          {/* Privacy Note */}
          <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1 pt-3 border-t border-slate-100">
            <Lock className="w-3.5 h-3.5 text-slate-400 inline shrink-0" />
            <span>Identity is strictly protected. Reviews display only Verified @[collegeDomain].</span>
          </div>
        </div>
      </div>
    </div>
  );
};
