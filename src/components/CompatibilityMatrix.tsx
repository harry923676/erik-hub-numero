/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Compatibility Matrix Engine
 * Architect: Pawan Paji
 */

import React, { useState } from 'react';
import { Users, Heart, ArrowRight, ShieldCheck, Sparkles, MessageCircle, Briefcase, Smile } from 'lucide-react';
import { calculateCompatibility } from '../utils/numerology';
import { SINGLE_NUMBERS } from '../data/numbers';

export const CompatibilityMatrix: React.FC = () => {
  const [nameA, setNameA] = useState('Pawan Kumar');
  const [dobA, setDobA] = useState('1987-10-27');
  const [nameB, setNameB] = useState('Aaradhya Sharma');
  const [dobB, setDobB] = useState('1990-05-15');

  const report = calculateCompatibility(nameA, dobA, nameB, dobB);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          Relational Algebra Engine
        </span>
        <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          Vedic Graha & Core Number Compatibility Matrix
        </h2>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Grounding interpersonal dynamics in classical Mitra (Friend), Sama (Neutral), and Shatru (Enemy) planetary relationship tables from Varāhamihira's *Bṛhat Saṁhitā* and traditional Parāśara frameworks.
        </p>
      </div>

      {/* Input Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Person A */}
        <div className="p-5 rounded-xl bg-stone-900/40 border border-stone-800 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            Person A Profile
          </div>
          <div>
            <label className="block text-[11px] text-stone-400 mb-1">Full Name</label>
            <input
              type="text"
              value={nameA}
              onChange={e => setNameA(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-[11px] text-stone-400 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dobA}
              onChange={e => setDobA(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500 [color-scheme:dark]"
            />
          </div>
          <div className="flex gap-2 pt-1 text-xs">
            <span className="p-1.5 rounded bg-stone-950 border border-stone-800 text-stone-300">
              Root: <strong>{report.personA.mulank}</strong> ({SINGLE_NUMBERS[report.personA.mulank]?.graha})
            </span>
            <span className="p-1.5 rounded bg-stone-950 border border-stone-800 text-stone-300">
              Destiny: <strong>{report.personA.bhagyank}</strong>
            </span>
          </div>
        </div>

        {/* Person B */}
        <div className="p-5 rounded-xl bg-stone-900/40 border border-stone-800 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-300">
            Person B Profile
          </div>
          <div>
            <label className="block text-[11px] text-stone-400 mb-1">Full Name</label>
            <input
              type="text"
              value={nameB}
              onChange={e => setNameB(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-[11px] text-stone-400 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dobB}
              onChange={e => setDobB(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-sky-500 [color-scheme:dark]"
            />
          </div>
          <div className="flex gap-2 pt-1 text-xs">
            <span className="p-1.5 rounded bg-stone-950 border border-stone-800 text-stone-300">
              Root: <strong>{report.personB.mulank}</strong> ({SINGLE_NUMBERS[report.personB.mulank]?.graha})
            </span>
            <span className="p-1.5 rounded bg-stone-950 border border-stone-800 text-stone-300">
              Destiny: <strong>{report.personB.bhagyank}</strong>
            </span>
          </div>
        </div>

      </div>

      {/* COMPATIBILITY RESULTS GAUGE & BREAKDOWN */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        
        {/* Overall Score Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Vedic Graha Dynamic</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {report.vedicGrahaRelation}
              </span>
            </div>
            <h3 className="font-serif-title text-xl font-bold text-stone-100 mt-1">
              Harmonic Resonance Assessment
            </h3>
            <p className="text-xs text-stone-400 mt-0.5 max-w-xl">
              {report.dynamicsAnalysis}
            </p>
          </div>

          <div className="text-center p-4 rounded-2xl bg-stone-950 border border-stone-800 min-w-[150px]">
            <div className="text-[11px] uppercase tracking-wider text-stone-400">Overall Synergy</div>
            <div className="font-serif-title text-4xl font-bold text-amber-300 my-1">
              {report.overallScore}%
            </div>
            <div className="text-[10px] text-stone-500">Multidimensional Index</div>
          </div>
        </div>

        {/* Dimension Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" /> Intellectual & Communication
              </span>
              <span className="font-mono text-stone-200 font-bold">{report.communicationScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-700" 
                style={{ width: `${report.communicationScore}%` }} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Emotional & Intuitive Depth
              </span>
              <span className="font-mono text-stone-200 font-bold">{report.emotionalScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
              <div 
                className="h-full bg-rose-400 rounded-full transition-all duration-700" 
                style={{ width: `${report.emotionalScore}%` }} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" /> Strategic & Work Collaboration
              </span>
              <span className="font-mono text-stone-200 font-bold">{report.workScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
              <div 
                className="h-full bg-sky-400 rounded-full transition-all duration-700" 
                style={{ width: `${report.workScore}%` }} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-emerald-400" /> Social & Lifestyle Harmony
              </span>
              <span className="font-mono text-stone-200 font-bold">{report.socialScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-700" 
                style={{ width: `${report.socialScore}%` }} 
              />
            </div>
          </div>

        </div>

        {/* Source Citation */}
        <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Methodology: {report.sourceTradition}
          </span>
          <span className="text-stone-500 italic">No deterministic claims implied</span>
        </div>

      </div>

    </div>
  );
};
