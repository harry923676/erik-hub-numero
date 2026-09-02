/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Printable Dossier Report Modal
 * Lead Architect: Pawan Paji
 */

import React from 'react';
import { X, Printer, ShieldCheck, Award, FileText, Compass, Download } from 'lucide-react';
import { CoreNumbersProfile } from '../types';
import { COMPOUND_NUMBERS, SINGLE_NUMBERS } from '../data/numbers';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoreNumbersProfile;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const compoundInfo = COMPOUND_NUMBERS[profile.chaldeanName.compoundValue];
  const mulankInfo = SINGLE_NUMBERS[profile.mulank.value] || SINGLE_NUMBERS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white print:text-black">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-stone-800 bg-stone-900 p-6 md:p-10 text-stone-100 shadow-2xl my-8 print:border-none print:shadow-none print:bg-white print:text-black"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Controls (Hidden when printing) */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              Official Numerology Intelligence Dossier
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Content */}
        <div className="space-y-8 pt-6">
          
          {/* Header of Dossier */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <h1 className="font-serif-title text-2xl font-bold tracking-wide text-amber-200 print:text-black">
                ERIK-HUB NUMERO DOSSIER
              </h1>
              <p className="text-xs text-stone-400 print:text-gray-600 mt-0.5">
                Comprehensive Source-Aware Multi-Tradition Numerical Profile
              </p>
              <div className="text-xs text-stone-300 print:text-gray-800 font-semibold mt-2">
                Subject: <span className="text-amber-300 print:text-black">{profile.name || 'Anonymous Subject'}</span> • DOB: <span className="font-mono">{profile.birthDate}</span>
              </div>
            </div>

            <div className="text-right text-xs text-stone-400 print:text-gray-600 space-y-1">
              <div>Date Generated: {new Date().toLocaleDateString()}</div>
              <div>Platform Architect: <strong className="text-stone-200 print:text-black">Pawan Paji</strong></div>
              <div>Rule Version: 1.0 (Audited)</div>
            </div>
          </div>

          {/* Core Numerical Values Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 print:border-gray-300 print:bg-gray-50">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] block">Mūlāṅka (Root Number)</span>
              <div className="font-serif-title text-3xl font-bold text-amber-300 print:text-black my-1">
                {profile.mulank.value}
              </div>
              <span className="text-stone-300 print:text-gray-700">{profile.mulank.rulingPlanet}</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 print:border-gray-300 print:bg-gray-50">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] block">Bhāgyāṅka (Life Path)</span>
              <div className="font-serif-title text-3xl font-bold text-sky-300 print:text-black my-1">
                {profile.bhagyank.value}
              </div>
              <span className="text-stone-300 print:text-gray-700">Full Date Reduction</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 print:border-gray-300 print:bg-gray-50">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] block">Chaldean Compound / Root</span>
              <div className="font-serif-title text-3xl font-bold text-purple-300 print:text-black my-1">
                {profile.chaldeanName.compoundValue}/{profile.chaldeanName.rootValue}
              </div>
              <span className="text-stone-300 print:text-gray-700">Sound Vibration Total</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 print:border-gray-300 print:bg-gray-50">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] block">Soul Urge (Vowels)</span>
              <div className="font-serif-title text-2xl font-bold text-rose-300 print:text-black my-1">
                {profile.soulUrge.value}
              </div>
              <span className="text-stone-300 print:text-gray-700">Inner Emotional Driver</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 print:border-gray-300 print:bg-gray-50">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] block">Outer Personality</span>
              <div className="font-serif-title text-2xl font-bold text-amber-300 print:text-black my-1">
                {profile.personality.value}
              </div>
              <span className="text-stone-300 print:text-gray-700">Consonant Projection</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 print:border-gray-300 print:bg-gray-50">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] block">Maturity Number</span>
              <div className="font-serif-title text-2xl font-bold text-emerald-300 print:text-black my-1">
                {profile.maturityNumber.value}
              </div>
              <span className="text-stone-300 print:text-gray-700">Life Path + Expression</span>
            </div>
          </div>

          {/* Detailed Derivation & Calculations */}
          <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 print:border-gray-300 text-xs space-y-3">
            <h3 className="font-serif-title font-bold text-stone-200 print:text-black uppercase tracking-wider text-xs">
              Mathematical Derivation Trace
            </h3>
            
            <div className="space-y-1.5 font-mono text-stone-300 print:text-gray-800">
              <div>• <strong>Mūlāṅka:</strong> Day {profile.day} → {profile.mulank.calculation.rawExpression} = {profile.mulank.value}</div>
              <div>• <strong>Bhāgyāṅka:</strong> {profile.bhagyank.calculation.rawExpression} → {profile.bhagyank.calculation.reductionStep}</div>
              <div>• <strong>Chaldean Expression:</strong> {profile.chaldeanName.calculation.rawExpression} = {profile.chaldeanName.compoundValue} → {profile.chaldeanName.rootValue}</div>
            </div>
          </div>

          {/* Interpretive Breakdown */}
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-serif-title text-sm font-bold text-stone-100 print:text-black mb-1">
                Root Vibration Analysis ({mulankInfo.indicTitle})
              </h4>
              <p className="text-stone-300 print:text-gray-700 leading-relaxed">
                {mulankInfo.indicTradition} Favorable colors: {profile.mulank.favorableColors.join(', ')}. Gemstone: {profile.mulank.gemstone}.
              </p>
            </div>

            {compoundInfo && (
              <div>
                <h4 className="font-serif-title text-sm font-bold text-stone-100 print:text-black mb-1">
                  Compound Archetype ({compoundInfo.title} — {compoundInfo.number})
                </h4>
                <p className="text-stone-300 print:text-gray-700 leading-relaxed">
                  {compoundInfo.symbolism} Guidance: {compoundInfo.practicalGuidance}
                </p>
              </div>
            )}
          </div>

          {/* Dossier Footer with Contributor attribution */}
          <div className="pt-6 border-t border-stone-800 print:border-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-stone-400 print:text-gray-600">
            <div>
              Platform Architect & Researcher: <strong className="text-stone-200 print:text-black">Pawan Paji</strong>
            </div>
            <div>
              Source Authenticity Engine • Certified Categories A through E
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
