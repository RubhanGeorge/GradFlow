import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown,
  Layers,
  Clock,
  Lock,
  Compass
} from 'lucide-react';
import { MovingParticlesBackground } from './MovingParticlesBackground';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Privacy' | 'Reviews' | 'Radar' | 'Analytics';
  icon: React.ElementType;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What is GradFlow and how does it help students?",
    answer: "GradFlow is a free, student-first placement intelligence platform designed specifically for engineering students. It provides peer-verified interview experiences, company-wise difficulty metrics, real technical questions asked, and recruitment trends shared anonymously by senior students.",
    category: "General",
    icon: GraduationCap
  },
  {
    id: 2,
    question: "Is GradFlow really 100% free to use?",
    answer: "Yes, absolutely! GradFlow is built by students, for students. There are no hidden subscription fees, paywalls, or premium tiers for viewing placement insights or submitting feedback.",
    category: "General",
    icon: Sparkles
  },
  {
    id: 3,
    question: "How do you ensure my feedback remains 100% anonymous?",
    answer: "We take privacy seriously. When you submit feedback, our system only records your verified institutional domain (e.g., @cmrit.ac.in) to validate authenticity. Your name, email, student ID, IP address, and personal identifier are NEVER stored alongside the review document.",
    category: "Privacy",
    icon: Lock
  },
  {
    id: 4,
    question: "Why do I need to sign in with my official college email address?",
    answer: "Email domain whitelisting ensures that all interview reviews come from authentic students attending recognized technical institutions. This prevents spam, fake recruiter reviews, and unverified data while keeping your identity private.",
    category: "Privacy",
    icon: ShieldCheck
  },
  {
    id: 5,
    question: "Which college email domains are supported?",
    answer: "We support over 50 top Bangalore engineering and university domains including @cmrit.ac.in, @rvce.edu.in, @bmsce.ac.in, @msrit.edu, @pes.edu, and many more.",
    category: "General",
    icon: Layers
  },
  {
    id: 6,
    question: "Can recruiters or college management track who wrote a specific interview review?",
    answer: "No. Submissions are decoupled from user credentials in Firestore. Neither placement cells, campus recruiters, nor other students can trace feedback back to individual users.",
    category: "Privacy",
    icon: Lock
  },
  {
    id: 7,
    question: "How long does it take to submit an interview feedback round?",
    answer: "We engineered our 11-question form to take approximately 2 minutes. With pre-loaded recruiter names, categorized topic accordions, and quick duration sliders, you can share your experience right after walking out of an interview.",
    category: "Reviews",
    icon: Clock
  },
  {
    id: 8,
    question: "How often is the Opportunity Radar updated?",
    answer: "Our automated background cron process runs every midnight to aggregate tech internships, off-campus hiring drives, and competitive hackathons from top student portals. Each opportunity is automatically summarized using Gemini 1.5 Flash AI.",
    category: "Radar",
    icon: Compass
  },
  {
    id: 9,
    question: "What happens if my college email domain is not currently supported?",
    answer: "If your institution's email domain isn't listed, you can submit a domain addition request via the Portal Access screen, and our team will add your institution after verifying its domain credentials.",
    category: "General",
    icon: ShieldCheck
  },
  {
    id: 10,
    question: "How are the analytics charts generated on the Company Analytics page?",
    answer: "All charts on the Analytics page are dynamically computed in real-time using Chart.js based on verified peer submissions across rounds, difficulty ratings, and tested skill areas.",
    category: "Analytics",
    icon: Zap
  },
  {
    id: 11,
    question: "Can I edit or delete an interview review after submitting it?",
    answer: "Because reviews are stored anonymously without binding to personal user IDs for complete privacy protection, submitted reviews cannot be directly edited by individual users. If you need a correction or redaction, contact the platform maintainers with the submission timestamp and company details.",
    category: "Reviews",
    icon: ShieldCheck
  },
  {
    id: 12,
    question: "How can I contribute to or help improve the GradFlow platform?",
    answer: "You can contribute simply by sharing your authentic interview rounds after campus or off-campus drives! You can also suggest new features, report bugs, or recommend hiring drives to include on our Opportunity Radar.",
    category: "General",
    icon: Sparkles
  }
];

interface FAQPageProps {
  onNavigate: (tab: 'home' | 'dashboard' | 'feedback' | 'opportunities') => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<number[]>([1, 2, 3]); // Open the first 3 by default
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, 'yes' | 'no'>>({});

  const categories = ['All', 'General', 'Privacy', 'Reviews', 'Radar', 'Analytics'];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) || 
        faq.answer.toLowerCase().includes(q) ||
        `q${faq.id}`.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleOpen = (id: number) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenIds(FAQ_DATA.map(f => f.id));
  };

  const handleCollapseAll = () => {
    setOpenIds([]);
  };

  const handleVote = (id: number, vote: 'yes' | 'no') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: prev[id] === vote ? (undefined as unknown as 'yes') : vote
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#111111] pb-16">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-[#09090B] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-white/10">
        {/* Simple moving particles animation (crisp, zero-glow) */}
        <MovingParticlesBackground variant="hero" particleCount={95} />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
          {/* Badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-orange-400 backdrop-blur-md">
              <HelpCircle className="w-4 h-4 text-[#FF5722]" />
              <span>KNOWLEDGE BASE & FAQ</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FF8A65] to-[#FFA726]">Questions</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 text-center max-w-2xl mx-auto">
            Everything you need to know about peer feedback, verified institutional privacy, real-time analytics, and our opportunity radar.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-[#FF5722]">100%</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Free For Students</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-emerald-400">Zero</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Personal IDs Stored</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-amber-400">~2 min</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Submission Time</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-blue-400">50+</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">College Domains</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., anonymous, email domain, radar, free)..."
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-[#18181B] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-white px-2 py-1 rounded bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Accordion Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 w-full box-border">
        {/* Category Filter Pills & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer min-h-[36px] ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-black border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 shrink-0 self-end sm:self-auto">
            <span>Showing {filteredFaqs.length} of {FAQ_DATA.length}</span>
            <span className="text-slate-300">|</span>
            <button
              onClick={handleExpandAll}
              className="text-[#FF5722] hover:underline cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-slate-700 cursor-pointer"
            >
              Collapse
            </button>
          </div>
        </div>

        {/* FAQ List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find anything matching "{searchQuery}". Try using different terms like "domains", "privacy", or "radar".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-[#FF5722] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const vote = helpfulVotes[faq.id];
              const IconComponent = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-[#FF5722]/50 shadow-md ring-1 ring-[#FF5722]/20' 
                      : 'border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleOpen(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between text-left gap-3.5 cursor-pointer min-h-[56px] group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center space-x-3.5 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-colors ${
                        isOpen 
                          ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/30' 
                          : 'bg-slate-100 text-slate-700 group-hover:bg-orange-50 group-hover:text-[#FF5722]'
                      }`}>
                        Q{faq.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded-md">
                            {faq.category}
                          </span>
                        </div>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors leading-snug break-words">
                          {faq.question}
                        </h2>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                      isOpen 
                        ? 'bg-[#FF5722]/10 border-[#FF5722]/30 text-[#FF5722]' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:text-slate-700'
                    }`}>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Answer Body */}
                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 sm:pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                      <div className="pl-0 sm:pl-11 pr-2">
                        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal break-words space-y-2">
                          <p>{faq.answer}</p>
                        </div>

                        {/* Interactive footer for each Q */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                          <div className="flex items-center space-x-1.5 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-slate-500 font-medium">GradFlow Verified Documentation</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-[11px] text-slate-400">Was this answer helpful?</span>
                            <button
                              onClick={() => handleVote(faq.id, 'yes')}
                              className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors cursor-pointer min-h-[32px] min-w-[32px] justify-center ${
                                vote === 'yes'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-600 font-bold'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                              }`}
                              title="Yes, this was helpful"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleVote(faq.id, 'no')}
                              className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors cursor-pointer min-h-[32px] min-w-[32px] justify-center ${
                                vote === 'no'
                                  ? 'bg-rose-50 border-rose-300 text-rose-600 font-bold'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                              }`}
                              title="No, needs clarification"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Interactive Call to Action Banner */}
        <div className="mt-12 bg-gradient-to-br from-[#111111] to-[#1A1A1E] rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl relative overflow-hidden">
          {/* Simple moving particles animation (crisp, zero-glow) */}
          <MovingParticlesBackground variant="card" particleCount={45} />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1.5 max-w-xl">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[#FF5722]/20 text-[#FFA726] text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>SUPPORTING BANGALORE TECH CAMPUSES</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Ready to contribute or browse company hiring rounds?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Help junior students navigate technical interviews with verified peer insights, or inspect breakdown charts for 100+ recruiters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => onNavigate('feedback')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7043] hover:from-[#E64A19] hover:to-[#FF5722] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5722]/30 cursor-pointer min-h-[44px]"
              >
                <span>Submit Review</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors border border-white/10 cursor-pointer min-h-[44px]"
              >
                <span>Explore Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
