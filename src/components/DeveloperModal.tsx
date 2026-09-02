/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Developer & Lead Architect Profile Modal
 * Dedicated to Pawan Paji
 */

import React from 'react';
import { X, Award, BookOpen, Compass, CheckCircle2, Terminal, Sparkles } from 'lucide-react';
import { LEAD_DEVELOPER } from '../data/contributor';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-amber-500/30 bg-stone-900/95 p-6 md:p-8 text-stone-100 shadow-2xl shadow-amber-950/40 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-stone-800">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/40 text-amber-300 font-serif-title text-2xl font-bold shadow-inner">
            PP
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif-title font-bold text-amber-200">{LEAD_DEVELOPER.name}</h2>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Award className="w-3 h-3" /> Lead Architect
              </span>
            </div>
            <p className="text-sm text-stone-300 font-medium mt-0.5">{LEAD_DEVELOPER.honorificTitle}</p>
            <p className="text-xs text-stone-400 mt-1">{LEAD_DEVELOPER.role}</p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="my-6 p-4 rounded-xl bg-stone-950/60 border border-stone-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Compass className="w-4 h-4 text-amber-400" /> Architectural & Research Vision
          </div>
          <p className="text-sm text-stone-300 leading-relaxed italic">
            "{LEAD_DEVELOPER.architecturalVision}"
          </p>
        </div>

        {/* Key Engineering & Research Contributions */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Core Contributions to the Repository
          </h3>
          <div className="grid gap-2.5">
            {LEAD_DEVELOPER.contributions.map((contribution, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-stone-800/40 border border-stone-800 text-xs sm:text-sm text-stone-200">
                <span className="flex-shrink-0 text-amber-400 font-mono font-bold mt-0.5">{idx + 1}.</span>
                <span>{contribution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-sky-400" /> Specialized Research Domains
          </h3>
          <div className="flex flex-wrap gap-2">
            {LEAD_DEVELOPER.researchAreas.map((area, idx) => (
              <span key={idx} className="text-xs px-3 py-1 rounded-md bg-stone-800 text-stone-300 border border-stone-700/60">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Repository & Engine Maintained by <strong className="text-stone-200">Pawan Paji</strong></span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
