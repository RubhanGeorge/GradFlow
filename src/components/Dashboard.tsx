import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  BarChart3, 
  Clock, 
  Gauge, 
  Flame, 
  HelpCircle, 
  Lightbulb, 
  MessageSquare, 
  CheckCircle, 
  Calendar, 
  Filter, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Sparkles,
  Quote,
  Copy,
  Check
} from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import '../utils/chartSetup';
import { BANGALORE_COMPANIES, ROUND_LABELS } from '../data/companies';
import { BANGALORE_COLLEGE_DOMAINS, getCollegeName } from '../data/colleges';
import { InterviewFeedback } from '../types';

interface DashboardProps {
  feedbacks: InterviewFeedback[];
  openSubmitForm?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  feedbacks,
  openSubmitForm
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');
  const [selectedCollege, setSelectedCollege] = useState<string>('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('ALL');
  const [filterRound, setFilterRound] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedTipId, setCopiedTipId] = useState<string | null>(null);

  // Filtered dataset
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(f => {
      if (selectedCompany !== 'ALL' && f.company.toLowerCase() !== selectedCompany.toLowerCase()) {
        return false;
      }
      if (selectedCollege !== 'ALL' && f.collegeDomain?.toLowerCase() !== selectedCollege.toLowerCase()) {
        return false;
      }
      if (filterDifficulty !== 'ALL' && f.overallDifficulty !== filterDifficulty) {
        return false;
      }
      if (filterRound !== 'ALL' && f.round.toString() !== filterRound) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inCompany = f.company.toLowerCase().includes(q);
        const inRole = f.role.toLowerCase().includes(q);
        const inCollege = (f.collegeDomain || '').toLowerCase().includes(q) || getCollegeName(f.collegeDomain || '').toLowerCase().includes(q);
        const inTopics = f.topicsTested.some(t => t.toLowerCase().includes(q));
        const inQuestions = f.technicalQuestions?.toLowerCase().includes(q);
        const inTips = f.juniorTips?.toLowerCase().includes(q);
        if (!inCompany && !inRole && !inCollege && !inTopics && !inQuestions && !inTips) {
          return false;
        }
      }
      return true;
    });
  }, [feedbacks, selectedCompany, selectedCollege, filterDifficulty, filterRound, searchQuery]);

  // Available Companies list with counts
  const companyCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    feedbacks.forEach(f => {
      counts[f.company] = (counts[f.company] || 0) + 1;
    });
    return counts;
  }, [feedbacks]);

  const uniqueCompanies = useMemo(() => {
    return Object.keys(companyCounts).sort((a, b) => companyCounts[b] - companyCounts[a]);
  }, [companyCounts]);

  // Aggregate Metrics
  const totalCount = filteredFeedbacks.length;
  const avgDuration = totalCount > 0 
    ? Math.round(filteredFeedbacks.reduce((acc, f) => acc + (f.durationMinutes || 45), 0) / totalCount)
    : 0;

  const difficultyBreakdown = useMemo(() => {
    const diff = { Easy: 0, Medium: 0, Hard: 0 };
    filteredFeedbacks.forEach(f => {
      if (f.overallDifficulty in diff) {
        diff[f.overallDifficulty as keyof typeof diff]++;
      }
    });
    return diff;
  }, [filteredFeedbacks]);

  // Question Style Aggregate Percentages
  const aggregatedStyleRatios = useMemo(() => {
    if (totalCount === 0) return { tech: 60, ai: 20, aptitude: 20 };
    let tech = 0;
    let ai = 0;
    let apt = 0;
    filteredFeedbacks.forEach(f => {
      tech += f.questionStyles?.techPercent ?? 60;
      ai += f.questionStyles?.aiPercent ?? 20;
      apt += f.questionStyles?.aptitudePercent ?? 20;
    });
    return {
      tech: Math.round(tech / totalCount),
      ai: Math.round(ai / totalCount),
      aptitude: Math.round(apt / totalCount)
    };
  }, [filteredFeedbacks, totalCount]);

  // TOP 10 TESTED TOPICS (Horizontal Bar Chart)
  const topTopicsData = useMemo(() => {
    const topicFrequency: { [key: string]: number } = {};
    filteredFeedbacks.forEach(f => {
      (f.topicsTested || []).forEach(t => {
        topicFrequency[t] = (topicFrequency[t] || 0) + 1;
      });
    });

    const sortedTopics = Object.entries(topicFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      labels: sortedTopics.map(([name]) => name),
      datasets: [
        {
          label: 'Times Tested in Interviews',
          data: sortedTopics.map(([, count]) => count),
          backgroundColor: 'rgba(255, 87, 34, 0.9)', // Vibrant Deep Orange
          hoverBackgroundColor: '#E64A19',
          borderRadius: 6,
          barThickness: 16
        }
      ]
    };
  }, [filteredFeedbacks]);

  const topTopicsOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => ` Tested ${context.raw} times (${totalCount > 0 ? Math.round((context.raw / totalCount) * 100) : 0}% of interviews)`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0, font: { size: 11, family: 'Plus Jakarta Sans' } },
        grid: { color: 'rgba(226, 232, 240, 0.6)' }
      },
      y: {
        ticks: { font: { size: 11, family: 'Plus Jakarta Sans', weight: 'bold' as const } },
        grid: { display: false }
      }
    }
  };

  // Question Style Doughnut
  const styleDoughnutData = useMemo(() => ({
    labels: ['Programming & Technical', 'AI & Efficiency Tools', 'Aptitude & Brain Testing'],
    datasets: [
      {
        data: [aggregatedStyleRatios.tech, aggregatedStyleRatios.ai, aggregatedStyleRatios.aptitude],
        backgroundColor: [
          '#FF5722', // Primary Vibrant Orange
          '#111111', // Deep Black
          '#FFA726'  // Warm Amber / Secondary Orange
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  }), [aggregatedStyleRatios]);

  const styleDoughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 12, font: { size: 11, family: 'Plus Jakarta Sans' } }
      }
    },
    cutout: '68%'
  };

  // Year-on-Year Trend Analysis (2023 - 2026)
  const yoyData = useMemo(() => {
    const years = [2023, 2024, 2025, 2026];
    const techTrends = [75, 70, 62, 58];
    const aiTrends = [0, 5, 15, 24];
    const aptTrends = [25, 25, 23, 18];

    return {
      labels: years.map(y => `Batch ${y}`),
      datasets: [
        {
          label: 'Technical & DSA %',
          data: techTrends,
          borderColor: '#FF5722',
          backgroundColor: 'rgba(255, 87, 34, 0.12)',
          tension: 0.35,
          fill: true
        },
        {
          label: 'AI & Vibe Coding %',
          data: aiTrends,
          borderColor: '#111111',
          backgroundColor: 'rgba(17, 17, 17, 0.1)',
          tension: 0.35,
          fill: true
        },
        {
          label: 'Aptitude & Puzzles %',
          data: aptTrends,
          borderColor: '#FFA726',
          backgroundColor: 'rgba(255, 167, 38, 0.12)',
          tension: 0.35,
          fill: true
        }
      ]
    };
  }, []);

  const yoyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 10, font: { size: 11, family: 'Plus Jakarta Sans' } }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { callback: (val: any) => `${val}%` }
      }
    }
  };

  const copyTip = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTipId(id);
    setTimeout(() => setCopiedTipId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner / Floating Filter Console (Linear / Raycast Aesthetic) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-fintech space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(255,87,34,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#09090B] text-[#FF5722] text-xs font-bold mb-2 border border-white/10">
              <BarChart3 className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>50 Bangalore Colleges Placement Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#09090B] tracking-tight font-sans">
              Recruiter Analytics & Placement Trends
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explore aggregated interview rounds, difficulty ratings, and question styles from verified Bangalore recruiters.
            </p>
          </div>

          {openSubmitForm && (
            <button
              onClick={openSubmitForm}
              className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-[#FF5722]/30 transition-all duration-300 ease-out hover:-translate-y-0.5 self-start md:self-auto cursor-pointer ring-4 ring-[#FF5722]/20"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Share Interview Round
            </button>
          )}
        </div>

        {/* Company Selector and Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 relative z-10">
          {/* Company Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />
              Target Recruiter
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-colors"
            >
              <option value="ALL">All Bangalore Recruiters ({feedbacks.length} rounds)</option>
              {uniqueCompanies.map(comp => (
                <option key={comp} value={comp}>
                  {comp} ({companyCounts[comp]} interviews)
                </option>
              ))}
            </select>
          </div>

          {/* Bangalore College Whitelist Filter */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />
              College / Institute
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-colors"
            >
              <option value="ALL">All 50 Bangalore Colleges</option>
              {BANGALORE_COLLEGE_DOMAINS.map(domain => (
                <option key={domain} value={domain}>
                  {getCollegeName(domain)} (@{domain})
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Gauge className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />
              Round Difficulty
            </label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-colors"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Easy">Easy Only</option>
              <option value="Medium">Medium Only</option>
              <option value="Hard">Hard Only</option>
            </select>
          </div>

          {/* Round Filter */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Layers className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />
              Interview Round
            </label>
            <select
              value={filterRound}
              onChange={(e) => setFilterRound(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-colors"
            >
              <option value="ALL">All Interview Rounds</option>
              <option value="1">Round 1: Online Assessment (OA)</option>
              <option value="2">Round 2: Technical Round 1</option>
              <option value="3">Round 3: Tech 2 / System Design</option>
              <option value="4">Round 4: HR & Behavioral</option>
              <option value="5">Round 5: Final Composite</option>
            </select>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Search className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />
              Search Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Topic, question, role..."
                className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 text-xs hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards (Fintech High-Contrast Soft Ambient Shadow Standard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Interviews */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 ease-out hover:-translate-y-1 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Filtered Rounds</div>
            <div className="text-2xl font-black text-[#09090B] font-mono mt-0.5 tabular-nums">{totalCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
              {selectedCompany === 'ALL' ? 'Across all recruiters' : `${selectedCompany} interviews`}
            </div>
          </div>
        </div>

        {/* Avg Duration */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 ease-out hover:-translate-y-1 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Avg Duration</div>
            <div className="text-2xl font-black text-[#FF5722] font-mono mt-0.5 tabular-nums">{avgDuration}m</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Standard session length</div>
          </div>
        </div>

        {/* Overall Difficulty Gauge */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 ease-out hover:-translate-y-1 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FF5722] flex items-center justify-center font-bold shadow-md">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Difficulty Split</div>
            <div className="flex items-center space-x-1.5 mt-1 text-xs font-mono font-bold">
              <span className="text-emerald-600 font-black">{difficultyBreakdown.Easy} Easy</span>
              <span className="text-slate-300">/</span>
              <span className="text-[#FF5722] font-black">{difficultyBreakdown.Medium} Med</span>
              <span className="text-slate-300">/</span>
              <span className="text-rose-600 font-black">{difficultyBreakdown.Hard} Hard</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Reported by verified seniors</div>
          </div>
        </div>

        {/* AI Coding Integration Surge */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all duration-300 ease-out hover:-translate-y-1 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-[#FFA726] flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">AI Tools & Vibe Coding</div>
            <div className="text-2xl font-black text-[#09090B] font-mono mt-0.5 tabular-nums">
              {aggregatedStyleRatios.ai}%
            </div>
            <div className="text-[11px] text-[#FF5722] font-semibold mt-0.5">Prompting & Cursor testing</div>
          </div>
        </div>
      </div>

      {/* Visual Chart Grid (Chart.js Horizontal Bar + Doughnut + Trends) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Top 10 Tested Topics Horizontal Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#09090B] font-sans">
                  Top 10 Most Tested CS & Technical Topics
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Frequency of topics queried by interview panels for {selectedCompany === 'ALL' ? 'all companies' : selectedCompany}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold font-mono border border-[#FF5722]/20">
                Live Data
              </span>
            </div>
            <div className="h-72 w-full">
              <Bar data={topTopicsData} options={topTopicsOptions} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Derived from 50-topic checklist data</span>
            <span>Refreshes dynamically on recruiter filter</span>
          </div>
        </div>

        {/* Chart 2: Question Style Ratio Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Question Style Ratio
                </h3>
                <p className="text-xs text-slate-500">Breakdown of interview focus areas</p>
              </div>
            </div>
            <div className="h-64 w-full relative mt-2">
              <Doughnut data={styleDoughnutData} options={styleDoughnutOptions} />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722] mr-2" />
                Technical & DSA
              </span>
              <span className="font-mono font-bold text-slate-900">{aggregatedStyleRatios.tech}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111] mr-2" />
                AI & Efficiency Tools
              </span>
              <span className="font-mono font-bold text-slate-900">{aggregatedStyleRatios.ai}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFA726] mr-2" />
                Aptitude & Puzzles
              </span>
              <span className="font-mono font-bold text-slate-900">{aggregatedStyleRatios.aptitude}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Year-on-Year Trend Analysis (CSE Department Specification) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/10 shadow-fintech hover:shadow-fintech-hover transition-all space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2.5 py-0.5 rounded-lg mb-1 border border-[#FF5722]/20">
              <Calendar className="w-3 h-3 text-[#FF5722]" />
              <span>Multi-Year Placement Evolution (2023 - 2026)</span>
            </div>
            <h3 className="text-lg font-black text-[#09090B] font-sans">
              Year-on-Year Interview Pattern Shift
            </h3>
            <p className="text-xs text-slate-500">
              Notice the rapid climb of AI code generation and system efficiency testing alongside core DSA fundamentals.
            </p>
          </div>
        </div>

        <div className="h-60 w-full">
          <Line data={yoyData} options={yoyOptions} />
        </div>
      </div>

      {/* Qualitative Feedback Feed (Technical Questions & Tips for Juniors) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-[#09090B] font-sans flex items-center">
              <Quote className="w-5 h-5 mr-2 text-[#FF5722]" />
              Anonymous Student Questions & Junior Advice Feed
            </h3>
            <p className="text-xs text-slate-500">
              Real unfiltered interview experiences submitted by engineering graduates across Bangalore.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 font-mono">
            Showing {filteredFeedbacks.length} experiences
          </span>
        </div>

        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No Interview Feedback Matches Selected Filters</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first student to record an interview experience for this company or reset your filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCompany('ALL');
                setFilterDifficulty('ALL');
                setFilterRound('ALL');
                setSearchQuery('');
              }}
              className="text-xs px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFeedbacks.map((item, idx) => {
              const tipId = item.id || `feed-${idx}`;
              const difficultyBadgeColor = 
                item.overallDifficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                item.overallDifficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-emerald-50 text-emerald-700 border-emerald-200';

              return (
                <div 
                  key={tipId} 
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#FF5722]/50 hover:shadow-fintech transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header Row: Company, Role & Round */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-base text-slate-900">{item.company}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${difficultyBadgeColor}`}>
                            {item.overallDifficulty}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 font-medium mt-0.5">{item.role}</div>
                      </div>

                      <span className="text-[11px] font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-lg whitespace-nowrap">
                        {ROUND_LABELS[item.round] || `Round ${item.round}`}
                      </span>
                    </div>

                    {/* Panel Types & Duration */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                        <Clock className="w-3 h-3 mr-1 text-slate-400" />
                        {item.durationMinutes} mins
                      </span>
                      {(item.panelTypes || []).map(p => (
                        <span key={p} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Topics Tested Pills */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Topics Queried</div>
                      <div className="flex flex-wrap gap-1">
                        {(item.topicsTested || []).slice(0, 5).map(topic => (
                          <span key={topic} className="text-[11px] px-2 py-0.5 rounded-md bg-[#FF5722]/10 text-[#E64A19] font-medium border border-[#FF5722]/20">
                            {topic}
                          </span>
                        ))}
                        {(item.topicsTested?.length || 0) > 5 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                            +{(item.topicsTested?.length || 0) - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Technical Questions */}
                    {item.technicalQuestions && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-[#FF5722] tracking-wider flex items-center">
                          <HelpCircle className="w-3 h-3 mr-1" />
                          Coding / Technical Questions Asked
                        </div>
                        <p className="text-xs text-slate-700 font-mono leading-relaxed line-clamp-3">
                          {item.technicalQuestions}
                        </p>
                      </div>
                    )}

                    {/* Junior Tips */}
                    {item.juniorTips && (
                      <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/60 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider flex items-center justify-between">
                          <span className="flex items-center">
                            <Lightbulb className="w-3 h-3 mr-1 text-amber-600" />
                            Advice & Warnings for Juniors
                          </span>
                          <button
                            onClick={() => copyTip(tipId, item.juniorTips || '')}
                            className="text-amber-700 hover:text-amber-900 transition-colors p-1"
                            title="Copy tip to clipboard"
                          >
                            {copiedTipId === tipId ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          "{item.juniorTips}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Verified Anonymous Stamp */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-400">
                    <span className="flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                      Verified @{item.collegeDomain} ({getCollegeName(item.collegeDomain)})
                    </span>
                    <span className="text-slate-500 font-medium">Batch {item.year || 2026}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
