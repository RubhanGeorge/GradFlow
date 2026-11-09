import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Building2, 
  Briefcase, 
  Layers, 
  Clock, 
  Gauge, 
  Users, 
  PieChart, 
  ListChecks, 
  Code2, 
  MessageSquare, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle, 
  Send, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Search,
  Sliders,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Doughnut } from 'react-chartjs-2';
import '../utils/chartSetup';
import { BANGALORE_COMPANIES, SUGGESTED_ROLES, PANEL_TYPES, ROUND_LABELS } from '../data/companies';
import { TOPIC_CATEGORIES } from '../data/topics';
import { Difficulty, InterviewFeedback, RoundNumber } from '../types';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MovingParticlesBackground } from './MovingParticlesBackground';

interface FeedbackFormProps {
  onSuccess: (newFeedback?: InterviewFeedback) => void;
  openAuthModal: (reason?: string) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess, openAuthModal }) => {
  const { currentUser, userProfile } = useAuth();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress State (0% to 100%) for Sticky Progress Bar below top nav
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Question 1: Company Autocomplete (EMPTY by default)
  const [companyInput, setCompanyInput] = useState<string>('');
  const [showCompanyDropdown, setShowCompanyDropdown] = useState<boolean>(false);
  const companyWrapperRef = useRef<HTMLDivElement>(null);

  // Question 2: Targeted Role (EMPTY by default)
  const [roleInput, setRoleInput] = useState<string>('');

  // Question 3: Round Selection (1-5) (NULL by default - nothing preselected)
  const [selectedRound, setSelectedRound] = useState<RoundNumber | null>(null);

  // Question 4: Round Duration (15 - 120 mins) (NULL by default - nothing preselected)
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);

  // Question 5: Overall Difficulty (NULL by default - nothing preselected)
  const [overallDifficulty, setOverallDifficulty] = useState<Difficulty | null>(null);

  // Question 6: Panel Types (Multi-select) (EMPTY by default - nothing preselected)
  const [selectedPanels, setSelectedPanels] = useState<string[]>([]);

  // Question 7: Question Style Distribution (0% by default - nothing preselected)
  const [techPercent, setTechPercent] = useState<number>(0);
  const [techDiff, setTechDiff] = useState<Difficulty | null>(null);

  const [aiPercent, setAiPercent] = useState<number>(0);
  const [aiDiff, setAiDiff] = useState<Difficulty | null>(null);

  const [aptitudePercent, setAptitudePercent] = useState<number>(0);
  const [aptitudeDiff, setAptitudeDiff] = useState<Difficulty | null>(null);

  // Question 8: Specific Topics Tested (EMPTY by default - nothing preselected)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  // Question 9: Specific Coding Questions (Optional) (EMPTY by default)
  const [technicalQuestions, setTechnicalQuestions] = useState<string>('');

  // Question 10: Behavioral & HR Questions (Optional) (EMPTY by default)
  const [hrQuestions, setHrQuestions] = useState<string>('');

  // Question 11: Junior Advice & Tips (Optional) (EMPTY by default)
  const [juniorTips, setJuniorTips] = useState<string>('');

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  // Scroll listener to update the sticky progress bar color width dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (!formContainerRef.current) return;
      const elem = formContainerRef.current;
      const rect = elem.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Header offset (~72px on desktop / ~64px on mobile)
      const headerOffset = window.innerWidth < 640 ? 64 : 72;
      const topOffset = headerOffset - rect.top;
      const scrollableDist = elem.offsetHeight - (windowHeight - headerOffset);

      if (scrollableDist <= 0) {
        setScrollProgress(100);
        return;
      }

      const pct = Math.min(100, Math.max(0, (topOffset / scrollableDist) * 100));
      setScrollProgress(Math.round(pct));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Filtered Companies for Autocomplete
  const filteredCompanies = useMemo(() => {
    if (!companyInput.trim()) return BANGALORE_COMPANIES.slice(0, 8);
    const query = companyInput.toLowerCase();
    const matches = BANGALORE_COMPANIES.filter(c => c.toLowerCase().includes(query));
    return matches.slice(0, 10);
  }, [companyInput]);

  // Click outside listener for company dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (companyWrapperRef.current && !companyWrapperRef.current.contains(event.target as Node)) {
        setShowCompanyDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Total style percentage validation
  const totalPercent = techPercent + aiPercent + aptitudePercent;
  const isPercentValid = totalPercent === 100;
  const isAnyPercentSet = techPercent > 0 || aiPercent > 0 || aptitudePercent > 0;

  // Auto-balance sliders to 100%
  const autoBalanceSliders = () => {
    const sum = techPercent + aiPercent + aptitudePercent;
    if (sum === 0) {
      setTechPercent(50);
      setAiPercent(25);
      setAptitudePercent(25);
      return;
    }
    const factor = 100 / sum;
    const newTech = Math.round(techPercent * factor);
    const newAi = Math.round(aiPercent * factor);
    const newApt = 100 - newTech - newAi;
    setTechPercent(newTech);
    setAiPercent(newAi);
    setAptitudePercent(newApt);
  };

  // Quick distribution presets (optional convenience for user)
  const setPresetDistribution = (tech: number, ai: number, apt: number) => {
    setTechPercent(tech);
    setAiPercent(ai);
    setAptitudePercent(apt);
  };

  // Completion Progress calculation across the 11 inputs
  const completedQuestionsCount = useMemo(() => {
    let count = 0;
    if (companyInput.trim().length > 0) count++; // Q1
    if (roleInput.trim().length > 0) count++; // Q2
    if (selectedRound !== null) count++; // Q3
    if (durationMinutes !== null && durationMinutes > 0) count++; // Q4
    if (overallDifficulty !== null) count++; // Q5
    if (selectedPanels.length > 0) count++; // Q6
    if (isPercentValid) count++; // Q7
    if (selectedTopics.length > 0) count++; // Q8
    if (technicalQuestions.trim().length > 0) count++; // Q9
    if (hrQuestions.trim().length > 0) count++; // Q10
    if (juniorTips.trim().length > 0) count++; // Q11
    return count;
  }, [
    companyInput, 
    roleInput, 
    selectedRound, 
    durationMinutes, 
    overallDifficulty, 
    selectedPanels, 
    isPercentValid, 
    selectedTopics, 
    technicalQuestions, 
    hrQuestions, 
    juniorTips
  ]);

  const progressPercentage = Math.round((completedQuestionsCount / 11) * 100);

  // Toggle Panel Selection
  const togglePanel = (panel: string) => {
    setSelectedPanels(prev => 
      prev.includes(panel) ? prev.filter(p => p !== panel) : [...prev, panel]
    );
  };

  // Toggle Topic Selection
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // Toggle Category Collapsible
  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Toggle all topic categories
  const toggleAllCategories = () => {
    if (allExpanded) {
      setExpandedCategories({});
      setAllExpanded(false);
    } else {
      const all: { [key: string]: boolean } = {};
      TOPIC_CATEGORIES.forEach(c => { all[c.id] = true; });
      setExpandedCategories(all);
      setAllExpanded(true);
    }
  };

  // Doughnut Chart Data for Real-Time Preview
  const chartData = useMemo(() => {
    if (!isAnyPercentSet) {
      return {
        labels: ['Not configured yet'],
        datasets: [
          {
            data: [100],
            backgroundColor: ['#E2E8F0'],
            borderColor: ['#CBD5E1'],
            borderWidth: 2,
          }
        ]
      };
    }
    return {
      labels: ['Technical Knowledge', 'AI & Vibe Tools', 'Aptitude & Logic'],
      datasets: [
        {
          data: [techPercent, aiPercent, aptitudePercent],
          backgroundColor: [
            '#FF5722', // Primary Deep Orange
            '#111111', // Onyx Black
            '#FFA726'  // Warm Amber
          ],
          borderColor: ['#E64A19', '#000000', '#FB8C00'],
          borderWidth: 2,
        }
      ]
    };
  }, [techPercent, aiPercent, aptitudePercent, isAnyPercentSet]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          font: { size: 10, family: 'Plus Jakarta Sans', weight: 'bold' as const },
          color: '#111111'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => isAnyPercentSet ? ` ${context.label}: ${context.raw}%` : ' Adjust sliders above'
        }
      }
    },
    cutout: '68%'
  };

  // Reset form fields completely
  const resetAllFormFields = () => {
    setCompanyInput('');
    setRoleInput('');
    setSelectedRound(null);
    setDurationMinutes(null);
    setOverallDifficulty(null);
    setSelectedPanels([]);
    setTechPercent(0);
    setTechDiff(null);
    setAiPercent(0);
    setAiDiff(null);
    setAptitudePercent(0);
    setAptitudeDiff(null);
    setSelectedTopics([]);
    setExpandedCategories({});
    setTechnicalQuestions('');
    setHrQuestions('');
    setJuniorTips('');
    setFormError(null);
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Mandatory Authentication Guard (Task #2)
    // Unauthenticated users cannot submit interview reviews
    if (!currentUser && !userProfile) {
      const authRequiredMessage = 'Login Required: Please sign in with your verified college email to post your interview feedback.';
      setFormError(authRequiredMessage);
      openAuthModal(authRequiredMessage);
      return;
    }

    // Strict Validation - Every required item must be explicitly provided
    if (!companyInput.trim()) {
      setFormError('Please specify the company you interviewed with (Question 1).');
      return;
    }
    if (!roleInput.trim()) {
      setFormError('Please enter your targeted job role (Question 2).');
      return;
    }
    if (selectedRound === null) {
      setFormError('Please select which interview round this was (Question 3).');
      return;
    }
    if (durationMinutes === null || durationMinutes <= 0) {
      setFormError('Please select or specify the interview duration (Question 4).');
      return;
    }
    if (overallDifficulty === null) {
      setFormError('Please choose the overall difficulty level of this round (Question 5).');
      return;
    }
    if (selectedPanels.length === 0) {
      setFormError('Please select at least one interviewer background (Question 6).');
      return;
    }
    if (!isPercentValid) {
      setFormError(`Question style percentages must total exactly 100% (currently ${totalPercent}%). Click Auto-Balance to balance automatically.`);
      return;
    }
    if (selectedTopics.length === 0) {
      setFormError('Please select at least one topic tested during the interview (Question 8).');
      return;
    }

    setIsSubmitting(true);

    const emailDomain = (currentUser?.email || userProfile?.email || '').split('@')[1] || userProfile?.collegeDomain || 'cmrit.ac.in';
    const userEmail = currentUser?.email || userProfile?.email || '';
    const submittedByUid = currentUser?.uid || userProfile?.uid || 'anonymous-student';

    const feedbackPayload: InterviewFeedback = {
      feedbackType: 'user',
      company: companyInput.trim(),
      role: roleInput.trim(),
      round: selectedRound,
      durationMinutes,
      overallDifficulty,
      panelTypes: selectedPanels,
      questionStyles: {
        techPercent,
        techDifficulty: techDiff || 'Medium',
        aiPercent,
        aiDifficulty: aiDiff || 'Medium',
        aptitudePercent,
        aptitudeDifficulty: aptitudeDiff || 'Medium',
        dsa: techPercent,
        systemDesign: aiPercent,
        behavioral: aptitudePercent
      },
      topicsTested: selectedTopics,
      technicalQuestions: technicalQuestions.trim() || undefined,
      hrQuestions: hrQuestions.trim() || undefined,
      juniorTips: juniorTips.trim() || undefined,
      submittedAt: new Date().toISOString(),
      collegeDomain: emailDomain,
      userEmail: userEmail,
      submittedByUid: submittedByUid,
      authorUid: submittedByUid,
      year: new Date().getFullYear()
    };

    // Prepare clean payload for Firestore (no undefined values)
    const firestoreData: Record<string, any> = {
      feedbackType: 'user',
      company: companyInput.trim(),
      role: roleInput.trim(),
      round: Number(selectedRound),
      durationMinutes: Number(durationMinutes),
      overallDifficulty,
      panelTypes: selectedPanels,
      questionStyles: {
        techPercent,
        techDifficulty: techDiff || 'Medium',
        aiPercent,
        aiDifficulty: aiDiff || 'Medium',
        aptitudePercent,
        aptitudeDifficulty: aptitudeDiff || 'Medium',
        dsa: techPercent,
        systemDesign: aiPercent,
        behavioral: aptitudePercent
      },
      topicsTested: selectedTopics,
      collegeDomain: emailDomain,
      userEmail: userEmail,
      submittedByUid: submittedByUid,
      authorUid: submittedByUid,
      year: new Date().getFullYear(),
      submittedAt: serverTimestamp()
    };

    if (technicalQuestions.trim()) {
      firestoreData.technicalQuestions = technicalQuestions.trim();
    }
    if (hrQuestions.trim()) {
      firestoreData.hrQuestions = hrQuestions.trim();
    }
    if (juniorTips.trim()) {
      firestoreData.juniorTips = juniorTips.trim();
    }

    try {
      // Push directly to Firebase Firestore
      const docRef = await addDoc(collection(db, 'interview_feedback'), firestoreData);
      console.log('Feedback submitted to Firestore successfully with ID:', docRef.id);
      
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe confetti fallback
      }

      onSuccess({
        id: docRef.id,
        ...feedbackPayload
      });
    } catch (err: any) {
      console.error('Direct Firestore write error:', err);
      setIsSubmitting(false);
      setFormError('Failed to record feedback to Firestore database: ' + (err.message || 'Permission denied. Please ensure you are logged in with your verified college email.'));
    }
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border-2 border-emerald-500 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 font-sans">Interview Feedback Recorded!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you! Your feedback for <strong className="text-[#FF5722]">{companyInput}</strong> has been stored anonymously to guide future batches.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Anonymous community review submitted</span>
        </div>

        <div className="pt-4 flex items-center justify-center space-x-3">
          <button
            onClick={() => {
              setSubmittedSuccess(false);
              resetAllFormFields();
            }}
            className="px-6 py-3 rounded-xl bg-[#111111] hover:bg-black text-[#FF5722] text-sm font-bold border-2 border-black transition-all cursor-pointer shadow-md"
          >
            Submit Another Round
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =========================================================================
          STICKY COLOURED PROGRESS BAR DISPLAYED RIGHT BELOW THE GRADFLOW TOP BAR
          Dynamically increases color as user scrolls down the feedback form
         ========================================================================= */}
      <div className="sticky top-16 sm:top-[72px] z-30 w-full bg-[#18181B] h-2.5 sm:h-3 overflow-hidden shadow-md">
        <div
          className="h-full bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726] transition-all duration-150 ease-out shadow-[0_0_14px_rgba(255,87,34,0.85)] rounded-r-full"
          style={{ width: `${Math.max(scrollProgress, 0)}%` }}
        />
      </div>

      {/* Main Form Page Container */}
      <div ref={formContainerRef} className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
        {/* Form Header Banner - Sleek Obsidian Black Canvas with Orange Accents */}
        <div className="bg-[#111111] rounded-3xl p-6 sm:p-8 text-white mb-8 border-2 border-black shadow-xl relative overflow-hidden">
          {/* Simple moving particles animation (crisp, zero-glow) */}
          <MovingParticlesBackground variant="card" particleCount={55} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1F1F24] text-[#FF5722] text-xs font-bold mb-2 border border-[#333338]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Anonymous & Secure Submission</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">Interview Experience Recorder</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                11 structured questions designed to thoroughly capture your interview round. Select your answers below.
              </p>
            </div>

            {/* Submission Info Pill */}
            <div className="flex items-center space-x-2.5 bg-[#1F1F24] px-4 py-2.5 rounded-2xl border border-white/10 self-start md:self-auto text-xs text-slate-300 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Campus Career Guidance</span>
            </div>
          </div>
        </div>

        {/* Form Root - Crisp White Card with Bold Black Border */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111]">
          
          {/* Error Alert */}
          {formError && (
            <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-400 text-rose-800 text-sm flex items-start space-x-3 font-semibold">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">{formError}</div>
            </div>
          )}

          {/* =========================================================================
              QUESTION 1: Company Name (Autocomplete from Master List)
             ========================================================================= */}
          <div className="space-y-2 relative" ref={companyWrapperRef}>
            <label className="block text-sm font-bold text-slate-900 flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-[#FF5722]" />
              1. Which company did you interview with?
              <span className="text-[#FF5722] ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={companyInput}
                onChange={(e) => {
                  setCompanyInput(e.target.value);
                  setShowCompanyDropdown(true);
                }}
                onFocus={() => setShowCompanyDropdown(true)}
                placeholder="Search recruiter (e.g. Amazon, Goldman Sachs, Swiggy, TCS, Accenture...)"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#FF5722] text-sm text-slate-900 bg-slate-50/50"
              />
              {companyInput && (
                <button
                  type="button"
                  onClick={() => setCompanyInput('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showCompanyDropdown && filteredCompanies.length > 0 && (
              <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border-2 border-[#111111] max-h-56 overflow-y-auto divide-y divide-slate-100">
                {filteredCompanies.map(comp => (
                  <button
                    type="button"
                    key={comp}
                    onClick={() => {
                      setCompanyInput(comp);
                      setShowCompanyDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-800 hover:bg-[#FFF3E0] hover:text-[#E64A19] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-semibold">{comp}</span>
                    {comp === companyInput && <Check className="w-4 h-4 text-[#FF5722]" />}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-slate-500">Search from top tech recruiters or enter any hiring organization.</p>
          </div>

          {/* =========================================================================
              QUESTION 2: Targeted Role / Profile
             ========================================================================= */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-[#FF5722]" />
              2. What was your targeted role or job profile?
              <span className="text-[#FF5722] ml-1">*</span>
            </label>
            <input
              type="text"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="e.g. Software Development Engineer (SDE-1), Data Analyst, Cloud Engineer..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#FF5722] text-sm text-slate-900 bg-slate-50/50"
            />

            {/* Clickable Quick Role Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTED_ROLES.slice(0, 6).map(role => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setRoleInput(role)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    roleInput === role
                      ? 'bg-[#111111] text-[#FF5722] border-2 border-[#111111] font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================================
              QUESTION 3: Interview Round (NOTHING PRE-SELECTED BY DEFAULT)
             ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-[#FF5722]" />
                3. Which interview round was this?
                <span className="text-[#FF5722] ml-1">*</span>
              </label>
              <span className="text-xs font-mono font-bold text-slate-500">
                {selectedRound ? `Round ${selectedRound} Selected` : 'None Selected'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(roundNum => {
                const isSelected = selectedRound === roundNum;
                return (
                  <button
                    type="button"
                    key={roundNum}
                    onClick={() => setSelectedRound(roundNum as RoundNumber)}
                    className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer min-h-[52px] ${
                      isSelected
                        ? 'bg-[#FFF3E0] border-[#FF5722] text-[#E64A19] font-black shadow-xs ring-2 ring-[#FF5722]/30'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`text-xs uppercase tracking-wider font-bold ${isSelected ? 'text-[#FF5722]' : 'text-slate-500'}`}>
                      Round {roundNum}
                    </div>
                    <div className="text-xs font-bold mt-0.5 truncate">
                      {ROUND_LABELS[roundNum].split(' (')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              QUESTION 4: Round Duration (NOTHING PRE-SELECTED BY DEFAULT)
             ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#FF5722]" />
                4. How long did this interview round last?
                <span className="text-[#FF5722] ml-1">*</span>
              </label>
              <span className="px-3 py-1 rounded-full bg-[#111111] text-[#FF5722] font-mono font-black text-xs border border-black">
                {durationMinutes !== null ? `${durationMinutes} Minutes` : 'None Selected'}
              </span>
            </div>

            {/* Quick Duration Buttons */}
            <div className="flex flex-wrap gap-2 pt-1 pb-1">
              {[15, 30, 45, 60, 90, 120].map(mins => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setDurationMinutes(mins)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 cursor-pointer ${
                    durationMinutes === mins
                      ? 'bg-[#111111] text-[#FF5722] border-black shadow-xs ring-2 ring-[#FF5722]/30'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {mins} mins
                </button>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={durationMinutes || 15}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF5722]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1 mt-1">
                <span>15m (Speed check)</span>
                <span>45m (Standard)</span>
                <span>60m (DSA/System)</span>
                <span>120m (Long composite)</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              QUESTION 5: Overall Difficulty Level (NOTHING PRE-SELECTED BY DEFAULT)
             ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <Gauge className="w-4 h-4 mr-2 text-[#FF5722]" />
                5. What was the overall difficulty level of this round?
                <span className="text-[#FF5722] ml-1">*</span>
              </label>
              <span className="text-xs font-mono font-bold text-slate-500">
                {overallDifficulty ? overallDifficulty : 'None Selected'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full box-border">
              {/* Easy Card */}
              <button
                type="button"
                onClick={() => setOverallDifficulty('Easy')}
                className={`flex-1 p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all cursor-pointer min-h-[44px] ${
                  overallDifficulty === 'Easy'
                    ? 'bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-100 ring-2 ring-emerald-500 font-black'
                    : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full mx-auto mb-1.5 ${overallDifficulty === 'Easy' ? 'bg-emerald-500 ring-2 ring-emerald-300' : 'bg-emerald-300'}`} />
                <div className="font-bold text-sm text-emerald-900">Easy</div>
                <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">Direct & Standard</div>
              </button>

              {/* Medium Card */}
              <button
                type="button"
                onClick={() => setOverallDifficulty('Medium')}
                className={`flex-1 p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all cursor-pointer min-h-[44px] ${
                  overallDifficulty === 'Medium'
                    ? 'bg-[#FFF3E0] border-[#FF5722] shadow-md shadow-orange-100 ring-2 ring-[#FF5722] font-black'
                    : 'bg-white border-slate-200 hover:border-[#FF5722]/50'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full mx-auto mb-1.5 ${overallDifficulty === 'Medium' ? 'bg-[#FF5722] ring-2 ring-orange-300' : 'bg-orange-300'}`} />
                <div className="font-bold text-sm text-[#E64A19]">Medium</div>
                <div className="text-[11px] text-[#FF5722] mt-0.5 font-medium">Moderate twists</div>
              </button>

              {/* Hard Card */}
              <button
                type="button"
                onClick={() => setOverallDifficulty('Hard')}
                className={`flex-1 p-3.5 sm:p-4 rounded-2xl border-2 text-center transition-all cursor-pointer min-h-[44px] ${
                  overallDifficulty === 'Hard'
                    ? 'bg-rose-50 border-rose-600 shadow-md shadow-rose-100 ring-2 ring-rose-600 font-black'
                    : 'bg-white border-slate-200 hover:border-rose-300'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full mx-auto mb-1.5 ${overallDifficulty === 'Hard' ? 'bg-rose-500 ring-2 ring-rose-300' : 'bg-rose-300'}`} />
                <div className="font-bold text-sm text-rose-900">Hard</div>
                <div className="text-[11px] text-rose-700 mt-0.5 font-medium">High stress / deep edge cases</div>
              </button>
            </div>
          </div>

          {/* =========================================================================
              QUESTION 6: Panel Type / Interviewer Background (NOTHING PRE-SELECTED)
             ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <Users className="w-4 h-4 mr-2 text-[#FF5722]" />
                6. Who was on your interview panel? (Select all that apply)
                <span className="text-[#FF5722] ml-1">*</span>
              </label>
              <span className="text-xs font-mono font-bold text-slate-500">
                {selectedPanels.length > 0 ? `${selectedPanels.length} Selected` : 'None Selected'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {PANEL_TYPES.map(panel => {
                const isSelected = selectedPanels.includes(panel);
                return (
                  <button
                    type="button"
                    key={panel}
                    onClick={() => togglePanel(panel)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border-2 flex items-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#111111] text-[#FF5722] border-[#111111] shadow-xs ring-2 ring-[#FF5722]/30'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 mr-1.5 text-[#FF5722]" />}
                    {panel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              QUESTION 7: Question Style Distribution (0% BY DEFAULT - NOTHING PRE-SELECTED)
             ========================================================================= */}
          <div className="space-y-4 rounded-2xl border-2 border-[#111111] bg-slate-50/70 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 pb-3">
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center">
                  <PieChart className="w-4 h-4 mr-2 text-[#FF5722]" />
                  7. Question Style Distribution & Section Difficulty
                  <span className="text-[#FF5722] ml-1">*</span>
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adjust sliders to reflect round weightage. Must equal exactly 100%.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg font-mono ${
                    isPercentValid
                      ? 'bg-[#111111] text-[#FF5722] border-2 border-[#FF5722]'
                      : 'bg-rose-100 text-rose-800 border-2 border-rose-300'
                  }`}
                >
                  Total: {totalPercent}%
                </span>
                {!isPercentValid && (
                  <button
                    type="button"
                    onClick={autoBalanceSliders}
                    className="text-xs px-3 py-1 rounded-lg bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold transition-colors cursor-pointer"
                  >
                    Auto-Balance
                  </button>
                )}
              </div>
            </div>

            {/* Quick Distribution Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Quick Presets:</span>
              <button
                type="button"
                onClick={() => setPresetDistribution(70, 15, 15)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#FF5722] text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Coding Heavy (70/15/15)
              </button>
              <button
                type="button"
                onClick={() => setPresetDistribution(40, 30, 30)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#FF5722] text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Balanced (40/30/30)
              </button>
              <button
                type="button"
                onClick={() => setPresetDistribution(20, 20, 60)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#FF5722] text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Aptitude / Core (20/20/60)
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-center w-full box-border">
              {/* 3 Interactive Category Sliders */}
              <div className="w-full lg:flex-1 space-y-4">
                {/* Category A: Programming & Technical Knowledge */}
                <div className="space-y-1.5 bg-white p-3.5 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Programming & Technical Knowledge</span>
                    <span className="font-mono font-black text-[#FF5722] text-sm">{techPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={techPercent}
                    onChange={(e) => setTechPercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF5722]"
                  />
                  {techPercent > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Section Difficulty:</span>
                      <div className="flex space-x-1">
                        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => setTechDiff(d)}
                            className={`text-[10px] px-2.5 py-1 rounded-md font-bold border transition-colors cursor-pointer min-h-[32px] ${
                              techDiff === d
                                ? 'bg-[#FF5722] text-white border-[#FF5722]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category B: AI, Vibe Coding & Efficiency Tools */}
                <div className="space-y-1.5 bg-white p-3.5 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">AI, Vibe Coding & Efficiency Tools</span>
                    <span className="font-mono font-black text-[#111111] text-sm">{aiPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={aiPercent}
                    onChange={(e) => setAiPercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
                  />
                  {aiPercent > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Section Difficulty:</span>
                      <div className="flex space-x-1">
                        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => setAiDiff(d)}
                            className={`text-[10px] px-2.5 py-1 rounded-md font-bold border transition-colors cursor-pointer min-h-[32px] ${
                              aiDiff === d
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category C: Aptitude & Brain Testing */}
                <div className="space-y-1.5 bg-white p-3.5 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Aptitude & Core Fundamentals</span>
                    <span className="font-mono font-black text-[#FFA726] text-sm">{aptitudePercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={aptitudePercent}
                    onChange={(e) => setAptitudePercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FFA726]"
                  />
                  {aptitudePercent > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Section Difficulty:</span>
                      <div className="flex space-x-1">
                        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => setAptitudeDiff(d)}
                            className={`text-[10px] px-2.5 py-1 rounded-md font-bold border transition-colors cursor-pointer min-h-[32px] ${
                              aptitudeDiff === d
                                ? 'bg-[#FFA726] text-white border-[#FFA726]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Chart.js Doughnut Preview */}
              <div className="w-full lg:w-64 bg-white p-4 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center shrink-0">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                  Live Doughnut Preview
                </span>
                <div className="w-40 h-40 relative">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
                {!isAnyPercentSet && (
                  <span className="text-[11px] text-slate-400 mt-2 text-center">
                    Move sliders to see live breakdown
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =========================================================================
              QUESTION 8: Specific Topics Tested (NOTHING PRE-SELECTED BY DEFAULT)
             ========================================================================= */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center">
                  <ListChecks className="w-4 h-4 mr-2 text-[#FF5722]" />
                  8. Which specific topics were asked during this round?
                  <span className="text-[#FF5722] ml-1">*</span>
                </label>
                <p className="text-xs text-slate-500">
                  50-topic checklist categorized across 7 tabs. Click any category to expand and select.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={toggleAllCategories}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {allExpanded ? 'Collapse All' : 'Expand All'}
                </button>
                <span className="px-3 py-1 rounded-full bg-[#111111] border border-black text-[#FF5722] text-xs font-black">
                  {selectedTopics.length} Topics Selected
                </span>
              </div>
            </div>

            {/* Quick Search inside the 50 topics */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
                placeholder="Quick search across all 50 topics (e.g., Arrays, Heaps, Redis, Docker, Prompting, SQL)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            {/* Collapsible Category Cards */}
            <div className="space-y-2.5 pt-1">
              {TOPIC_CATEGORIES.map(category => {
                const isExpanded = Boolean(expandedCategories[category.id] || topicSearchQuery || allExpanded);
                const visibleTopics = category.topics.filter(t => 
                  !topicSearchQuery || t.toLowerCase().includes(topicSearchQuery.toLowerCase())
                );

                if (topicSearchQuery && visibleTopics.length === 0) return null;

                const selectedInCat = category.topics.filter(t => selectedTopics.includes(t)).length;

                return (
                  <div key={category.id} className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {/* Category Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategoryExpand(category.id)}
                      className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xs font-bold text-slate-900">{category.name}</span>
                        {selectedInCat > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FF5722] text-white text-[10px] font-black">
                            {selectedInCat} selected
                          </span>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      )}
                    </button>

                    {/* Category Topics Chips */}
                    {isExpanded && (
                      <div className="p-3.5 bg-white flex flex-wrap gap-2 border-t-2 border-slate-100">
                        {visibleTopics.map(topic => {
                          const isSelected = selectedTopics.includes(topic);
                          return (
                            <button
                              type="button"
                              key={topic}
                              onClick={() => toggleTopic(topic)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 flex items-center text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FFF3E0] border-[#FF5722] text-[#E64A19] font-black shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <span className={`w-3.5 h-3.5 mr-1.5 rounded-xs flex items-center justify-center border text-[9px] ${
                                isSelected ? 'bg-[#FF5722] text-white border-[#FF5722]' : 'border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </span>
                              {topic}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              QUESTION 9: Specific Coding or Technical Questions (OPTIONAL)
             ========================================================================= */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <Code2 className="w-4 h-4 mr-2 text-[#FF5722]" />
                9. Specific Coding Problems or Technical Questions
                <span className="text-xs font-normal text-slate-400 ml-2">(Optional)</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">{technicalQuestions.length}/1000</span>
            </div>
            <textarea
              rows={3}
              maxLength={1000}
              value={technicalQuestions}
              onChange={(e) => setTechnicalQuestions(e.target.value)}
              placeholder="Share specific coding challenges, SQL queries, system design prompts, or tricky edge cases asked by the panel..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#FF5722] text-sm text-slate-900 bg-slate-50/50"
            />
          </div>

          {/* =========================================================================
              QUESTION 10: Behavioral & HR Questions (OPTIONAL)
             ========================================================================= */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-[#FF5722]" />
                10. HR, Situational & Behavioral Questions Asked
                <span className="text-xs font-normal text-slate-400 ml-2">(Optional)</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">{hrQuestions.length}/1000</span>
            </div>
            <textarea
              rows={3}
              maxLength={1000}
              value={hrQuestions}
              onChange={(e) => setHrQuestions(e.target.value)}
              placeholder="e.g. Leadership principles, conflict resolution, why this company, willingness to relocate, project challenges..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#FF5722] text-sm text-slate-900 bg-slate-50/50"
            />
          </div>

          {/* =========================================================================
              QUESTION 11: Tips & Advice for Juniors (OPTIONAL)
             ========================================================================= */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2 text-[#FF5722]" />
                11. Tips, Warnings & Preparation Advice for Juniors
                <span className="text-xs font-normal text-slate-400 ml-2">(Optional)</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">{juniorTips.length}/1000</span>
            </div>
            <textarea
              rows={3}
              maxLength={1000}
              value={juniorTips}
              onChange={(e) => setJuniorTips(e.target.value)}
              placeholder="Key resources to prepare, mistakes to avoid, topics the panel spent maximum time grilling on..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#FF5722] text-sm text-slate-900 bg-slate-50/50"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
              <span>Submitted anonymously under student account: <strong>{userProfile?.collegeDomain ? `@${userProfile.collegeDomain}` : 'Verified College Student'}</strong></span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-black text-base shadow-xl shadow-[#FF5722]/30 transition-all hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Pushing to Firestore...</span>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  <span>Submit Anonymous Feedback</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
