import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  RefreshCw, 
  CheckCircle2, 
  Terminal,
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';
import { Opportunity } from '../types';
import { MovingParticlesBackground } from './MovingParticlesBackground';

interface OpportunitiesFeedProps {
  opportunities: Opportunity[];
  onTriggerScrape: () => void;
  isScraping: boolean;
  openScraperModal: () => void;
}

export const OpportunitiesFeed: React.FC<OpportunitiesFeedProps> = ({
  opportunities,
  onTriggerScrape,
  isScraping,
  openScraperModal
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOpportunities = opportunities.filter(opp => {
    if (filterType !== 'ALL' && opp.type !== filterType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = opp.title.toLowerCase().includes(q);
      const matchProvider = opp.provider.toLowerCase().includes(q);
      const matchSkills = (opp.requiredSkills || []).some(s => s.toLowerCase().includes(q));
      const matchDesc = opp.descriptionSummary.toLowerCase().includes(q);
      if (!matchTitle && !matchProvider && !matchSkills && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner - Sleek Onyx Black with Glowing Orange Accent */}
      <div className="bg-[#111111] rounded-3xl p-6 sm:p-8 text-white border-2 border-black shadow-xl relative overflow-hidden">
        {/* Moving Particles Animation for Section Design Background */}
        <MovingParticlesBackground variant="card" particleCount={55} />

        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5722]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1F1F24] text-[#FF5722] text-xs font-bold border border-[#333338]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Midnight Opportunity Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
              Internships, Hackathons & Competitions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Synchronized by automated cron from Unstop, Devpost, and leading tech portals, summarized with Gemini AI.
            </p>
          </div>

          <button
            onClick={openScraperModal}
            className="self-start md:self-auto inline-flex items-center px-4 py-2.5 rounded-xl bg-[#1A1A1E] hover:bg-[#25252A] text-white text-xs font-bold border border-[#333338] transition-colors cursor-pointer"
          >
            <Terminal className="w-4 h-4 mr-2 text-[#FF5722]" />
            <span>Inspect Scraper Specs</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 w-full box-border">
        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'Internship', 'Hackathon', 'Competition'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all border-2 cursor-pointer min-h-[44px] flex items-center justify-center shrink-0 ${
                filterType === type
                  ? 'bg-[#FF5722] text-white border-[#FF5722] shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type === 'ALL' ? 'All Opportunities' : type}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role, skills, provider..."
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF5722] min-h-[44px]"
          />
        </div>
      </div>

      {/* Opportunities Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
        {filteredOpportunities.map(opp => {
          const typeBadgeColor = 
            opp.type === 'Internship' ? 'bg-[#FFF3E0] text-[#E64A19] border-[#FF5722]' :
            opp.type === 'Hackathon' ? 'bg-purple-50 text-purple-700 border-purple-300' :
            'bg-amber-50 text-amber-700 border-amber-300';

          return (
            <div
              key={opp.id || opp.title}
              className="bg-white rounded-3xl border-2 border-[#111111] p-4 sm:p-6 shadow-[3px_3px_0px_0px_#111111] sm:shadow-[4px_4px_0px_0px_#111111] hover:translate-y-[-2px] transition-all flex flex-col justify-between space-y-4 w-full box-border"
            >
              <div className="space-y-3">
                {/* Header: Title, Provider, Type */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="min-w-0">
                    <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border-2 ${typeBadgeColor}`}>
                      {opp.type}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#111111] mt-2 font-sans leading-snug">
                      {opp.title}
                    </h3>
                    <div className="text-xs font-bold text-[#FF5722] mt-0.5 truncate">
                      {opp.provider}
                    </div>
                  </div>

                  {opp.stipendOrPrize && (
                    <div className="self-start sm:self-auto shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-[#111111] text-emerald-400 text-[11px] sm:text-xs font-mono font-bold border border-black shadow-xs">
                        <DollarSign className="w-3.5 h-3.5 mr-0.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{opp.stipendOrPrize}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* AI Summary Block */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border-2 border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <div className="text-[10px] uppercase font-black text-slate-500 tracking-wider mb-1 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1 text-[#FF5722]" />
                    Gemini AI Structured Summary
                  </div>
                  {opp.descriptionSummary}
                </div>

                {/* Required Skills Chips */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Required Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(opp.requiredSkills || []).map(skill => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Meta & Apply Link */}
              <div className="pt-3 border-t-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600 text-[11px] font-medium">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#FF5722] shrink-0" />
                    Deadline: <strong className="ml-0.5">{opp.deadline}</strong>
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500 shrink-0" />
                    {opp.location}
                  </span>
                </div>

                <a
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs transition-colors shadow-md shadow-[#FF5722]/20 cursor-pointer min-h-[44px] self-stretch sm:self-auto"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
