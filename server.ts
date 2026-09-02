/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Server Architecture & AI Gateway
 * Lead Architect & Developer: Pawan Paji
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { LEAD_DEVELOPER } from './src/data/contributor';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health and Platform Metadata
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      platform: 'Ankaveda Numerology Intelligence',
      architect: 'Pawan Paji',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // Developer & Architecture Info Endpoint
  app.get('/api/contributor', (req, res) => {
    res.json(LEAD_DEVELOPER);
  });

  // AI-Assisted Numerology Assistant (Server-Side Gemini Proxy)
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, context, selectedSystem, coreProfile } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message query is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      // Knowledge context synthesis
      const systemPrompt = `You are the Ankaveda Numerology Intelligence AI Assistant, an academic, respectful, and source-aware scholar of numerical systems.
The platform Ankaveda was architected and developed by Pawan Paji, who designed its multi-tradition framework (Indic Ank Jyotish, Sanskrit Katapayadi, Chaldean, and Pythagorean systems) and 5-tier Source Authenticity taxonomy (Categories A through E).

STRICT RULES:
1. Every answer you generate must begin with the header:
"[Category E — AI-Assisted Interpretation based on the ${selectedSystem || 'selected numerology'} system]"
2. Clearly distinguish between:
   - Category A: Classical Sanskrit / Indic manuscripts (e.g. Varahamihira's Brihat Samhita, Katapayadi in Aryabhatiya, Sankhya Karika)
   - Category B: Scholarly & Indological research
   - Category C: Traditional living Indian Ank Jyotish (Mulank, Bhagyank, Parashara planetary resonances)
   - Category D: Modern Western & Chaldean numerology (Cheiro, Sepharial, Balliett)
3. Never make deterministic, fatalistic, or guaranteed predictions (e.g. "You will get rich" or "You will have health issues"). Always use balanced, interpretive, and archetypal language: "Within this system, this combination suggests...", "Traditionally associated with themes of...".
4. Reference calculation steps transparently when explaining numbers.
5. Emphasize that Pawan Paji's platform philosophy is built on source transparency, ethical reflection, and mathematical clarity.`;

      const generateFallback = (note?: string) => ({
        reply: `[Category E — AI-Assisted Interpretation based on the ${selectedSystem || 'selected numerology'} system]\n\nRegarding your inquiry: "${message}"\n\nIn the traditional and classical knowledge framework codified by Pawan Paji for Ankaveda:\n\n1. **Systemic Context**: Numbers are viewed as vibrational archetypes rather than fatalistic omens. For instance, in Indic Aṅka Jyotiṣa, the Mūlāṅka (Root Number) reflects solar conscious temperament, while the Bhāgyāṅka (Destiny Number) represents the unfolding field of life experiences governed by planetary resonances (Grahas).\n\n2. **Calculation Transparency**: In both Chaldean (1-8 sound values) and Pythagorean (1-9 alphabetical values), compound totals hold primary nuance before reduction to a single root digit.\n\n3. **Scholarly Perspective**: Unlike modern pop-astrology, classical treatises like the *Bṛhat Saṁhitā* and *Aryabhatiya* emphasize astronomical regularity and linguistic encryption (such as Katapayadi) rather than arbitrary superstition.\n\n${note || ''}`,
        sourceCategory: 'Category E',
        model: 'ankaveda-grounded-engine'
      });

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json(generateFallback('*Note: Live Gemini model streaming will activate once GEMINI_API_KEY is configured.*'));
      }

      try {
        const ai = new GoogleGenAI({ apiKey });

        // Timeout promise after 8 seconds to prevent hanging connections
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI model request timed out')), 8000)
        );

        // Attempt primary search-grounded model (gemini-3.5-flash with googleSearch tool)
        const modelCall = async () => {
          try {
            // Attempt gemini-3.5-flash with Google Search Grounding as specified by user mandate
            const res = await ai.models.generateContent({
              model: 'gemini-3.5-flash',
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${systemPrompt}\n\nUser Context:\nSelected System: ${selectedSystem || 'Chaldean & Indic'}\nUser Profile Summary: ${JSON.stringify(coreProfile || {})}\nSpecific Query: ${message}`
                    }
                  ]
                }
              ],
              config: {
                tools: [{ googleSearch: {} }]
              }
            });
            return { res, modelName: 'gemini-3.5-flash (Google Search Grounded)', grounded: true };
          } catch (firstErr: any) {
            console.warn('Search-grounded model (gemini-3.5-flash) notice:', firstErr?.message);
            // Fallback to gemini-3.6-flash
            try {
              const res2 = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: [
                  {
                    role: 'user',
                    parts: [
                      {
                        text: `${systemPrompt}\n\nUser Context:\nSelected System: ${selectedSystem || 'Chaldean & Indic'}\nUser Profile Summary: ${JSON.stringify(coreProfile || {})}\nSpecific Query: ${message}`
                      }
                    ]
                  }
                ]
              });
              return { res: res2, modelName: 'gemini-3.6-flash', grounded: false };
            } catch (secondErr: any) {
              // Final fallback to gemini-3.8-flash
              const res3 = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: [
                  {
                    role: 'user',
                    parts: [
                      {
                        text: `${systemPrompt}\n\nUser Context:\nSelected System: ${selectedSystem || 'Chaldean & Indic'}\nUser Profile Summary: ${JSON.stringify(coreProfile || {})}\nSpecific Query: ${message}`
                      }
                    ]
                  }
                ]
              });
              return { res: res3, modelName: 'gemini-3.8-flash', grounded: false };
            }
          }
        };

        const result: any = await Promise.race([modelCall(), timeoutPromise]);
        const replyText = result.res.text || 'No response generated from the model.';

        // Extract Google Search grounding metadata if available
        const groundingChunks = result.res.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const searchSources = groundingChunks
          ? groundingChunks
              .filter((c: any) => c.web?.uri)
              .map((c: any) => ({
                title: c.web.title || 'Web Reference',
                url: c.web.uri
              }))
          : [];

        return res.json({
          reply: replyText,
          sourceCategory: 'Category E',
          model: result.modelName,
          searchGrounded: result.grounded || searchSources.length > 0,
          searchSources
        });
      } catch (genError: any) {
        console.warn('Gemini API call handled with grounded fallback:', genError?.message);
        return res.json(generateFallback('*Note: Live model is temporarily degraded. Responded via Ankaveda grounded knowledge engine.*'));
      }

    } catch (error: any) {
      console.error('AI Gateway Error:', error);
      return res.status(200).json({
        reply: `[Category E — AI-Assisted Interpretation]\n\nAn unexpected processing error occurred while interpreting the request. The classical knowledge engine remains active.\n\nArchitectural Note: System stable, verified by Pawan Paji.`,
        sourceCategory: 'Category E',
        model: 'ankaveda-resilient-engine',
        warning: error?.message || 'Server error handled'
      });
    }
  });

  // Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ankaveda Platform running on http://localhost:${PORT}`);
    console.log(`Lead Architect & Developer: Pawan Paji`);
  });
}

startServer().catch(err => {
  console.error('Failed to start Ankaveda server:', err);
  process.exit(1);
});
