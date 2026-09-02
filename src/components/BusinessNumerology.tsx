/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Business & Brand Numerology Intelligence
 * Architect: Pawan Paji
 */

import React, { useState } from 'react';
import { Briefcase, Sparkles, Check, Globe, Shield, ArrowRight, Building, Award } from 'lucide-react';
import { calculateNameNumbers } from '../utils/numerology';
import { INDUSTRY_VIBRATIONS } from '../data/businessIndustries';
import { COMPOUND_NUMBERS, SINGLE_NUMBERS } from '../data/numbers';

export const BusinessNumerology: React.FC = () => {
  const [brandName, setBrandName] = useState('Ankaveda');
  const [category, setCategory] = useState<'Company' | 'Brand' | 'Product' | 'App' | 'Domain'>('Company');

  const calc = calculateNameNumbers(brandName);
  const vibration = INDUSTRY_VIBRATIONS[calc.chaldean.root] || INDUSTRY_VIBRATIONS[1];
  const compoundInfo = COMPOUND_NUMBERS[calc.chaldean.compound];

  // Memorability heuristic: shorter names with balanced vowels/consonants score higher
  const cleanLen = brandName.replace(/[^a-zA-Z]/g, '').length;
  const memorability = Math.min(96, Math.max(65, 95 - Math.abs(cleanLen - 7) * 4));

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
          Corporate & Commercial Intelligence
        </span>
        <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-amber-400" />
          Business, Brand & Startup Numerology
        </h2>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Analyze commercial acoustics, Chaldean compound resonance, and industrial alignment for enterprise ventures, product lines, and digital domain names.
        </p>
      </div>

      {/* Input controls */}
      <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
              Brand / Entity Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              placeholder="e.g. Ankaveda or Nexus AI"
              className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-amber-200 font-semibold focus:outline-none focus:border-amber-500/80"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
              Entity Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Company">Enterprise / Parent Corporation</option>
              <option value="Brand">Consumer Brand / D2C</option>
              <option value="Product">Product Line / Hardware</option>
              <option value="App">Software Application / SaaS</option>
              <option value="Domain">Web Domain Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vibration Analysis Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric Cards */}
        <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-4">
          <div className="text-xs font-semibold uppercase text-stone-400">Vibrational Acoustic Index</div>
          
          <div className="p-4 rounded-xl bg-stone-950 border border-purple-500/30 text-center">
            <span className="text-[11px] text-stone-400">Chaldean Commercial Compound</span>
            <div className="font-serif-title text-3xl font-bold text-purple-300 my-1">
              {calc.chaldean.compound}
            </div>
            <div className="text-xs text-stone-300 font-medium">
              Reduces to Root {calc.chaldean.root} ({SINGLE_NUMBERS[calc.chaldean.root]?.graha})
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-center">
            <span className="text-[11px] text-stone-400">Acoustic Memorability Index</span>
            <div className="font-serif-title text-3xl font-bold text-emerald-300 my-1">
              {memorability}%
            </div>
            <div className="text-[10px] text-stone-500">Phonetic cadence & length balance</div>
          </div>

          <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs space-y-1">
            <div className="text-stone-400 text-[11px]">Recommended Launch Days:</div>
            <div className="text-amber-300 font-semibold">{vibration.favorableDays.join(', ')}</div>
          </div>
        </div>

        {/* Industrial Alignment & Brand Guidance */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-5">
          
          <div>
            <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Commercial Archetype
            </span>
            <h3 className="font-serif-title text-xl font-bold text-stone-100 mt-2">
              {vibration.archetype}
            </h3>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              Ideal tone: <strong className="text-stone-100">{vibration.brandingTone}</strong>. {vibration.idealFor}.
            </p>
          </div>

          {compoundInfo && (
            <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/30 text-xs text-stone-300 space-y-1">
              <span className="font-semibold text-amber-300 block">{compoundInfo.title} (Compound {calc.chaldean.compound})</span>
              <p className="leading-relaxed">{compoundInfo.practicalGuidance}</p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2.5 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-400" />
              Highest Affinity Industries for Root {calc.chaldean.root}
            </h4>
            <div className="flex flex-wrap gap-2">
              {vibration.recommendedIndustries.map((ind, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-medium text-stone-200">
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
            <span>Formula verified by <strong>Pawan Paji</strong></span>
            <span>Pythagorean Expression: {calc.pythagorean.root}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
