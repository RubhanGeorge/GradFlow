import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingHome } from './components/LandingHome';
import { Dashboard } from './components/Dashboard';
import { FeedbackForm } from './components/FeedbackForm';
import { OpportunitiesFeed } from './components/OpportunitiesFeed';
import { FAQPage } from './components/FAQPage';
import { AuthModal } from './components/AuthModal';
import { ScraperModal } from './components/ScraperModal';
import { AdminDevModal } from './components/AdminDevModal';
import { INITIAL_OPPORTUNITIES } from './data/seedData';
import { BOT_SEED_FEEDBACKS } from './data/expandedBotSeeds';
import { seedBotFeedbacks } from './services/adminService';
import { InterviewFeedback, Opportunity } from './types';
import { db, testFirebaseConnection } from './firebase/config';
import { collection, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  CheckCircle2, 
  RefreshCw,
  School,
  GraduationCap,
  Database,
  ShieldCheck
} from 'lucide-react';

const MainApp: React.FC = () => {
  const { isAuthorizedDomain } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'feedback' | 'opportunities' | 'faq'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalReason, setAuthModalReason] = useState<string | undefined>(undefined);
  const [isScraperModalOpen, setIsScraperModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Automatically scroll to the top of the page when navigating between views
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  // Live state
  const [feedbacks, setFeedbacks] = useState<InterviewFeedback[]>(BOT_SEED_FEEDBACKS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  const openAuthWithReason = useCallback((reason?: string) => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  }, []);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Connect to Firestore & listen to changes
  useEffect(() => {
    testFirebaseConnection();

    // Listen to interview_feedback collection
    try {
      const feedbackQuery = query(collection(db, 'interview_feedback'));
      let hasCheckedInitial = false;
      const unsubscribe = onSnapshot(
        feedbackQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const liveList: InterviewFeedback[] = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            } as InterviewFeedback));
            setFeedbacks(liveList);
          } else {
            if (!hasCheckedInitial) {
              hasCheckedInitial = true;
              // Seed once into Firestore if completely empty
              seedBotFeedbacks().then(res => {
                if (!res.success) {
                  setFeedbacks(BOT_SEED_FEEDBACKS);
                }
              });
            } else {
              setFeedbacks([]);
            }
          }
        },
        (err) => {
          console.warn('Live feedback subscription notice:', err.message);
          setFeedbacks(BOT_SEED_FEEDBACKS);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore subscription initialized in fallback mode');
    }
  }, []);

  // Listen to opportunities collection
  useEffect(() => {
    try {
      const oppQuery = query(collection(db, 'opportunities'));
      const unsubscribeOpp = onSnapshot(
        oppQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const liveOpps: Opportunity[] = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            } as Opportunity));
            setOpportunities([...liveOpps, ...INITIAL_OPPORTUNITIES.filter(s => !liveOpps.some(l => l.title === s.title))]);
          }
        },
        (err) => {
          console.warn('Opportunities listener notice:', err.message);
        }
      );
      return () => unsubscribeOpp();
    } catch (e) {
      console.warn('Opportunities initialized in fallback mode');
    }
  }, []);

  // Trigger manual simulation of Midnight Scraper
  const handleTriggerScrape = () => {
    setIsScraping(true);
    showToast('Midnight Scraper initiated: Querying Unstop & Devpost endpoints...', 'info');

    setTimeout(() => {
      const newScrapedOpportunity: Opportunity = {
        id: `scraped-${Date.now()}`,
        title: 'Cred - Summer 2027 Backend Product Engineering Intern',
        provider: 'Cred Careers Portal (Bangalore)',
        type: 'Internship',
        link: 'https://careers.cred.club',
        deadline: '2026-12-31',
        location: 'Indiranagar, Bangalore (Onsite)',
        requiredSkills: ['Go / Java', 'Redis', 'High Concurrency', 'Distributed Systems'],
        descriptionSummary: 'High-density backend engineering opportunity working on high throughput ledger settlement microservices with sub-5ms SLAs.',
        stipendOrPrize: 'INR 1,25,000 / month',
        createdAt: new Date().toISOString()
      };

      setOpportunities(prev => [newScrapedOpportunity, ...prev]);
      setIsScraping(false);
      showToast('Midnight Scraper completed! Gemini AI summarized 1 new listing from Bangalore tech radar.', 'success');

      // Attempt Firestore write
      try {
        addDoc(collection(db, 'opportunities'), {
          ...newScrapedOpportunity,
          createdAt: serverTimestamp()
        });
      } catch (e) {
        // Safe fallback
      }
    }, 2000);
  };

  const handleFeedbackSuccess = (newFeedback?: InterviewFeedback) => {
    if (newFeedback) {
      setFeedbacks(prev => [newFeedback, ...prev]);
    }
    showToast('Your interview experience has been submitted anonymously! Updating live dashboard charts...', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] flex flex-col font-sans antialiased selection:bg-[#FF5722] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 text-xs font-semibold ${
            toastMessage.type === 'success' 
              ? 'bg-[#111111] text-white border-2 border-[#FF5722]' 
              : 'bg-[#1A1A1E] text-orange-200 border border-orange-500'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
            ) : (
              <RefreshCw className="w-4 h-4 text-[#FFA726] animate-spin shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => openAuthWithReason()}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-24 md:pb-16 w-full box-border">
        {activeTab === 'home' && (
          <LandingHome
            onNavigate={(tab) => setActiveTab(tab)}
            openAuthModal={() => openAuthWithReason()}
            totalFeedbacksCount={feedbacks.length}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            feedbacks={feedbacks}
            openSubmitForm={() => setActiveTab('feedback')}
          />
        )}

        {activeTab === 'feedback' && (
          <FeedbackForm
            onSuccess={handleFeedbackSuccess}
            openAuthModal={(reason) => openAuthWithReason(reason)}
          />
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesFeed
            opportunities={opportunities}
            onTriggerScrape={handleTriggerScrape}
            isScraping={isScraping}
            openScraperModal={() => setIsScraperModalOpen(true)}
          />
        )}

        {activeTab === 'faq' && (
          <FAQPage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthModalReason(undefined);
        }}
        reasonMessage={authModalReason}
      />

      <ScraperModal
        isOpen={isScraperModalOpen}
        onClose={() => setIsScraperModalOpen(false)}
        onTriggerScrape={handleTriggerScrape}
        isScraping={isScraping}
      />

      <AdminDevModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        feedbacks={feedbacks}
      />

      {/* Institutional High-Contrast Black & Orange Footer */}
      <footer className="border-t-2 border-black bg-[#111111] py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              className="flex items-center space-x-2.5 text-white font-bold cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF5722] to-[#FFA726] flex items-center justify-center text-white shadow-md shadow-[#FF5722]/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-sm font-sans tracking-tight font-black">GradFlow</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#222226] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              100% Student-Powered Placement Intelligence across 50 authorized Bangalore institutions.
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="text-slate-300 hover:text-[#FF5722] font-semibold transition-colors duration-200 cursor-pointer min-h-[36px] flex items-center"
              >
                Analytics
              </button>
              <button 
                onClick={() => setActiveTab('feedback')}
                className="text-slate-300 hover:text-[#FF5722] font-semibold transition-colors duration-200 cursor-pointer min-h-[36px] flex items-center"
              >
                Submit Review
              </button>
              <button 
                onClick={() => setActiveTab('opportunities')}
                className="text-slate-300 hover:text-[#FF5722] font-semibold transition-colors duration-200 cursor-pointer min-h-[36px] flex items-center"
              >
                Radar
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
