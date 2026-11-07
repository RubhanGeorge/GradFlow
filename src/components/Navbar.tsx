import React from 'react';
import { 
  GraduationCap, 
  Home,
  BarChart3, 
  FileEdit, 
  Briefcase, 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  User, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'feedback' | 'opportunities';
  setActiveTab: (tab: 'home' | 'dashboard' | 'feedback' | 'opportunities') => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal
}) => {
  const { userProfile, isAuthorizedDomain, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090B] text-white border-b border-white/10 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5722] to-[#FFA726] flex items-center justify-center text-white shadow-md shadow-[#FF5722]/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white font-sans whitespace-nowrap shrink-0">
              GradFlow
            </span>
          </div>

          {/* Zone 2: Desktop Tab Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home Tab */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'home'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4 mr-1.5" />
              <span>Home</span>
            </button>

            {/* Analytics Dashboard */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-1.5" />
              <span>Analytics</span>
            </button>

            {/* Submit Feedback */}
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex items-center px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'feedback'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileEdit className="w-4 h-4 mr-1.5" />
              <span>Submit Review</span>
            </button>

            {/* Opportunity Radar */}
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`flex items-center px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'opportunities'
                  ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-1.5" />
              <span>Opportunity Radar</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (College Login / Register) */}
          <div className="flex items-center space-x-3 shrink-0">
            {userProfile ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-white leading-tight">
                    {userProfile.displayName}
                  </span>
                  <span className="text-[11px] text-[#FF5722] font-mono flex items-center justify-end font-semibold">
                    <ShieldCheck className="w-3 h-3 mr-0.5 inline" />
                    @{userProfile.collegeDomain}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                  <User className="w-4 h-4 text-[#FF5722]" />
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#FF5722] hover:bg-white/10 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs sm:text-sm font-extrabold transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg shadow-[#FF5722]/30 ring-4 ring-[#FF5722]/20 cursor-pointer whitespace-nowrap shrink-0"
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                College Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden flex items-center justify-between border-t border-[#222226] py-2 overflow-x-auto space-x-1 text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold flex items-center transition-all ${
              activeTab === 'home' ? 'bg-[#FF5722] text-white' : 'text-slate-300'
            }`}
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold flex items-center transition-all ${
              activeTab === 'dashboard' ? 'bg-[#FF5722] text-white' : 'text-slate-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 mr-1" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold flex items-center transition-all ${
              activeTab === 'feedback' ? 'bg-[#FF5722] text-white' : 'text-slate-300'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 mr-1" />
            Submit (&lt;2m)
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold flex items-center transition-all ${
              activeTab === 'opportunities' ? 'bg-[#FF5722] text-white' : 'text-slate-300'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            Radar
          </button>
        </div>
      </div>
    </header>
  );
};
