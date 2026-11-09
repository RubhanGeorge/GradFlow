import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Database, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Check, 
  Bot,
  UserCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { 
  purgeBotFeedbacks, 
  seedBotFeedbacks, 
  syncWhitelistedDomains, 
  addCustomDomain,
  toggleDomainStatus
} from '../services/adminService';
import { useAuth } from '../context/AuthContext';
import { InterviewFeedback } from '../types';

interface AdminDevModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbacks: InterviewFeedback[];
  onRefreshData?: () => void;
}

export const AdminDevModal: React.FC<AdminDevModalProps> = ({
  isOpen,
  onClose,
  feedbacks,
  onRefreshData
}) => {
  const { whitelistedEntries, whitelistDomains } = useAuth();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // New domain form
  const [newDomain, setNewDomain] = useState('');
  const [newCollegeName, setNewCollegeName] = useState('');

  if (!isOpen) return null;

  const botCount = feedbacks.filter(f => f.feedbackType === 'bot').length;
  const userCount = feedbacks.filter(f => f.feedbackType === 'user' || (!f.feedbackType && !f.id?.startsWith('bot-'))).length;

  const handlePurgeBots = async () => {
    if (!window.confirm(`Are you sure you want to purge all mock/bot interview feedbacks from Firestore? This will delete all records with feedbackType == "bot".`)) {
      return;
    }
    setLoadingAction('purge');
    setStatusMessage({ type: 'info', text: 'Executing batch purge query: where("feedbackType", "==", "bot")...' });

    try {
      const result = await purgeBotFeedbacks();
      if (result.error) {
        setStatusMessage({ type: 'error', text: `Purge notice: ${result.error}` });
      } else {
        setStatusMessage({ 
          type: 'success', 
          text: `Successfully purged ${result.deletedCount} bot feedback records from Firestore database.` 
        });
        if (onRefreshData) onRefreshData();
      }
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || 'Purge failed' });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSeedBots = async () => {
    setLoadingAction('seed');
    setStatusMessage({ type: 'info', text: 'Pushing 100+ authentic interview feedback rounds across 20 recruiters to Firestore...' });

    try {
      const result = await seedBotFeedbacks();
      if (!result.success) {
        setStatusMessage({ type: 'error', text: `Seed notice: ${result.error}` });
      } else {
        setStatusMessage({ 
          type: 'success', 
          text: `Successfully seeded ${result.count} comprehensive bot feedback records into Firestore!` 
        });
        if (onRefreshData) onRefreshData();
      }
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || 'Seeding failed' });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSyncWhitelist = async () => {
    setLoadingAction('sync');
    setStatusMessage({ type: 'info', text: 'Syncing 50 official Bangalore college domains into collection "whitelisted_domains"...' });

    try {
      const result = await syncWhitelistedDomains();
      if (result.error) {
        setStatusMessage({ type: 'error', text: `Sync notice: ${result.error}` });
      } else {
        setStatusMessage({ 
          type: 'success', 
          text: `Successfully synced ${result.count} institutional domains into Firestore dynamic whitelist.` 
        });
      }
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || 'Sync failed' });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim() || !newCollegeName.trim()) return;

    setLoadingAction('addDomain');
    try {
      const success = await addCustomDomain(newDomain.trim(), newCollegeName.trim());
      if (success) {
        setStatusMessage({ 
          type: 'success', 
          text: `Domain @${newDomain.trim().toLowerCase()} successfully added to Firestore whitelisted_domains!` 
        });
        setNewDomain('');
        setNewCollegeName('');
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to write domain to Firestore' });
      }
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || 'Failed to add domain' });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0F0F12] border-2 border-[#27272A] rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] text-white overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#27272A] bg-[#141418] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black tracking-tight text-white font-sans">
                  Placement Intelligence & Firestore Admin
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF5722] text-white font-black">
                  DEV CONTROLS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Firestore collections: <code className="text-[#FFA726] font-mono font-bold">interview_feedback</code> &amp; <code className="text-[#FFA726] font-mono font-bold">whitelisted_domains</code>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#202026] hover:bg-[#2A2A32] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Status Alert Banner */}
          {statusMessage && (
            <div className={`p-4 rounded-2xl border flex items-start space-x-3 text-xs font-semibold animate-in slide-in-from-top duration-200 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300' 
                : statusMessage.type === 'error'
                ? 'bg-rose-950/60 border-rose-600/60 text-rose-300'
                : 'bg-amber-950/60 border-amber-600/60 text-amber-300'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : statusMessage.type === 'error' ? (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              ) : (
                <RefreshCw className="w-4 h-4 shrink-0 text-amber-400 mt-0.5 animate-spin" />
              )}
              <div className="flex-1">{statusMessage.text}</div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#18181D] border border-[#27272A] p-3.5 rounded-2xl">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Total Feedbacks</span>
              <span className="text-2xl font-black text-white font-mono">{feedbacks.length}</span>
            </div>
            <div className="bg-[#18181D] border border-[#27272A] p-3.5 rounded-2xl">
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block flex items-center">
                <UserCheck className="w-3.5 h-3.5 mr-1" /> User Submissions
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{userCount}</span>
            </div>
            <div className="bg-[#18181D] border border-[#27272A] p-3.5 rounded-2xl">
              <span className="text-[11px] text-[#FFA726] font-bold uppercase tracking-wider block flex items-center">
                <Bot className="w-3.5 h-3.5 mr-1" /> Bot Mock Records
              </span>
              <span className="text-2xl font-black text-[#FFA726] font-mono">{botCount}</span>
            </div>
            <div className="bg-[#18181D] border border-[#27272A] p-3.5 rounded-2xl">
              <span className="text-[11px] text-sky-400 font-bold uppercase tracking-wider block flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Dynamic Domains
              </span>
              <span className="text-2xl font-black text-sky-400 font-mono">{whitelistDomains.length}</span>
            </div>
          </div>

          {/* Action 1: Task #4 Bot Dataset & Maintenance Controls */}
          <div className="bg-[#141418] border border-[#27272A] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-[#FF5722]" />
                <h3 className="font-bold text-white text-base">Bot Mock Feedback Controls (Task #4)</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">20 Bangalore Recruiters</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintain realistic test interview experiences across 20 top tech recruiters (Amazon, Goldman Sachs, Swiggy, Cred, Razorpay, Google, Microsoft, Flipkart, etc.). All mock records have <code className="text-[#FFA726] font-mono">feedbackType: "bot"</code>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleSeedBots}
                disabled={loadingAction !== null}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#E64A19] hover:from-[#FF7043] hover:to-[#FF5722] text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#FF5722]/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Seed 100+ Recruiter Mock Feedbacks</span>
              </button>

              <button
                type="button"
                onClick={handlePurgeBots}
                disabled={loadingAction !== null}
                className="py-3 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-rose-300 font-black text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Purge Bot Feedbacks (`purgeBotFeedbacks`)</span>
              </button>
            </div>
          </div>

          {/* Action 2: Task #1 Dynamic Whitelisted Domains Store */}
          <div className="bg-[#141418] border border-[#27272A] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Dynamic Firestore Domain Store (Task #1)</h3>
              </div>
              <button
                type="button"
                onClick={handleSyncWhitelist}
                disabled={loadingAction !== null}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#333338] text-white font-bold transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingAction === 'sync' ? 'animate-spin' : ''}`} />
                <span>Sync 50 Bangalore Colleges</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              The authorization module dynamically checks the Firestore collection <code className="text-emerald-400 font-mono">whitelisted_domains</code> during user login/signup. Personal emails (<code className="text-rose-400 font-mono">@gmail.com</code>, <code className="text-rose-400 font-mono">@yahoo.com</code>) are strictly rejected.
            </p>

            {/* Quick Add Custom Domain */}
            <form onSubmit={handleAddDomain} className="bg-[#1C1C22] p-3.5 rounded-xl border border-[#27272A] space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Add Custom Institutional Domain:</span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="e.g. nitk.edu.in"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#121215] border border-[#333338] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5722]"
                />
                <input
                  type="text"
                  value={newCollegeName}
                  onChange={(e) => setNewCollegeName(e.target.value)}
                  placeholder="e.g. NIT Karnataka"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#121215] border border-[#333338] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5722]"
                />
                <button
                  type="submit"
                  disabled={loadingAction !== null || !newDomain || !newCollegeName}
                  className="px-4 py-2 rounded-lg bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Domain</span>
                </button>
              </div>
            </form>

            {/* Whitelist Preview Pills */}
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {whitelistedEntries.slice(0, 16).map(entry => (
                  <div key={entry.domain} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#1C1C22] border border-[#27272A] text-xs">
                    <span className="font-mono text-emerald-400 font-bold truncate">@{entry.domain}</span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[140px] ml-2">{entry.collegeName}</span>
                  </div>
                ))}
              </div>
              {whitelistedEntries.length > 16 && (
                <div className="text-center pt-1 text-[11px] text-slate-400">
                  + {whitelistedEntries.length - 16} additional authorized Bangalore college domains active in Firestore
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141418] border-t border-[#27272A] flex items-center justify-between text-xs text-slate-400">
          <span>Database ID: <code className="font-mono text-[#FF5722]">ai-studio-ad099c6c</code></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#333338] text-white font-bold transition-colors cursor-pointer"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
