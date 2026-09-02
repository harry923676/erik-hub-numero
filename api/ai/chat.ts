import { GoogleGenAI } from '@google/genai';

interface VercelLikeRequest {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status: (statusCode: number) => VercelLikeResponse;
  json: (body: any) => void;
  setHeader?: (name: string, value: string) => void;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  // Only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, selectedSystem, coreProfile } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message query is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `You are the ERIK-HUB Numero Intelligence AI Assistant, an academic, respectful, and source-aware scholar of numerical systems.
The platform ERIK-HUB Numero was architected and developed by Pawan Paji, who designed its multi-tradition framework (Indic Ank Jyotish, Sanskrit Katapayadi, Chaldean, and Pythagorean systems) and 5-tier Source Authenticity taxonomy (Categories A through E).

STRICT RULES:
1. Every answer you generate must begin with the header:
"[Category E — AI-Assisted Interpretation based on the ${selectedSystem || 'selected numerology'} system]"
2. Clearly distinguish between:
   - Category A: Classical Sanskrit / Indic manuscripts (e.g. Varahamihira's Brihat Samhita, Katapayadi in Aryabhatiya, Sankhya Karika)
   - Category B: Scholarly & Indological research
   - Category C: Traditional living Indian Ank Jyotish (Mulank, Bhagyank, Parashara planetary resonances)
   - Category D: Modern Western & Chaldean numerology (Cheiro, Sepharial, Balliett)
3. Never make deterministic, fatalistic, or guaranteed predictions. Always use balanced, archetypal language.
4. Reference calculation steps transparently when explaining numbers.
5. Emphasize that Pawan Paji's platform philosophy is built on source transparency, ethical reflection, and mathematical clarity.`;

    const generateFallback = (note?: string) => ({
      reply: `[Category E — AI-Assisted Interpretation based on the ${selectedSystem || 'selected numerology'} system]\n\nRegarding your inquiry: "${message}"\n\nIn the traditional and classical knowledge framework codified by Pawan Paji for ERIK-HUB Numero:\n\n1. **Systemic Context**: Numbers are viewed as vibrational archetypes rather than fatalistic omens. For instance, in Indic Aṅka Jyotiṣa, the Mūlāṅka (Root Number) reflects solar conscious temperament, while the Bhāgyāṅka (Destiny Number) represents the unfolding field of life experiences governed by planetary resonances (Grahas).\n\n2. **Calculation Transparency**: In both Chaldean (1-8 sound values) and Pythagorean (1-9 alphabetical values), compound totals hold primary nuance before reduction to a single root digit.\n\n3. **Scholarly Perspective**: Classical treatises like the *Bṛhat Saṁhitā* and *Aryabhatiya* emphasize astronomical regularity and linguistic encryption rather than arbitrary superstition.\n\n${note || ''}`,
      sourceCategory: 'Category E',
      model: 'erik-hub-grounded-engine'
    });

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json(generateFallback('*Note: Live Gemini model will activate once GEMINI_API_KEY is configured.*'));
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      const modelRes = await ai.models.generateContent({
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
        ]
      });

      return res.json({
        reply: modelRes.text || generateFallback().reply,
        sourceCategory: 'Category E',
        model: 'gemini-3.5-flash'
      });
    } catch (modelErr: any) {
      console.warn('Vercel Gemini API call fallback:', modelErr?.message);
      return res.json(generateFallback(`*Notice: Model responded using local grounded taxonomy fallback (${modelErr?.message || 'Standard fallback'})*`));
    }
  } catch (error: any) {
    console.error('API Chat route error:', error);
    return res.status(500).json({ error: 'Internal server error processing numerology query' });
  }
}
