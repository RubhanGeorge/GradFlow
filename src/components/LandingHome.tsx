import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Building2, 
  BarChart3, 
  FileEdit, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Quote,
  TrendingUp,
  Search,
  Check,
  AlertCircle,
  Terminal,
  Cpu,
  Brain,
  Flame,
  Calendar,
  Code2,
  Lock,
  Zap,
  RefreshCw,
  Compass,
  Radar,
  Globe
} from 'lucide-react';
import { BANGALORE_COMPANIES } from '../data/companies';
import { MovingParticlesBackground } from './MovingParticlesBackground';

interface SuccessStory {
  id: string;
  authorBadge: string;
  collegeYear: string;
  company: string;
  role: string;
  packageOrStipend: string;
  quote: string;
  keyAdvantage: string;
  roundsCleared: string;
  highlightColor: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    authorBadge: 'Anonymous Senior · 2026 Batch',
    collegeYear: 'Tier-1 Engineering College',
    company: 'Amazon',
    role: 'Software Development Engineer (SDE-1)',
    packageOrStipend: 'CTC: 44 LPA',
    quote: 'The DSA topic breakdown on GradFlow was spot-on. Knowing that Amazon was focusing on dynamic programming and graph traversals in Round 2 helped me prioritize my prep. Cleared all 4 rounds and received the offer letter!',
    keyAdvantage: 'Focused prep on Dynamic Programming & Tree Traversals',
    roundsCleared: '4 of 4 Rounds Cleared',
    highlightColor: '#FF5722'
  },
  {
    id: 'story-2',
    authorBadge: 'Anonymous Senior · 2026 Batch',
    collegeYear: 'Autonomous Engineering Institute',
    company: 'Goldman Sachs',
    role: 'Technology Analyst',
    packageOrStipend: 'CTC: 32 LPA',
    quote: 'Before GradFlow, our batch had zero visibility into what questions were asked in technical rounds. Seeing actual feedback on system architecture and probability questions gave me the exact edge to clear the super day panel.',
    keyAdvantage: 'Unfiltered System Design & Math questions preview',
    roundsCleared: '3 of 3 Rounds Cleared',
    highlightColor: '#FFA726'
  },
  {
    id: 'story-3',
    authorBadge: 'Anonymous Senior · 2025 Batch',
    collegeYear: 'State Technical University',
    company: 'Swiggy',
    role: 'SDE-1 Backend',
    packageOrStipend: 'CTC: 28 LPA',
    quote: 'I prepared using the 50-topic checklist and reviewed previous rounds logged for Swiggy. The tip about explaining concurrency and Redis caching tradeoffs in Round 2 was the exact question my panel asked!',
    keyAdvantage: 'Redis caching & Concurrency tips from previous candidates',
    roundsCleared: '3 of 3 Rounds Cleared',
    highlightColor: '#FF7043'
  },
  {
    id: 'story-4',
    authorBadge: 'Anonymous Student · 3rd Year',
    collegeYear: 'Computer Science Department',
    company: 'Cred',
    role: 'Backend Product Engineering Intern',
    packageOrStipend: 'Stipend: INR 1,25,000 / month',
    quote: 'Discovered the Cred summer backend internship opportunity directly through GradFlow\'s Opportunity Radar. Applied through the direct link and referenced the technical prep guidelines. Landed the summer offer!',
    keyAdvantage: 'Live Opportunity Radar with direct application links',
    roundsCleared: 'OA + 2 Tech Rounds Cleared',
    highlightColor: '#10B981'
  },
  {
    id: 'story-5',
    authorBadge: 'Anonymous Senior · 2026 Batch',
    collegeYear: 'Affiliated Engineering College',
    company: 'Razorpay',
    role: 'Full Stack Engineer',
    packageOrStipend: 'CTC: 26 LPA',
    quote: 'Being able to browse interview experiences 100% anonymously makes everyone comfortable submitting real mistakes and tricky questions. That radical transparency leveled the playing field for our entire batch.',
    keyAdvantage: '100% Anonymous student-submitted interview edge cases',
    roundsCleared: 'All Rounds Cleared',
    highlightColor: '#38BDF8'
  }
];

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
  // Interactive Difficulty Preview for Feature Spotlight
  const [activeFeatureTab, setActiveFeatureTab] = useState<'feedback' | 'analytics' | 'opportunities'>('feedback');
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-play timer for testimonials carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setStoryIndex(prev => (prev + 1) % SUCCESS_STORIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handlePrevStory = () => {
    setIsAutoPlay(false);
    setStoryIndex(prev => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  const handleNextStory = () => {
    setIsAutoPlay(false);
    setStoryIndex(prev => (prev + 1) % SUCCESS_STORIES.length);
  };
  const [bentoDifficulty, setBentoDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // Split all companies into two staggered rows for the endless right-to-left marquee
  const marqueeRow1 = useMemo(() => {
    const half = Math.ceil(BANGALORE_COMPANIES.length / 2);
    const row = BANGALORE_COMPANIES.slice(0, half);
    return [...row, ...row]; // Duplicated for seamless loop
  }, []);

  const marqueeRow2 = useMemo(() => {
    const half = Math.ceil(BANGALORE_COMPANIES.length / 2);
    const row = BANGALORE_COMPANIES.slice(half);
    return [...row, ...row]; // Duplicated for seamless loop
  }, []);

  return (
    <div className="w-full space-y-12 sm:space-y-16 md:space-y-20 pb-20 selection:bg-[#FF5722] selection:text-white box-border overflow-x-hidden">
      {/* =========================================================================
          HERO SECTION: Obsidian Black Canvas with Electric Orange Ambient Radial Glow
         ========================================================================= */}
      <section className="relative overflow-hidden bg-[#09090B] text-white pt-10 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 w-full box-border">
        {/* Endless Moving Particle Background (Zero Lag Native Canvas 60FPS) */}
        <MovingParticlesBackground variant="hero" particleCount={115} />

        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] max-w-full h-[450px] bg-[radial-gradient(circle_at_top,rgba(255,87,34,0.18)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute top-1/3 -right-20 w-96 max-w-full h-96 bg-[radial-gradient(circle,rgba(255,112,67,0.1)_0%,transparent_60%)] pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8 sm:space-y-10 w-full box-border">
          {/* Top Pill Kicker */}
          <div className="flex justify-center w-full">
            <div className="group relative inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#18181B] via-[#1F1F24] to-[#18181B] border border-white/15 text-[11px] sm:text-xs font-semibold text-slate-200 shadow-lg shadow-black/40 hover:border-[#FF5722]/50 transition-all duration-300 cursor-default text-center">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5722]" />
              </span>
              <span className="tracking-wide">Verified Engineering Placement & Opportunity Radar</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF5722]/20 border border-[#FF5722]/40 text-[#FF5722] text-[10px] font-black uppercase tracking-wider shrink-0">100% Free & Open</span>
            </div>
          </div>

          {/* Catchy Linear-grade Headline */}
          <div className="text-center space-y-4 sm:space-y-5 max-w-4xl mx-auto px-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-sans leading-[1.12] sm:leading-[1.08] text-balance">
              Demystify Campus Placements with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726]">
                Real Data
              </span>{' '}
              from Your Seniors.
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Zero fluff. Zero anonymous rumors. Get unfiltered interview questions, difficulty metrics, recruiter breakdowns, and live hackathon radar — 100% free for students.
            </p>
          </div>

          {/* Action Bar: Balanced Compact Phrasing & Fluid Responsive Sizing */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 md:gap-4 pt-2 w-full max-w-2xl sm:max-w-3xl mx-auto">
            {/* Button 1: Explore Analytics */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="group relative overflow-hidden flex-1 w-full min-h-[48px] sm:min-h-[52px] md:min-h-[56px] px-3.5 sm:px-4 md:px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726] text-white font-extrabold text-xs sm:text-sm md:text-base shadow-xl shadow-[#FF5722]/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FF5722]/50 ring-2 ring-[#FF5722]/30 flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <span className="relative z-10 whitespace-nowrap">Explore Analytics</span>
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1 shrink-0 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            {/* Button 2: Share Experience */}
            <button
              onClick={() => onNavigate('feedback')}
              className="group relative overflow-hidden flex-1 w-full min-h-[48px] sm:min-h-[52px] md:min-h-[56px] px-3.5 sm:px-4 md:px-5 py-3 rounded-2xl bg-[#121215]/95 hover:bg-[#18181B] text-slate-100 font-extrabold text-xs sm:text-sm md:text-base border-2 border-white/15 hover:border-[#FF5722] shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FF5722]/20 flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer backdrop-blur-md"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              <FileEdit className="w-4 h-4 sm:w-4.5 sm:h-4.5 mr-1 text-[#FF5722] shrink-0 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="relative z-10 whitespace-nowrap">Share Experience</span>
            </button>

            {/* Button 3: Hackathon Radar */}
            <button
              onClick={() => onNavigate('opportunities')}
              className="group relative overflow-hidden flex-1 w-full min-h-[48px] sm:min-h-[52px] md:min-h-[56px] px-3.5 sm:px-4 md:px-5 py-3 rounded-2xl bg-[#121215]/95 hover:bg-[#18181B] text-slate-100 font-extrabold text-xs sm:text-sm md:text-base border-2 border-white/15 hover:border-[#FFA726] shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFA726]/20 flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer backdrop-blur-md"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              <Radar className="w-4 h-4 sm:w-4.5 sm:h-4.5 mr-1 text-[#FFA726] shrink-0 relative z-10 group-hover:rotate-45 transition-transform duration-500" />
              <span className="relative z-10 whitespace-nowrap">Hackathon Radar</span>
            </button>
          </div>

          {/* Quick KPI Counters - Responsive 1-col on mobile, 4-col on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto text-left pt-6 w-full box-border">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30 hover:-translate-y-0.5 duration-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#FF5722] tabular-nums">
                {totalFeedbacksCount}+
              </div>
              <div className="text-xs text-slate-300 font-bold mt-1">Interview Rounds Logged</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center font-mono">
                <TrendingUp className="w-3 h-3 mr-1 shrink-0" />
                <span>Real campus candidate data</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30 hover:-translate-y-0.5 duration-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                {BANGALORE_COMPANIES.length}+
              </div>
              <div className="text-xs text-slate-300 font-bold mt-1">Tech Recruiters Tracked</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Tier-1 & High Growth Leaders
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30 hover:-translate-y-0.5 duration-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#FFA726] tabular-nums">
                24/7
              </div>
              <div className="text-xs text-slate-300 font-bold mt-1">Hackathon & Intern Scraper</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center font-mono">
                <RefreshCw className="w-3 h-3 mr-1 shrink-0 animate-spin" />
                <span>Updated on regular basis</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121215] border border-white/10 transition-all hover:border-[#FF5722]/30 hover:-translate-y-0.5 duration-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-300 font-bold mt-1">Anonymous & Free</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Zero paywalls or monetization
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TOP RECRUITERS ANALYZED: AUTOMATIC RIGHT-TO-LEFT ENDLESS SCROLLING BAR
          Continuous infinite loop featuring all companies from the master DB
         ========================================================================= */}
      <section className="w-full bg-[#09090B] py-8 sm:py-10 border-y border-white/10 relative overflow-hidden">
        {/* Left and Right Fade Edge Masks for Seamless Carousel Transition */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#09090B] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#09090B] to-transparent z-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            <span>Top Tech Recruiters We Have Analyzed ({BANGALORE_COMPANIES.length}+ Companies in Database)</span>
          </div>
          <p className="text-xs text-slate-400">
            Endlessly tracking interview patterns, difficulty curves, and OA rounds across premier campus hirers
          </p>
        </div>

        {/* Row 1: Right-to-Left Continuous Scrolling Track */}
        <div className="relative w-full overflow-hidden mb-3">
          <div className="animate-marquee-left flex items-center space-x-3 py-1">
            {marqueeRow1.map((company, index) => (
              <div
                key={`row1-${company}-${index}`}
                onClick={() => onNavigate('dashboard')}
                className="group inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#121215] border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 cursor-pointer shrink-0 hover:border-[#FF5722] hover:text-white hover:bg-[#18181B]"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF5722]/80 group-hover:scale-125 transition-transform" />
                <span className="font-sans whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right-to-Left Continuous Scrolling Track (Offset Speed) */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-left-alt flex items-center space-x-3 py-1">
            {marqueeRow2.map((company, index) => (
              <div
                key={`row2-${company}-${index}`}
                onClick={() => onNavigate('dashboard')}
                className="group inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#121215] border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 cursor-pointer shrink-0 hover:border-[#FFA726] hover:text-white hover:bg-[#18181B]"
              >
                <span className="w-2 h-2 rounded-full bg-[#FFA726]/80 group-hover:scale-125 transition-transform" />
                <span className="font-sans whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE FEATURES SUITE: Restructured Feature Grid for GradFlow
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold border border-[#FF5722]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Campus Placement Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#09090B] tracking-tight font-sans">
            Engineered Features Built for Students
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Everything an engineering student needs to prepare for placement drives, decode recruiter rounds, and discover opportunities — without rumors or paywalls.
          </p>
        </div>

        {/* Primary 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1: Real Feedback Collection from Placement Candidates */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black/10 shadow-fintech hover:border-[#FF5722]/60 hover:shadow-fintech-hover transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md border border-white/10 group-hover:scale-105 transition-transform">
                <FileEdit className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-black uppercase text-[#FF5722] tracking-wider">
                  Tactile Structured Inputs
                </span>
                <h3 className="text-xl font-black text-[#09090B] font-sans mt-0.5">
                  Real Candidate Interview Reviews
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Collects direct, structured feedback from students who actively sit for placement interviews in their colleges. Captures round breakdown (OA, Technical 1, System Design, HR), duration, and specific questions asked.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>11 structured questions with zero typing friction</span>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Autocomplete across 100+ recruiter master list</span>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Interactive question style percentage distribution</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('feedback')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-[#FF5722] font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs group-hover:bg-[#FF5722] group-hover:text-white"
              >
                <span>Record Interview Round</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 2: 100% Anonymous Community Sharing */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black/10 shadow-fintech hover:border-[#FF5722]/60 hover:shadow-fintech-hover transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-emerald-400 flex items-center justify-center font-bold shadow-md border border-white/10 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-black uppercase text-emerald-600 tracking-wider">
                  Privacy-First Transparency
                </span>
                <h3 className="text-xl font-black text-[#09090B] font-sans mt-0.5">
                  100% Anonymous Peer Display
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All feedbacks are displayed completely anonymously across the portal. Students can speak openly about tricky technical curveballs, interviewer demeanor, and live problem statements without fear of repercussions.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>No student names, roll numbers, or IDs revealed</span>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Verified student credentials ensure authentic reviews</span>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Unfiltered advice and preparation warnings for juniors</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs group-hover:bg-[#FF5722] group-hover:text-white"
              >
                <span>Browse Anonymous Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 3: One-Stop Radar for Hackathons & Internships */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black/10 shadow-fintech hover:border-[#FF5722]/60 hover:shadow-fintech-hover transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FFA726] flex items-center justify-center font-bold shadow-md border border-white/10 group-hover:scale-105 transition-transform">
                <Radar className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-black uppercase text-[#E64A19] tracking-wider">
                  Automated Intelligence Feed
                </span>
                <h3 className="text-xl font-black text-[#09090B] font-sans mt-0.5">
                  One-Stop Opportunity Radar
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                One centralized destination for all details related to new hackathons, internships, and hiring challenges. Data is updated on a regular basis via automated intelligence scrapers tracking premier platforms.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Midnight automated sync from Unstop, Devpost & Careers</span>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Verified stipends, prize pools, and application deadlines</span>
                </div>
                <div className="flex items-center text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  <span>Required tech stacks and direct apply links</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('opportunities')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-[#FFA726] font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs group-hover:bg-[#FF5722] group-hover:text-white"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
          {/* Feature 4: Interactive Recruiter Analytics & Visual Charts */}
          <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-black/10 shadow-sm hover:border-[#FF5722]/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#09090B] font-sans">
                Recruiter Difficulty & Visual Trends
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Filter by any recruiter to inspect round-by-round difficulty curves, question style weightages (DSA vs AI tools vs Aptitude), and recent student interview tips.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#FF5722] cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <span>View Recruiter Dashboard</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Feature 5: 50-Topic Master Interview Checklist */}
          <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-black/10 shadow-sm hover:border-[#FF5722]/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#09090B] text-emerald-400 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#09090B] font-sans">
                50-Topic Tested Checklist
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Categorized across Data Structures, Algorithms, System Design, Core CS Fundamentals, Cloud & DevOps, AI/Vibe Tools, and Web Development for targeted prep.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#FF5722] cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <span>Check Topic Frequencies</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Feature 6: Zero Paywalls & Student-Powered */}
          <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-black/10 shadow-sm hover:border-[#FF5722]/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#09090B] text-[#FFA726] flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#09090B] font-sans">
                100% Free & Open Campus Access
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero commercial paywalls, zero subscription tiers, zero locked company reports. Built purely to empower engineering candidates across India.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-600">
              <Check className="w-4 h-4 mr-1 text-emerald-600" />
              <span>100% Open Access For All Students</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SPOTLIGHT: Tactile Feature Showcase
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#09090B] text-white rounded-3xl p-6 sm:p-10 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Moving Particles Animation for Deep Design Section */}
          <MovingParticlesBackground variant="card" particleCount={65} />

          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1F1F24] text-[#FF5722] text-xs font-bold border border-white/10">
                <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>Interactive Campus Preview</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans tracking-tight">
                Peer Experience Over Commercial Marketing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Traditional job portals rely on generic ratings. GradFlow gives you exact round breakdowns, time limits, interviewer composition, and real problem statements verified by students who were actually in the room.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('feedback')}
                  className="px-6 py-3 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs transition-all shadow-md shadow-[#FF5722]/30 flex items-center space-x-2 cursor-pointer"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Submit Anonymous Experience</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="px-6 py-3 rounded-xl bg-[#18181B] hover:bg-white/10 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-[#FFA726]" />
                  <span>Launch Recruiter Radar</span>
                </button>
              </div>
            </div>

            {/* Interactive Tactile Difficulty Segment Preview */}
            <div className="bg-[#121215] p-6 rounded-2xl border border-white/10 w-full lg:w-96 space-y-4 shadow-xl shrink-0">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span>Tactical Difficulty Weighting:</span>
                <span className="text-[#FF5722] font-mono text-[11px]">Interactive Demo</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBentoDifficulty('Easy')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    bentoDifficulty === 'Easy'
                      ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500 shadow-sm font-bold text-emerald-400'
                      : 'bg-[#18181B] border-white/10 text-slate-400 hover:border-white/20'
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
                      ? 'bg-[#FF5722]/20 border-[#FF5722] ring-2 ring-[#FF5722] shadow-sm font-bold text-[#FFA726]'
                      : 'bg-[#18181B] border-white/10 text-slate-400 hover:border-white/20'
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
                      ? 'bg-rose-950/60 border-rose-600 ring-2 ring-rose-600 shadow-sm font-bold text-rose-400'
                      : 'bg-[#18181B] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mx-auto mb-1" />
                  <div className="text-xs">Hard</div>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 font-mono text-center pt-1 border-t border-white/10">
                Selected: <strong className="text-white font-sans font-bold">{bentoDifficulty}</strong> · Peer ratings weighted in live charts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ANONYMOUS STUDENT TESTIMONIALS: Simple Interactive Carousel Section
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold border border-[#FF5722]/20">
            <Quote className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>Anonymous Student Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#09090B] tracking-tight font-sans">
            How GradFlow Helped Seniors Crack Top Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real feedback from anonymous candidates who converted placements and internships with community intelligence.
          </p>
        </div>

        {/* Carousel Showcase Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Card Frame */}
          <div className="bg-[#09090B] text-white rounded-3xl p-6 sm:p-10 border-2 border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Moving Particles Animation for Deep Design Section */}
            <MovingParticlesBackground variant="card" particleCount={50} />

            {/* Ambient Radial Accent */}
            <div 
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ backgroundColor: SUCCESS_STORIES[storyIndex].highlightColor }}
            />

            <div className="relative z-10 space-y-6">
              {/* Header of Story Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md shrink-0"
                    style={{ backgroundColor: SUCCESS_STORIES[storyIndex].highlightColor }}
                  >
                    {SUCCESS_STORIES[storyIndex].company.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-black tracking-tight font-sans">
                        {SUCCESS_STORIES[storyIndex].company}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/15">
                        {SUCCESS_STORIES[storyIndex].packageOrStipend}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {SUCCESS_STORIES[storyIndex].role}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#121215] border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold self-start sm:self-auto shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{SUCCESS_STORIES[storyIndex].authorBadge}</span>
                </div>
              </div>

              {/* Quote Body */}
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#FF5722]/50" />
                <p className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed italic font-sans">
                  "{SUCCESS_STORIES[storyIndex].quote}"
                </p>
              </div>

              {/* Bottom Details Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-[#FFA726] shrink-0" />
                  <span>
                    <strong>What Helped:</strong> {SUCCESS_STORIES[storyIndex].keyAdvantage}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-xs shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{SUCCESS_STORIES[storyIndex].roundsCleared}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between pt-5 px-2">
            <button
              type="button"
              onClick={handlePrevStory}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#FF5722] hover:bg-slate-50 text-slate-700 hover:text-[#FF5722] transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center space-x-2">
              {SUCCESS_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    setIsAutoPlay(false);
                    setStoryIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    storyIndex === idx 
                      ? 'w-8 bg-[#FF5722] shadow-xs' 
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Jump to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextStory}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#FF5722] hover:bg-slate-50 text-slate-700 hover:text-[#FF5722] transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA SECTION: Empowering Students Across India
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#09090B] font-sans tracking-tight">
            Ready to Ace Your Upcoming Placement Season?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Explore live company breakdowns, read junior preparation advice, and track new hackathons updated on a regular basis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-extrabold text-sm shadow-xl shadow-[#FF5722]/30 transition-all cursor-pointer hover:scale-102 flex items-center justify-center space-x-2"
          >
            <span>Explore Recruiter Analytics</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={() => onNavigate('opportunities')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#09090B] hover:bg-[#18181B] text-slate-200 font-bold text-sm border border-black transition-all cursor-pointer hover:scale-102 flex items-center justify-center space-x-2"
          >
            <Radar className="w-4 h-4 text-[#FFA726]" />
            <span>Open Opportunity Radar</span>
          </button>
        </div>
      </section>
    </div>
  );
};
