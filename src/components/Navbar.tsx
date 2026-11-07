import { 
  GraduationCap, 
  Home,
  BarChart3, 
  FileEdit, 
  Briefcase, 
  HelpCircle,
  ShieldCheck, 
  LogIn, 
  LogOut, 
  User, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'feedback' | 'opportunities' | 'faq';
  setActiveTab: (tab: 'home' | 'dashboard' | 'feedback' | 'opportunities' | 'faq') => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal
}) => {
  const { userProfile, isAuthorizedDomain, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#09090B]/95 text-white border-b border-white/10 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
            {/* Zone 1: Brand Wordmark */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group shrink-0 min-h-[44px]" 
              onClick={() => setActiveTab('home')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#FF5722] to-[#FFA726] flex items-center justify-center text-white shadow-md shadow-[#FF5722]/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans whitespace-nowrap">
                  GradFlow
                </span>
                <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono tracking-wider -mt-0.5">
                  CAMPUS INTELLIGENCE
                </span>
              </div>
            </div>

            {/* Zone 2: Desktop Tab Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-white/5 p-1 rounded-2xl border border-white/10">
              {/* Home Tab */}
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
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
                className={`flex items-center px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
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
                className={`flex items-center px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
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
                className={`flex items-center px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                  activeTab === 'opportunities'
                    ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-4 h-4 mr-1.5" />
                <span>Radar</span>
              </button>

              {/* FAQ Option next to Radar */}
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex items-center px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                  activeTab === 'faq'
                    ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <HelpCircle className="w-4 h-4 mr-1.5" />
                <span>FAQ</span>
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action (Login / Signup or User Profile) */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {userProfile ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="hidden lg:flex flex-col text-right">
                    <span className="text-xs font-bold text-white leading-tight">
                      {userProfile.displayName}
                    </span>
                    <span className="text-[11px] text-[#FF5722] font-mono flex items-center justify-end font-semibold">
                      <ShieldCheck className="w-3 h-3 mr-0.5 inline" />
                      @{userProfile.collegeDomain}
                    </span>
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#18181B] border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                    <User className="w-4 h-4 text-[#FF5722]" />
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-[#FF5722] hover:bg-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="group relative inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7043] hover:from-[#E64A19] hover:to-[#FF5722] text-white text-xs sm:text-sm font-extrabold transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg shadow-[#FF5722]/30 ring-2 sm:ring-4 ring-[#FF5722]/20 hover:shadow-xl hover:shadow-[#FF5722]/40 cursor-pointer whitespace-nowrap shrink-0 overflow-hidden min-h-[44px]"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                  <LogIn className="w-4 h-4 mr-1.5 transition-transform group-hover:scale-110" />
                  <span>Login/Signup</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modern Glassmorphic Floating Bottom Bar for Mobile (< 768px) */}
      <nav 
        aria-label="Mobile Navigation" 
        className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#09090B]/90 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around box-border"
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'home' 
              ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/40' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'dashboard' 
              ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/40' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4 mb-0.5" />
          <span>Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'feedback' 
              ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/40' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileEdit className="w-4 h-4 mb-0.5" />
          <span>Review</span>
        </button>

        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'opportunities' 
              ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/40' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4 mb-0.5" />
          <span>Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'faq' 
              ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/40' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span>FAQ</span>
        </button>
      </nav>
    </>
  );
};
