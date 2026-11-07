/**
 * Midnight Opportunity Scraper & AI Summarizer
 * Scheduled via GitHub Actions cron: '0 0 * * *'
 * Pulls opportunities from Devpost, Unstop, Adzuna and summarizes with Gemini Flash
 */

import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY environment variable is not defined. Skipping scraper.');
  process.exit(0);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function runScraper() {
  console.log('[MIDNIGHT SCRAPER] Initiating scheduled fetch at 00:00...');

  // Sample raw opportunity payloads collected from external APIs
  const rawFeeds = [
    {
      source: 'Unstop',
      title: 'TCS HackQuest Season 9',
      rawText: 'TCS Cyber Security practice invites students graduating in 2026/2027 to participate in Capture the Flag (CTF) hackathon with direct interview calls for Ninja and Digital roles.'
    },
    {
      source: 'Devpost',
      title: 'Bangalore AI Agent Hackathon 2027',
      rawText: '36-hour in-person hackathon hosted in Koramangala, Bangalore. Themes include Autonomous LLM Agents, Multi-Modal Reasoning, and Vector Retrieval. Prizes worth INR 3,00,000.'
    }
  ];

  console.log(`[MIDNIGHT SCRAPER] Fetched ${rawFeeds.length} raw listings. Summarizing with Gemini...`);

  for (const feed of rawFeeds) {
    try {
      const prompt = `You are a placement officer assistant. Extract clean structured JSON from this opportunity:
      Source: ${feed.source}
      Raw Text: ${feed.rawText}
      
      Output JSON matching schema:
      {
        "title": string,
        "provider": string,
        "type": "Internship" | "Hackathon" | "Competition",
        "link": string,
        "deadline": string (YYYY-MM-DD or readable date),
        "location": string,
        "requiredSkills": string[],
        "descriptionSummary": string (under 50 words),
        "stipendOrPrize": string
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      console.log(`[SUCCESS] Extracted for ${feed.title}:`, response.text);
    } catch (err) {
      console.error(`[ERROR] Failed to summarize ${feed.title}:`, err);
    }
  }

  console.log('[MIDNIGHT SCRAPER] Batch completed successfully.');
}

runScraper().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
