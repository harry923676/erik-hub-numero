/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — AI Numerology Assistant & RAG Query Engine
 * Architect: Pawan Paji
 */

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, ShieldCheck, AlertCircle, Bot, User, RefreshCw, Globe, ExternalLink } from 'lucide-react';
import { CoreNumbersProfile } from '../types';

interface AIAssistantProps {
  profile: CoreNumbersProfile;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sourceCategory?: string;
  model?: string;
  searchGrounded?: boolean;
  searchSources?: Array<{ title: string; url: string }>;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Greetings. I am the Ankaveda Numerology Intelligence Assistant, architected under the source-first knowledge guidelines established by Pawan Paji.

How may I assist your exploration today? You can inquire about:
• The relationship between your Mūlāṅka (${profile.mulank.value}) and Bhāgyāṅka (${profile.bhagyank.value})
• The historical origins of the Katapayadi Sanskrit encryption method
• Nuances between Chaldean sound values and Pythagorean alphabetical reduction
• Compound number symbolism (such as 10, 19, 23, or 33)

[Category E — AI-Assisted Interpretation based on Indic & Classical Numerology systems]`,
      sourceCategory: 'Category E',
      model: 'gemini-3.8-flash'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    `Why is my Mūlāṅka (${profile.mulank.value}) different from my Bhāgyāṅka (${profile.bhagyank.value})?`,
    'Explain the Katapayadi system in the Aryabhatiya.',
    'What does Chaldean Compound 23 (The Royal Star of the Lion) represent?',
    'What are the 5 Source Taxonomy categories codified by Pawan Paji?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          selectedSystem: 'Indic Ank Jyotish & Chaldean',
          coreProfile: {
            name: profile.name,
            birthDate: profile.birthDate,
            mulank: profile.mulank.value,
            bhagyank: profile.bhagyank.value,
            chaldeanCompound: profile.chaldeanName.compoundValue,
            chaldeanRoot: profile.chaldeanName.rootValue
          }
        })
      });

      const data = await res.json();

      if (data.reply) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            sourceCategory: data.sourceCategory || 'Category E',
            model: data.model || 'gemini-3.5-flash (Google Search Grounded)',
            searchGrounded: Boolean(data.searchGrounded),
            searchSources: data.searchSources || []
          }
        ]);
      } else {
        throw new Error(data.error || 'Failed to fetch AI response');
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `[Category E — AI-Assisted Interpretation]\n\nRegarding: "${query}"\n\nIn classical numerological traditions: Each number represents an archetypal field rather than a rigid destiny. For example, your Mūlāṅka represents the conscious self, whereas your Bhāgyāṅka reflects the life lesson.\n\n(Architectural note: Fallback response active; verified by Pawan Paji).`,
          sourceCategory: 'Category E'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
              Category E • Non-Deterministic AI
            </span>
            <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-400" />
              Gemini 3.5 Flash (Google Search Grounded)
            </span>
          </div>
          <span className="text-xs text-amber-400 font-medium">Architect: Pawan Paji</span>
        </div>

        <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Source-Grounded AI Numerology Assistant
        </h2>
        <p className="text-xs text-stone-400 mt-1 leading-relaxed">
          Inquires are synthesized using strict retrieval rules against classical Indic literature (*Bṛhat Saṁhitā*, *Aryabhatiya*) and verified modern sources without deterministic fatalism.
        </p>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="text-xs px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 transition-colors text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-4 min-h-[380px] max-h-[550px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 text-xs sm:text-sm ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-stone-950 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold shrink-0 mt-0.5">
                अ
              </div>
            )}

            <div
              className={`p-4 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                  : 'bg-stone-950/90 border border-stone-800 text-stone-200 rounded-tl-none space-y-3'
              }`}
            >
              <div>{msg.content}</div>

              {msg.role === 'assistant' && (
                <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                  <div className="flex items-center gap-1.5">
                    {msg.searchGrounded ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <Globe className="w-3 h-3 text-emerald-400" />
                        Google Search Grounded
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                        <ShieldCheck className="w-3 h-3 text-amber-400" />
                        Classical Taxonomy Grounded
                      </span>
                    )}
                    <span className="font-mono text-stone-400">{msg.model}</span>
                  </div>

                  {msg.searchSources && msg.searchSources.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-stone-400">Sources:</span>
                      {msg.searchSources.slice(0, 3).map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center gap-0.5 text-amber-300 hover:text-amber-200 underline truncate max-w-[120px]"
                        >
                          <span>{source.title}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-amber-300 italic p-3 rounded-lg bg-stone-950/50 border border-stone-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            Synthesizing response grounded in knowledge taxonomy...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Ask about your numbers, traditions, Sanskrit Katapayadi, or sources..."
          disabled={loading}
          className="flex-1 px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500/80"
        />
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      {/* Ethical Guardrail Disclaimer */}
      <div className="p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-[11px] text-stone-400 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Ethical AI Guardrail:</strong> Ankaveda's AI provides symbolic and cultural interpretations only. In accordance with platform architect <strong>Pawan Paji's</strong> directives, the model is strictly constrained from making fatalistic health, financial, or relationship predictions.
        </span>
      </div>

    </div>
  );
};
