import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  UserCheck, 
  Lock, 
  School,
  CheckCircle2,
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  KeyRound,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BANGALORE_COLLEGE_DOMAINS, BANGALORE_COLLEGES_METADATA, getCollegeName } from '../data/colleges';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { 
    loginWithGoogle, 
    signupWithEmail, 
    loginWithEmail, 
    loginAsDemoStudent, 
    error, 
    clearError, 
    whitelistDomains 
  } = useAuth();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCollegesList, setShowCollegesList] = useState<boolean>(false);
  const [collegeSearchQuery, setCollegeSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  // Live domain inspection
  const enteredDomain = emailInput.includes('@') ? emailInput.split('@')[1]?.toLowerCase().trim() : '';
  const isDomainApproved = enteredDomain ? whitelistDomains.includes(enteredDomain) : false;
  const detectedCollege = enteredDomain ? getCollegeName(enteredDomain) : '';

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

  const handleDemoLogin = (domain: string) => {
    loginAsDemoStudent(domain);
    onClose();
  };

  const filteredColleges = whitelistDomains.filter(domain => {
    const name = BANGALORE_COLLEGES_METADATA[domain] || domain;
    const q = collegeSearchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || domain.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon - Obsidian Black & Electric Orange */}
        <div className="bg-[#09090B] px-6 py-5 text-white shrink-0 border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(255,87,34,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-[#18181B] text-[#FF5722] rounded-xl border border-white/10 shadow-sm">
                <School className="w-5 h-5 text-[#FF5722]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans">Bangalore College Placement Portal</h3>
                <p className="text-xs text-slate-400">50 Top Engineering Colleges Domain Whitelist</p>
              </div>
            </div>
            <button
              onClick={() => {
                clearError();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
              className={`pb-1.5 px-3 border-b-2 font-bold transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'border-[#FF5722] text-[#FF5722]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Student Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                clearError();
              }}
              className={`pb-1.5 px-3 border-b-2 font-bold transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'border-[#FF5722] text-[#FF5722]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Whitelist Banner & Live Domain Detection */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
                Bangalore College Domain Whitelist Active
              </span>
              <button
                type="button"
                onClick={() => setShowCollegesList(!showCollegesList)}
                className="text-[#FF5722] hover:text-[#E64A19] text-[11px] font-bold flex items-center cursor-pointer"
              >
                <span>{showCollegesList ? 'Hide 50 Colleges' : 'View 50 Colleges'}</span>
                {showCollegesList ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            </div>

            {/* Live Detected College Badge */}
            {enteredDomain && (
              <div className="pt-1">
                {isDomainApproved ? (
                  <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                    <span>Verified: <strong>{detectedCollege}</strong> (@{enteredDomain})</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 mr-1.5 shrink-0" />
                    <span>Unrecognized college domain (@{enteredDomain}). Must be one of the 50 Bangalore colleges.</span>
                  </div>
                )}
              </div>
            )}

            {/* Collapsible 50 College Whitelist Viewer */}
            {showCollegesList && (
              <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={collegeSearchQuery}
                    onChange={(e) => setCollegeSearchQuery(e.target.value)}
                    placeholder="Search from 50 approved Bangalore colleges..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>
                <div className="max-h-36 overflow-y-auto divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
                  {filteredColleges.map(d => (
                    <div key={d} className="p-2 flex items-center justify-between text-[11px] hover:bg-slate-50">
                      <span className="font-medium text-slate-800">{BANGALORE_COLLEGES_METADATA[d]}</span>
                      <span className="font-mono text-[#FF5722] font-semibold text-[10px]">@{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800 flex items-start space-x-2.5 animate-in shake">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-rose-900">Registration / Login Notice</p>
                <p className="mt-0.5 leading-relaxed">{error}</p>
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
                    placeholder="e.g. S Saanvi or Rubhan"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official College Email ID
                <span className="text-slate-400 font-normal ml-1">(Must be one of the 50 Bangalore colleges)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. student@cmrit.ac.in, user@rvce.edu.in, test@pes.edu..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50/50"
                />
              </div>
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold ring-4 ring-[#FF5722]/20 shadow-md shadow-[#FF5722]/30 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Authenticating...' : (authMode === 'signup' ? 'Create Bangalore Student Account' : 'Sign In with College Email')}
            </button>
          </form>

          {/* Alternative 1: Google Sign-In with Whitelist */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Or Sign In Via Google
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign in with Google (Checks Whitelist)</span>
          </button>

          {/* Quick 1-Click Multi-College Demo Logins */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
              Fast Evaluator Logins (Simulate Different Bangalore Colleges)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('cmrit.ac.in')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#FF5722] bg-slate-50 hover:bg-[#FF5722]/5 text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900 group-hover:text-[#FF5722] transition-colors">CMRIT Student</div>
                <div className="text-[10px] text-slate-500 font-mono">@cmrit.ac.in</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('rvce.edu.in')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#FF5722] bg-slate-50 hover:bg-[#FF5722]/5 text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900 group-hover:text-[#FF5722] transition-colors">RVCE Student</div>
                <div className="text-[10px] text-slate-500 font-mono">@rvce.edu.in</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('bmsce.ac.in')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#FF5722] bg-slate-50 hover:bg-[#FF5722]/5 text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900 group-hover:text-[#FF5722] transition-colors">BMSCE Student</div>
                <div className="text-[10px] text-slate-500 font-mono">@bmsce.ac.in</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('pes.edu')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#FF5722] bg-slate-50 hover:bg-[#FF5722]/5 text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900 group-hover:text-[#FF5722] transition-colors">PES University</div>
                <div className="text-[10px] text-slate-500 font-mono">@pes.edu</div>
              </button>
            </div>
          </div>

          {/* Anonymity Promise */}
          <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1 pt-1">
            <Lock className="w-3.5 h-3.5 text-slate-400 inline" />
            <span>Interview feedback is stored anonymously with your verified college tag.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
