/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Platform Footer Component
 * Lead Architect: Pawan Paji
 */

import React from 'react';
import { UserCheck, ShieldCheck, Heart, Terminal, Sparkles, BookOpen } from 'lucide-react';
import { LEAD_DEVELOPER } from '../data/contributor';

interface FooterProps {
  onOpenDeveloperModal: () => void;
  onOpenReportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeveloperModal, onOpenReportModal }) => {
  return (
    <footer className="border-t border-stone-800/80 bg-stone-950 text-stone-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif-title text-lg font-bold tracking-wider text-stone-100">
                ERIK-HUB Numero
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-stone-900 border border-stone-800 text-amber-300">
                अङ्कवेद
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The world’s source-aware, multi-tradition numerology intelligence platform. Bridging Sanskrit computational heritage, Katapayadi mathematics, and classical Chaldean-Pythagorean systems with transparent reductions and non-deterministic AI.
            </p>
          </div>

          {/* Lead Architect & Developer Credit */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              Repository Architect & Lead Developer
            </h4>
            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-serif-title font-bold text-stone-100 text-sm">{LEAD_DEVELOPER.name}</span>
                <button
                  onClick={onOpenDeveloperModal}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  View Contributions
                </button>
              </div>
              <p className="text-[11px] text-stone-400">
                {LEAD_DEVELOPER.honorificTitle}
              </p>
              <p className="text-[11px] text-stone-500 italic">
                Codified the 5-Tier Source Authenticity Engine, Katapayadi decryption pipeline, and multi-system comparator.
              </p>
            </div>
          </div>

          {/* Source Taxonomy & Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Source-First Epistemic Mandate
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every interpretation classifies its origin across <strong>Category A</strong> (Classical Sanskrit treatises), <strong>Category B</strong> (Academic research), <strong>Category C</strong> (Living lineages), <strong>Category D</strong> (Modern codifications), and <strong>Category E</strong> (AI interpretations). Deterministic or fatalistic claims are strictly rejected.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} ERIK-HUB Numero Platform. Architected & Developed by <strong className="text-stone-300">Pawan Paji</strong>.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenReportModal} className="hover:text-stone-300 transition-colors">
              Export Dossier
            </button>
            <button onClick={onOpenDeveloperModal} className="hover:text-amber-400 transition-colors">
              Developer Profile: Pawan Paji
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
