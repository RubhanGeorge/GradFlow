import React, { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  FileEdit, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Layers, 
  PieChart, 
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Search,
  Check,
  AlertCircle,
  Timer,
  Terminal,
  Cpu,
  Brain,
  Code2
} from 'lucide-react';
import { BANGALORE_COLLEGES_METADATA, isBangaloreCollegeDomain } from '../data/colleges';

interface LandingHomeProps {
  onNavigate: (tab: 'home' | 'dashboard' | 'feedback' | 'opportunities') => void;
  openAuthModal: () => void;
  totalFeedbacksCount: number;
}

export const LandingHome: React.FC<LandingHomeProps> = ({
  onNavigate,
  openAuthModal,
  totalFeedbacksCount
}) => {
  // Domain Simulator State for Bento Card 1
  const [testDomainInput, setTestDomainInput] = useState<string>('rvce.edu.in');
  const [testedResult, setTestedResult] = useState<{ isValid: boolean; message: string }>({
    isValid: true,
    message: 'Authorized: R.V. College of Engineering (Verified Bangalore Tier-1)'
  });

  const handleTestDomain = (domainToTest: string) => {
    setTestDomainInput(domainToTest);
    const clean = domainToTest.trim().toLowerCase().replace(/^@/, '');
    if (!clean) {
      setTestedResult({ isValid: false, message: 'Please enter a college domain suffix.' });
      return;
    }
    const valid = isBangaloreCollegeDomain(clean);
    if (valid) {
      const match = BANGALORE_COLLEGES_METADATA.find(c => c.domain === clean);
      setTestedResult({
        isValid: true,
        message: `Authorized: ${match ? match.name : clean} (Verified Student Access)`
      });
    } else {
      setTestedResult({
        isValid: false,
        message: 'Access Restricted: Only verified students from authorized Bangalore engineering colleges can register.'
      });
    }
  };

  // Bento Card 2 Mini Topic Tab Selection
  const [activeBentoCategory, setActiveBentoCategory] = useState<'tech' | 'ai' | 'aptitude'>('tech');

  // Bento Card 3 Interactive Difficulty Preview
  const [bentoDifficulty, setBentoDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // Colleges Search in Directory
  const [collegeSearch, setCollegeSearch] = useState<string>('');
  const filteredColleges = BANGALORE_COLLEGES_METADATA.filter(c => 
    c.name.toLowerCase().includes(collegeSearch.toLowerCase()) || 
    c.domain.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const featuredCompanies = [
    'Amazon', 'Goldman Sachs', 'Swiggy', 'Cred', 'Flipkart', 
    'Accenture', 'TCS', 'Razorpay', 'Google', 'Cisco', 'Infosys', 'Dell',
    'PhonePe', 'Oracle', 'Intuit', 'Morgan Stanley'
  ];

  return (
    <div className="w-full space-y-20 pb-16 selection:bg-[#FF5722] selection:text-white">
      {/* =========================================================================
          HERO SECTION: Obsidian Black Canvas with Electric Orange Ambient Radial Glow
         ========================================================================= */}
      <section className="relative overflow-hidden bg-[#09090B] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[radial-gradient(circle_at_top,rgba(255,87,34,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(255,112,67,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Top Pill Kicker */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#18181B] border border-white/10 text-xs font-semibold text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
              <span>50 Top Bangalore Engineering Colleges Placement Network</span>
              <span className="text-[#FF5722] font-black">100% Free & Open</span>
            </div>
          </div>

          {/* Catchy Linear-grade Headline */}
          <div className="text-center space-y-5 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-sans leading-[1.08] text-balance">
              Demystify Campus Placements with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726]">
                Real Data
              </span>{' '}
              from Real Seniors.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Zero fluff. Zero anonymous rumors. Get unfiltered, college-verified interview questions, difficulty metrics, and recruitment trends — 100% free for students.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#FF5722]/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl ring-4 ring-[#FF5722]/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore Recruiter Analytics</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('feedback')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#121215]/80 hover:bg-[#18181B] text-slate-100 font-bold text-sm sm:text-base border border-white/15 hover:border-[#FF5722]/50 transition-all duration-300 ease-out hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-md"
            >
              <FileEdit className="w-4 h-4 mr-1 text-[#FF5722]" />
              <span>Share Your Experience (&lt; 2 min)</span>
            </button>
          </div>

          {/* =========================================================================
              HERO INTERACTIVE WIDGET: Sleek Obsidian Black Card with Live Playback
             ========================================================================= */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="rounded-3xl bg-[#121215] border border-white/10 p-6 sm:p-7 shadow-2xl relative overflow-hidden group hover:border-[#FF5722]/40 transition-colors">
              {/* Subtle top amber highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5722] to-transparent opacity-80" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5722] to-[#E64A19] flex items-center justify-center font-bold text-white shadow-md shadow-[#FF5722]/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-bold text-white font-sans">Amazon AWS</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Verified Live
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">Software Development Engineer (SDE-1) · Round 2</div>
                  </div>
                </div>

                {/* Glowing Live Timer Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#09090B] border border-[#FF5722]/50 shadow-[0_0_12px_rgba(255,87,34,0.3)] self-start sm:self-auto">
                  <Timer className="w-4 h-4 text-[#FF5722] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#FF5722]">01:42</span>
                  <span className="text-[10px] text-slate-400 font-mono">&lt; 02:00</span>
                </div>
              </div>

              {/* Real Data Preview Bar */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center">
                    <Cpu className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />
                    Question Style Distribution
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">60m Duration · Medium Difficulty</span>
                </div>

                {/* Segmented Distribution Bar */}
                <div className="h-3 w-full bg-[#1A1A1E] rounded-full overflow-hidden flex p-0.5 border border-white/5">
                  <div className="h-full bg-[#FF5722] rounded-l-full" style={{ width: '65%' }} title="Technical DSA & System: 65%" />
                  <div className="h-full bg-slate-300" style={{ width: '20%' }} title="AI & Vibe Tools: 20%" />
                  <div className="h-full bg-[#FFA726] rounded-r-full" style={{ width: '15%' }} title="Aptitude & Logic: 15%" />
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-[#FF5722] mr-1.5" />
                    Technical Core (65%)
                  </span>
                  <span className="flex items-center text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-slate-300 mr-1.5" />
                    AI & Vibe Tools (20%)
                  </span>
                  <span className="flex items-center text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-[#FFA726] mr-1.5" />
                    Aptitude & Logic (15%)
                  </span>
                </div>
              </div>

              {/* Sample Tested Topics Chips & Senior Tip */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Topics:</span>
                  <span className="px-2 py-0.5 rounded bg-[#18181B] text-slate-200 border border-white/10 text-[11px]">Dynamic Programming</span>
                  <span className="px-2 py-0.5 rounded bg-[#18181B] text-slate-200 border border-white/10 text-[11px]">Redis Caching</span>
                  <span className="px-2 py-0.5 rounded bg-[#18181B] text-slate-200 border border-white/10 text-[11px]">Prompt Engineering</span>
                </div>

                <div className="text-[11px] text-emerald-400 font-mono flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  <span>@rvce.edu.in Verified Senior</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick KPI Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2">
            <div className="p-4 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30">
              <div className="text-3xl font-black font-mono text-[#FF5722] tabular-nums">
                {totalFeedbacksCount}+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Interview Rounds Logged</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center font-mono">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+18% this placement season</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30">
              <div className="text-3xl font-black font-mono text-white tabular-nums">
                100+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Bangalore Recruiters</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Tier-1 & High Growth Startups
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30">
              <div className="text-3xl font-black font-mono text-[#FF5722] tabular-nums">
                50
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Colleges Whitelisted</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Official Engineering Domains
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30">
              <div className="text-3xl font-black font-mono text-emerald-400 tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Anonymous & Free</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Zero paywalls or coins
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURE BENTO GRID: 3 Rich Widgets with Interactive Live Previews
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold border border-[#FF5722]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Campus Clarity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090B] tracking-tight font-sans">
            Interactive Placement Intelligence
          </h2>
          <p className="text-sm text-slate-600">
            Traditional review platforms are filled with marketing or generic text. GradFlow is engineered specifically for engineering campus hiring.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* =====================================================================
              BENTO CARD 1 (Spans 2 columns): Institutional Email Verification
             ===================================================================== */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#09090B] font-sans">
                  Institutional Email Verification (@cmrit.ac.in, @rvce.edu.in...)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  Only verified students from authorized Bangalore engineering colleges can log in and submit reviews. Eliminates fake reviews, spam bots, and corporate PR manipulation.
                </p>
              </div>
            </div>

            {/* Interactive Domain Validator Tester */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-black/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800">
                  Try the Live Domain Whitelist Checker:
                </span>
                <span className="text-[11px] text-slate-500 font-mono">50 Top Bangalore Engineering Colleges</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={testDomainInput}
                    onChange={(e) => handleTestDomain(e.target.value)}
                    placeholder="e.g. rvce.edu.in, bmsce.ac.in, pes.edu, gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleTestDomain(testDomainInput)}
                  className="px-4 py-2.5 rounded-xl bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Verify Domain
                </button>
              </div>

              {/* Sample Quick Suffix Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Quick Test:</span>
                {['rvce.edu.in', 'cmrit.ac.in', 'bmsce.ac.in', 'pes.edu', 'gmail.com'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleTestDomain(d)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                      testDomainInput === d
                        ? 'bg-[#FF5722] text-white border-[#FF5722] font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    @{d}
                  </button>
                ))}
              </div>

              {/* Status Banner */}
              <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 font-medium ${
                testedResult.isValid 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                {testedResult.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{testedResult.message}</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              BENTO CARD 2: Categorized Topic Density Metrics
             ===================================================================== */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#09090B] font-sans">
                  Topic Density Breakdown
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Query exact weight distributions between Technical DSA, AI & Vibe Coding tools, and Aptitude for 100+ recruiters.
                </p>
              </div>
            </div>

            {/* Interactive Mini Topic Breakdown Widget */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-black/10 space-y-3">
              <div className="flex items-center space-x-1 p-1 bg-slate-200/70 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveBentoCategory('tech')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeBentoCategory === 'tech'
                      ? 'bg-[#FF5722] text-white shadow-xs'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  Tech (60%)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBentoCategory('ai')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeBentoCategory === 'ai'
                      ? 'bg-[#09090B] text-white shadow-xs'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  AI Tools (20%)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBentoCategory('aptitude')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeBentoCategory === 'aptitude'
                      ? 'bg-[#FFA726] text-white shadow-xs'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  Aptitude (20%)
                </button>
              </div>

              {/* Dynamic Preview Topics List based on Tab */}
              <div className="space-y-2 pt-1">
                {activeBentoCategory === 'tech' && (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span>Arrays, Strings & HashMaps</span>
                      <span className="font-mono font-bold text-[#FF5722]">88% of rounds</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FF5722] h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                    <div className="flex justify-between font-medium pt-1">
                      <span>Dynamic Programming & Trees</span>
                      <span className="font-mono font-bold text-[#FF5722]">72% of rounds</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FF5722] h-full rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                )}

                {activeBentoCategory === 'ai' && (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span>Prompt Engineering & Debugging</span>
                      <span className="font-mono font-bold text-[#09090B]">64% of rounds</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#09090B] h-full rounded-full" style={{ width: '64%' }} />
                    </div>
                    <div className="flex justify-between font-medium pt-1">
                      <span>LLM Orchestration & Copilot</span>
                      <span className="font-mono font-bold text-[#09090B]">48% of rounds</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#09090B] h-full rounded-full" style={{ width: '48%' }} />
                    </div>
                  </div>
                )}

                {activeBentoCategory === 'aptitude' && (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span>Probability & Bayes Theorem</span>
                      <span className="font-mono font-bold text-[#FFA726]">55% of rounds</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FFA726] h-full rounded-full" style={{ width: '55%' }} />
                    </div>
                    <div className="flex justify-between font-medium pt-1">
                      <span>Logical Deduction & Puzzles</span>
                      <span className="font-mono font-bold text-[#FFA726]">50% of rounds</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FFA726] h-full rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-[#FF5722] font-bold flex items-center justify-end pt-1">
                <span>View Full 50-Topic Checklist</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </div>
          </div>

          {/* =====================================================================
              BENTO CARD 3: 2-Minute Fast Mobile Form Preview
             ===================================================================== */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#09090B] font-sans">
                2-Minute High-Density Mobile Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Record your interview right after leaving the panel room. 11 tactile questions, autocomplete for 100+ recruiters, drag sliders, and zero typing friction.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('feedback')}
                  className="px-6 py-3 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5722]/30 flex items-center space-x-2 cursor-pointer"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Open Feedback Form</span>
                </button>
              </div>
            </div>

            {/* Interactive Tactical Difficulty Segment Preview */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-black/10 w-full md:w-96 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Tactical Difficulty Selector:</span>
                <span className="text-[#FF5722] font-mono text-[11px]">Interactive Sample</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBentoDifficulty('Easy')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    bentoDifficulty === 'Easy'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500 shadow-sm scale-102 font-bold text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mx-auto mb-1" />
                  <div className="text-xs">Easy</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBentoDifficulty('Medium')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    bentoDifficulty === 'Medium'
                      ? 'bg-amber-50 border-[#FF5722] ring-2 ring-[#FF5722] shadow-sm scale-102 font-bold text-[#E64A19]'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] mx-auto mb-1" />
                  <div className="text-xs">Medium</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBentoDifficulty('Hard')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    bentoDifficulty === 'Hard'
                      ? 'bg-rose-50 border-rose-600 ring-2 ring-rose-600 shadow-sm scale-102 font-bold text-rose-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mx-auto mb-1" />
                  <div className="text-xs">Hard</div>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-mono text-center">
                Click cards above to experience active state tactile feedback.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS PROCESS FLOW: 01 -> 02 -> 03 (Human Editorial Numbering)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#09090B] rounded-3xl p-8 sm:p-12 text-white border border-white/10 shadow-2xl space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5722]">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
              How the Placement Portal Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 01 */}
            <div className="bg-[#121215] p-6 rounded-2xl border border-white/10 space-y-3 relative hover:border-[#FF5722]/40 transition-colors">
              <div className="text-3xl font-black font-mono text-[#FF5722]">
                01.
              </div>
              <h3 className="text-base font-bold text-white">Verify College Email</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log in using your official engineering college email address. The system matches your domain against the 50 Bangalore college whitelist.
              </p>
              <div className="text-[11px] text-[#FF5722] font-semibold pt-1">
                Instant domain check (@rvce, @cmrit, @pes...)
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#121215] p-6 rounded-2xl border border-white/10 space-y-3 relative hover:border-[#FF5722]/40 transition-colors">
              <div className="text-3xl font-black font-mono text-[#FF5722]">
                02.
              </div>
              <h3 className="text-base font-bold text-white">Submit 2-Min Feedback</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Right after your interview round, select company, role, tested topics from the 50-topic checklist, difficulty rating, and optional tips for juniors.
              </p>
              <div className="text-[11px] text-[#FF5722] font-semibold pt-1">
                100% Anonymous student storage
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#121215] p-6 rounded-2xl border border-white/10 space-y-3 relative hover:border-[#FF5722]/40 transition-colors">
              <div className="text-3xl font-black font-mono text-[#FF5722]">
                03.
              </div>
              <h3 className="text-base font-bold text-white">Unlock Recruiter Analytics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Query company-specific dashboards, inspect horizontal frequency bar charts, compare question styles, and read unfiltered interview tips.
              </p>
              <div className="text-[11px] text-[#FF5722] font-semibold pt-1">
                Real-time Chart.js visual dashboard
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-sm shadow-xl shadow-[#FF5722]/20 transition-all hover:scale-102 cursor-pointer"
            >
              <span>View Live Recruiter Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOWCASE: 50 Authorized Bangalore Colleges Showcase Directory
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF5722]">
              Campus Network
            </div>
            <h2 className="text-2xl font-black text-[#09090B] font-sans">
              50 Authorized Bangalore Engineering Colleges
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Verified domain directory for engineering student access across Bangalore.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={collegeSearch}
              onChange={(e) => setCollegeSearch(e.target.value)}
              placeholder="Filter colleges or domain..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-1">
          {filteredColleges.map(c => (
            <div 
              key={c.domain} 
              className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-xs hover:border-[#FF5722]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-[#09090B] truncate" title={c.name}>{c.name}</div>
              <div className="text-[10px] text-[#FF5722] font-mono font-bold mt-1">@{c.domain}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          RECRUITER RADAR STRIP: 100+ Recruiter Master List Preview
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-black/10 space-y-4 shadow-fintech">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Verified Placement Drives
            </span>
            <h3 className="text-xl font-black text-[#09090B]">
              Top Bangalore Recruiters Analyzed
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {featuredCompanies.map(comp => (
              <span
                key={comp}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs hover:border-[#FF5722]/40 transition-colors"
              >
                {comp}
              </span>
            ))}
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-[#09090B] text-[#FF5722] text-xs font-bold hover:bg-[#18181B] transition-colors cursor-pointer"
            >
              +84 More on Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
