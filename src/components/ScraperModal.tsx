import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  Play, 
  Database,
  ArrowRight,
  Code
} from 'lucide-react';

interface ScraperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerScrape: () => void;
  isScraping: boolean;
}

export const ScraperModal: React.FC<ScraperModalProps> = ({
  isOpen,
  onClose,
  onTriggerScrape,
  isScraping
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'github-action' | 'standalone-script' | 'secrets'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const githubActionYaml = `name: Midnight Opportunity Scraper & AI Summarizer

on:
  schedule:
    # Trigger every midnight at 00:00 UTC (05:30 IST)
    - cron: '0 0 * * *'
  workflow_dispatch: # Allows manual trigger from GitHub UI

jobs:
  scrape-and-summarize:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Execute Midnight Scraper
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
          FIREBASE_SERVICE_ACCOUNT_KEY: \${{ secrets.FIREBASE_SERVICE_ACCOUNT_KEY }}
          SCRAPER_API_KEY: \${{ secrets.SCRAPER_API_KEY }}
        run: npx tsx scripts/midnight-scraper.ts`;

  const standaloneScriptCode = `import { GoogleGenAI } from '@google/genai';
import admin from 'firebase-admin';

// Initialize Firebase Admin with Service Account Secret
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

// Initialize Gemini 1.5 Flash SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runMidnightScraper() {
  console.log('1. Fetching raw feeds from Unstop, Devpost & Adzuna...');
  const rawEvents = [
    { source: 'Devpost', rawText: 'HackBangalore 2027: 36hr national hackathon with INR 2L prize pool...' },
    { source: 'Unstop', rawText: 'TCS CodeVita Season 14 - Global coding contest for 2026/2027 graduates...' }
  ];

  for (const item of rawEvents) {
    console.log(\`2. Calling Gemini 1.5 Flash to summarize \${item.source}...\`);
    const prompt = \`Extract structured JSON for placement portal:
    Raw Input: \${item.rawText}
    Output schema: { title, provider, type, link, deadline, requiredSkills, descriptionSummary, stipendOrPrize }\`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');

    console.log('3. Writing summarized record to Firestore opportunities collection...');
    await db.collection('opportunities').add({
      ...parsed,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
  console.log('Midnight scrape finished successfully.');
}

runMidnightScraper().catch(console.error);`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">
                Midnight Opportunity Scraper & AI Summarizer
              </h3>
              <p className="text-xs text-slate-400">
                Specification, GitHub Actions Cron (0 0 * * *), and Zero-Leak Security Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-nav Tabs */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex space-x-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-[#FF5722] text-[#FF5722] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Pipeline Architecture
          </button>
          <button
            onClick={() => setActiveTab('github-action')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'github-action'
                ? 'border-[#FF5722] text-[#FF5722] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            GitHub Action (.github/workflows/scraper.yml)
          </button>
          <button
            onClick={() => setActiveTab('standalone-script')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'standalone-script'
                ? 'border-[#FF5722] text-[#FF5722] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Standalone Script (scripts/midnight-scraper.ts)
          </button>
          <button
            onClick={() => setActiveTab('secrets')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'secrets'
                ? 'border-[#FF5722] text-[#FF5722] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Enterprise Secrets Protocol
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* TAB 1: Pipeline Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-sky-600" />
                  Execution Flow (Triggered Every Midnight: 00:00 UTC)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                      1
                    </span>
                    <div className="font-bold text-slate-800">Cron Dispatch</div>
                    <div className="text-[11px] text-slate-500 mt-1">Midnight low-traffic serverless trigger</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                      2
                    </span>
                    <div className="font-bold text-slate-800">API Scraping</div>
                    <div className="text-[11px] text-slate-500 mt-1">Pull Unstop, Devpost, Adzuna feeds</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-[#E64A19] font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                      3
                    </span>
                    <div className="font-bold text-slate-800">Gemini AI Summary</div>
                    <div className="text-[11px] text-slate-500 mt-1">Extract title, skills, deadline JSON</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                      4
                    </span>
                    <div className="font-bold text-slate-800">Firestore Write</div>
                    <div className="text-[11px] text-slate-500 mt-1">Populate opportunities collection</div>
                  </div>
                </div>
              </div>

              {/* Live In-App Trigger */}
              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Test-Drive the Scraper in Preview Mode</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Execute a simulated scrape cycle with Gemini AI right now without waiting for midnight.
                  </div>
                </div>
                <button
                  onClick={onTriggerScrape}
                  disabled={isScraping}
                  className="px-4 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs ring-4 ring-[#FF5722]/20 shadow-md shadow-[#FF5722]/30 transition-all shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  {isScraping ? 'Summarizer Running...' : 'Run Scraper Simulation'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GitHub Action */}
          {activeTab === 'github-action' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-600 text-xs">.github/workflows/scraper.yml</span>
                <button
                  onClick={() => copyToClipboard('gha', githubActionYaml)}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
                >
                  {copiedKey === 'gha' ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedKey === 'gha' ? 'Copied' : 'Copy YAML'}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed">
                {githubActionYaml}
              </pre>
            </div>
          )}

          {/* TAB 3: Standalone Script */}
          {activeTab === 'standalone-script' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-600 text-xs">scripts/midnight-scraper.ts</span>
                <button
                  onClick={() => copyToClipboard('script', standaloneScriptCode)}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
                >
                  {copiedKey === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedKey === 'script' ? 'Copied' : 'Copy TypeScript'}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed">
                {standaloneScriptCode}
              </pre>
            </div>
          )}

          {/* TAB 4: Enterprise Secrets Protocol */}
          {activeTab === 'secrets' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Zero-Secrets-In-Repo Enforcement Policy
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Private API keys, GitHub tokens, and Firebase Admin credentials must NEVER be committed to Git or bundled into the React frontend.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Configuring GitHub Repository Secrets:
                </div>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="p-3 flex items-start justify-between">
                    <div>
                      <div className="font-mono font-bold text-[#FF5722] text-xs">GEMINI_API_KEY</div>
                      <div className="text-[11px] text-slate-500">Google Gemini API key for structured opportunity summaries.</div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">Action Secret</span>
                  </div>

                  <div className="p-3 flex items-start justify-between">
                    <div>
                      <div className="font-mono font-bold text-[#FF5722] text-xs">FIREBASE_SERVICE_ACCOUNT_KEY</div>
                      <div className="text-[11px] text-slate-500">Service account private key JSON for serverless Firestore batch writes.</div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">Action Secret</span>
                  </div>

                  <div className="p-3 flex items-start justify-between">
                    <div>
                      <div className="font-mono font-bold text-[#FF5722] text-xs">GH_PAT</div>
                      <div className="text-[11px] text-slate-500">GitHub Personal Access Token for scheduled repository workflows.</div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">Action Secret</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
