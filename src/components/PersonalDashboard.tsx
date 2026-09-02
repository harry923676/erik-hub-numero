/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Personal Numerology Intelligence Dashboard
 * Architect & Developer: Pawan Paji
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Info, 
  Flame, 
  Moon, 
  Sun, 
  Gem, 
  Layers, 
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Grid3X3
} from 'lucide-react';
import { CoreNumbersProfile } from '../types';
import { COMPOUND_NUMBERS, SINGLE_NUMBERS } from '../data/numbers';
import { SOURCE_TAXONOMY } from '../data/sources';
import { reduceToSingleDigit } from '../utils/numerology';
import { generateLoShuAnalysis } from '../utils/loshu';
import { AuthProfilePanel } from './AuthProfilePanel';

interface PersonalDashboardProps {
  profile: CoreNumbersProfile;
  nameInput: string;
  dobInput: string;
  setNameInput: (name: string) => void;
  setDobInput: (dob: string) => void;
  onSelectSystemForAnalysis: (system: string) => void;
  onNavigateToLoShu?: () => void;
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({
  profile,
  nameInput,
  dobInput,
  setNameInput,
  setDobInput,
  onSelectSystemForAnalysis,
  onNavigateToLoShu
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>('mulank');

  const mulankData = SINGLE_NUMBERS[profile.mulank.value] || SINGLE_NUMBERS[1];
  const bhagyankData = SINGLE_NUMBERS[profile.bhagyank.value] || SINGLE_NUMBERS[1];
  const compoundInfo = COMPOUND_NUMBERS[profile.chaldeanName.compoundValue];

  // Derive Lo Shu analysis for the dashboard card
  const loShu = React.useMemo(() => {
    return generateLoShuAnalysis(dobInput, { mode: 'vedic_hybrid' });
  }, [dobInput]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Input Form & Quick Controls */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 shadow-lg shadow-stone-950/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <h2 className="text-xl font-serif-title font-bold text-stone-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Personal Numerology Matrix
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Multi-system mathematical reduction across Indic Aṅka Jyotiṣa, Chaldean sound values & Pythagorean geometry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <AuthProfilePanel
              currentProfile={profile}
              nameInput={nameInput}
              dobInput={dobInput}
              onApplySavedProfile={(name, dob) => {
                setNameInput(name);
                setDobInput(dob);
              }}
            />
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified by <strong>Pawan Paji</strong></span>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
              Full Legal / Preferred Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="e.g. Pawan Kumar"
                className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
              <input
                type="date"
                value={dobInput}
                onChange={e => setDobInput(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-none focus:border-amber-500/80 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex items-end">
            <div className="w-full flex items-center justify-between p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-xs text-stone-400">
              <span>Selected Profile:</span>
              <span className="font-semibold text-amber-300 truncate max-w-[140px]">{profile.name || 'Anonymous'}</span>
              <span className="font-mono text-stone-400">{profile.birthDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S UNIVERSAL & PERSONAL PULSE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-950 border border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <span>Universal Rhythm</span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-serif-title text-4xl font-bold text-amber-200">
              {profile.personalCycles.universalYear}
            </span>
            <span className="text-xs text-stone-400">
              Year 2026 (2+0+2+6 = 10 → 1)
            </span>
          </div>
          <p className="mt-2 text-xs text-stone-300 leading-relaxed">
            Global cycle of new foundational beginnings, technological innovation, and self-directed pioneering initiatives.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-stone-900 to-stone-950 border border-indigo-500/30">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold uppercase tracking-wider">
            <span>Your Personal Year</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-serif-title text-4xl font-bold text-indigo-200">
              {profile.personalCycles.personalYear}
            </span>
            <span className="text-xs text-stone-400">
              Cycle {profile.personalCycles.personalYear} of 9
            </span>
          </div>
          <p className="mt-2 text-xs text-stone-300 leading-relaxed font-medium">
            Theme: {profile.personalCycles.personalYearTheme}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-stone-900 to-stone-950 border border-emerald-500/30">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider">
            <span>Your Personal Day</span>
            <Moon className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-serif-title text-4xl font-bold text-emerald-200">
              {profile.personalCycles.personalDay}
            </span>
            <span className="text-xs text-stone-400">
              Daily Harmonic Focus
            </span>
          </div>
          <p className="mt-2 text-xs text-stone-300 leading-relaxed">
            {profile.personalCycles.dailyFocus}
          </p>
        </div>

      </div>

      {/* CORE NUMBERS EXPANDABLE CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif-title font-bold text-stone-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Core Numerical Profile
          </h3>
          <span className="text-xs text-stone-400">Click any card to inspect transparent step-by-step reduction</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Mūlāṅka (Root Number) */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'mulank' ? null : 'mulank')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              expandedCard === 'mulank'
                ? 'bg-stone-900 border-amber-500/60 shadow-xl shadow-amber-950/30'
                : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Category A / C • Indic Ank Jyotish
                </span>
                <h4 className="font-serif-title text-base font-bold text-stone-100 mt-2">Mūlāṅka (Root / Birth)</h4>
                <p className="text-xs text-stone-400">{profile.mulank.sanskritPlanet} • {profile.mulank.rulingPlanet}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-stone-950 border border-amber-500/40 flex items-center justify-center font-serif-title text-3xl font-bold text-amber-300 shadow-inner">
                {profile.mulank.value}
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-300 leading-relaxed line-clamp-2">
              {mulankData.indicTradition}
            </p>

            {/* Expandable Derivation Trace */}
            {expandedCard === 'mulank' && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-3 animate-fade-in text-xs">
                <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 font-mono text-stone-300">
                  <div className="text-stone-500 text-[11px]">Calculation Trace:</div>
                  <div>Day {profile.day} → {profile.mulank.calculation.rawExpression} = <strong className="text-amber-300">{profile.mulank.value}</strong></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-stone-950 border border-stone-800">
                    <span className="text-stone-500 block">Gemstone:</span>
                    <span className="text-stone-200 font-medium">{profile.mulank.gemstone}</span>
                  </div>
                  <div className="p-2 rounded bg-stone-950 border border-stone-800">
                    <span className="text-stone-500 block">Favorable Days:</span>
                    <span className="text-stone-200 font-medium">{profile.mulank.favorableDays.join(', ')}</span>
                  </div>
                  <div className="col-span-2 p-2 rounded bg-stone-950 border border-stone-800">
                    <span className="text-stone-500 block">Harmonious Colors:</span>
                    <span className="text-stone-200 font-medium">{profile.mulank.favorableColors.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Bhāgyāṅka (Life Path / Destiny) */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'bhagyank' ? null : 'bhagyank')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              expandedCard === 'bhagyank'
                ? 'bg-stone-900 border-sky-500/60 shadow-xl shadow-sky-950/30'
                : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  Category A / D • Full Date Reduction
                </span>
                <h4 className="font-serif-title text-base font-bold text-stone-100 mt-2">Bhāgyāṅka (Life Path)</h4>
                <p className="text-xs text-stone-400">{bhagyankData.sanskritName} • {bhagyankData.graha}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-stone-950 border border-sky-500/40 flex items-center justify-center font-serif-title text-3xl font-bold text-sky-300 shadow-inner">
                {profile.bhagyank.value}
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-300 leading-relaxed line-clamp-2">
              {bhagyankData.pythagoreanTradition}
            </p>

            {expandedCard === 'bhagyank' && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-3 animate-fade-in text-xs">
                <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 font-mono text-stone-300">
                  <div className="text-stone-500 text-[11px]">Full Date Addition:</div>
                  <div className="break-words">{profile.bhagyank.calculation.rawExpression}</div>
                  <div className="text-sky-300 font-bold mt-1">{profile.bhagyank.calculation.reductionStep}</div>
                </div>
                <div className="p-2.5 rounded bg-stone-950 border border-stone-800 text-[11px]">
                  <span className="text-stone-500 block">Karmic Archetype:</span>
                  <span className="text-stone-200">{bhagyankData.archetype}</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Chaldean Nāmāṅka (Expression / Compound) */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'namank' ? null : 'namank')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              expandedCard === 'namank'
                ? 'bg-stone-900 border-purple-500/60 shadow-xl shadow-purple-950/30'
                : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  Category D • Chaldean Sound Table
                </span>
                <h4 className="font-serif-title text-base font-bold text-stone-100 mt-2">Chaldean Compound & Root</h4>
                <p className="text-xs text-stone-400">
                  Compound: {profile.chaldeanName.compoundValue} → Root: {profile.chaldeanName.rootValue}
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-stone-950 border border-purple-500/40 flex items-center justify-center font-serif-title text-xl font-bold text-purple-300 shadow-inner">
                {profile.chaldeanName.compoundValue}/{profile.chaldeanName.rootValue}
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-300 leading-relaxed line-clamp-2">
              {compoundInfo ? `${compoundInfo.title}: ${compoundInfo.archetype}` : `Vibrates to root number ${profile.chaldeanName.rootValue}`}
            </p>

            {expandedCard === 'namank' && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-3 animate-fade-in text-xs">
                <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 font-mono text-stone-300">
                  <div className="text-stone-500 text-[11px]">Letter Values Breakdown:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.chaldeanName.letterBreakdown.map((item, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200">
                        {item.char}<sub>{item.value}</sub>
                      </span>
                    ))}
                  </div>
                  <div className="text-purple-300 font-bold mt-2">
                    Sum = {profile.chaldeanName.compoundValue} → Root {profile.chaldeanName.rootValue}
                  </div>
                </div>

                {compoundInfo && (
                  <div className="p-2.5 rounded bg-stone-950 border border-stone-800 text-[11px] text-stone-300">
                    <strong className="text-purple-300 block">{compoundInfo.title}</strong>
                    <span>{compoundInfo.practicalGuidance}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card 4: Soul Urge / Heart's Desire */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'soulurge' ? null : 'soulurge')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              expandedCard === 'soulurge'
                ? 'bg-stone-900 border-rose-500/60 shadow-xl shadow-rose-950/30'
                : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  Category D • Vowels Vibration
                </span>
                <h4 className="font-serif-title text-base font-bold text-stone-100 mt-2">Soul Urge (Heart's Desire)</h4>
                <p className="text-xs text-stone-400">Inner motives & spiritual yearning</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-stone-950 border border-rose-500/40 flex items-center justify-center font-serif-title text-3xl font-bold text-rose-300 shadow-inner">
                {profile.soulUrge.value}
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-300 leading-relaxed">
              Derived from the vowels in your name ({profile.soulUrge.vowels.join(', ') || 'None'}). Governs private dreams and core emotional fulfillment.
            </p>

            {expandedCard === 'soulurge' && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-2 animate-fade-in text-xs">
                <div className="p-2.5 rounded bg-stone-950 border border-stone-800 font-mono text-stone-300 text-[11px]">
                  <span>Vowels: [{profile.soulUrge.vowels.join(', ')}] → Sum: {profile.soulUrge.calculation.sum} → Root: {profile.soulUrge.value}</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 5: Personality Number (Consonants) */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'personality' ? null : 'personality')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              expandedCard === 'personality'
                ? 'bg-stone-900 border-amber-500/60 shadow-xl shadow-amber-950/30'
                : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Category D • Consonants Vibration
                </span>
                <h4 className="font-serif-title text-base font-bold text-stone-100 mt-2">Personality Number</h4>
                <p className="text-xs text-stone-400">External projection & first impressions</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-stone-950 border border-amber-500/40 flex items-center justify-center font-serif-title text-3xl font-bold text-amber-300 shadow-inner">
                {profile.personality.value}
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-300 leading-relaxed">
              Calculated from consonants. Reflects the persona perceived by colleagues, acquaintances, and the public realm.
            </p>

            {expandedCard === 'personality' && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-2 animate-fade-in text-xs">
                <div className="p-2.5 rounded bg-stone-950 border border-stone-800 font-mono text-stone-300 text-[11px]">
                  <span>Consonants Sum: {profile.personality.calculation.sum} → Root: {profile.personality.value}</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 6: Maturity Number */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'maturity' ? null : 'maturity')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              expandedCard === 'maturity'
                ? 'bg-stone-900 border-emerald-500/60 shadow-xl shadow-emerald-950/30'
                : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Category D • Life Path + Expression
                </span>
                <h4 className="font-serif-title text-base font-bold text-stone-100 mt-2">Maturity Number</h4>
                <p className="text-xs text-stone-400">Emerging purpose after age 35–40</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-stone-950 border border-emerald-500/40 flex items-center justify-center font-serif-title text-3xl font-bold text-emerald-300 shadow-inner">
                {profile.maturityNumber.value}
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-300 leading-relaxed">
              Synthesis of Destiny ({profile.bhagyank.value}) and Pythagorean Expression ({profile.pythagoreanExpression.rootValue}). Represents your mature life harvest.
            </p>

            {expandedCard === 'maturity' && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-2 animate-fade-in text-xs">
                <div className="p-2.5 rounded bg-stone-950 border border-stone-800 font-mono text-stone-300 text-[11px]">
                  <span>{profile.bhagyank.value} + {profile.pythagoreanExpression.rootValue} = {profile.maturityNumber.calculation.sum} → Root: {profile.maturityNumber.value}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* NUMEROLOGY LIFE CYCLE TIMELINE */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h3 className="font-serif-title text-lg font-bold text-stone-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              Life Cycle Navigation Timeline
            </h3>
            <p className="text-xs text-stone-400">
              Interactive temporal progression based on the 9-year epicyclic model.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
            Birth Year: {profile.year}
          </span>
        </div>

        {/* Timeline visualization */}
        <div className="pt-6 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[680px] gap-2">
            {[
              { period: '0 — 27 Years', title: 'Formative Cycle', ruler: `Governed by Month (${profile.month})`, active: false },
              { period: '28 — 54 Years', title: 'Productive Cycle', ruler: `Governed by Day (${profile.mulank.value})`, active: true },
              { period: '55+ Years', title: 'Harvest Cycle', ruler: `Governed by Year (${reduceToSingleDigit(profile.year).root})`, active: false }
            ].map((cycle, i) => (
              <div
                key={i}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  cycle.active
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                    : 'bg-stone-950/60 border-stone-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-stone-400">{cycle.period}</span>
                  {cycle.active && (
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Current Epoch
                    </span>
                  )}
                </div>
                <h5 className="font-serif-title text-sm font-bold text-stone-200">{cycle.title}</h5>
                <p className="text-xs text-stone-400 mt-1">{cycle.ruler}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LO SHU GRID PREVIEW & PLANE HIGHLIGHTS */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-stone-900/90 via-stone-900/60 to-stone-950 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Cosmic 3×3 Magic Matrix
              </span>
              <span className="text-xs text-stone-400">
                {loShu.planes.filter(p => p.status === 'Complete').length} of 8 Planes Complete
              </span>
            </div>
            <h3 className="font-serif-title text-xl font-bold text-stone-100 flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 text-amber-400" />
              Lo Shu Grid &amp; Plane Analysis
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Based on your date of birth ({dobInput}) and planetary vibrations (Mūlāṅka {loShu.mulankValue} &amp; Bhāgyāṅka {loShu.bhagyankValue}). Explore mental, emotional, practical planes, and special celestial yogas like Golden Raj Yoga (4-5-6).
            </p>
            
            {/* Quick Status Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {loShu.kuaNumber && (
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">
                  ✦ Kua {loShu.kuaNumber} ({loShu.kuaDetails?.direction} • {loShu.kuaDetails?.group ? (loShu.kuaDetails.group.includes('East') ? 'East Group' : 'West Group') : 'Gua'})
                </span>
              )}
              {loShu.yogas.goldenRajYoga && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">
                  ✦ Golden Raj Yoga Active (4-5-6)
                </span>
              )}
              {loShu.yogas.silverRajYoga && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">
                  ✦ Silver Property Yoga Active (2-5-8)
                </span>
              )}
              {loShu.yogas.mentalPlane && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Intellect Plane Complete (4-9-2)
                </span>
              )}
              {loShu.yogas.practicalPlane && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Practical Execution Complete (8-1-6)
                </span>
              )}
            </div>
          </div>

          {/* Compact 3x3 Visual Preview & CTA */}
          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-stone-950 rounded-xl border border-stone-800 shadow-inner w-44 h-44">
              {[4, 9, 2, 3, 5, 7, 8, 1, 6].map(n => {
                const count = loShu.cells[n].count;
                const isPresent = count > 0;
                return (
                  <div
                    key={n}
                    className={`rounded-lg flex flex-col items-center justify-center font-mono transition-all ${
                      isPresent
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                        : 'bg-stone-900/40 border border-stone-800/40 text-stone-600'
                    }`}
                  >
                    <span className="text-xs font-bold">{isPresent ? Array(count).fill(n).join('') : n}</span>
                  </div>
                );
              })}
            </div>

            {onNavigateToLoShu && (
              <button
                onClick={onNavigateToLoShu}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs shadow-md transition-all"
              >
                <span>Full Lo Shu Plane Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
