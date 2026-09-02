/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Multi-System Numerology & Katapayadi Comparator
 * Architect: Pawan Paji
 */

import React, { useState } from 'react';
import { Layers, Compass, BookOpen, Check, ArrowRight, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { calculateNameNumbers, calculateKatapayadi, KATAPAYADI_CONSONANTS, CHALDEAN_MAP, PYTHAGOREAN_MAP } from '../utils/numerology';
import { SINGLE_NUMBERS } from '../data/numbers';

interface SystemComparatorProps {
  initialName: string;
}

export const SystemComparator: React.FC<SystemComparatorProps> = ({ initialName }) => {
  const [testName, setTestName] = useState(initialName || 'Pawan Paji');
  const [indicText, setIndicText] = useState('पवन पाजी');

  const nameResults = calculateNameNumbers(testName);
  const katapayadiResults = calculateKatapayadi(indicText);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Cross-Methodological Comparative Engine
            </span>
            <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Multi-Tradition Calculation Comparison
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              Compare letter values, sound tables, compound accumulations, and reduction rules across Chaldean, Pythagorean, Indic Aṅka Jyotiṣa, and ancient Sanskrit Katapayadi systems without conflation.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">
              Test Latin Name
            </label>
            <input
              type="text"
              value={testName}
              onChange={e => setTestName(e.target.value)}
              placeholder="e.g. Pawan Kumar"
              className="w-full md:w-64 px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-none focus:border-amber-500/80"
            />
          </div>
        </div>
      </div>

      {/* Comparison Grid: Chaldean vs Pythagorean vs Indic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Chaldean Column */}
        <div className="p-6 rounded-2xl bg-stone-900/40 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Category D • Sound Vibration
                </span>
                <h3 className="font-serif-title text-lg font-bold text-stone-100 mt-1.5">Chaldean System</h3>
              </div>
              <span className="text-xs text-stone-400 font-mono">1 to 8</span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-center">
              <div className="text-xs text-stone-400 mb-1">Compound → Root</div>
              <div className="font-serif-title text-3xl font-bold text-purple-300">
                {nameResults.chaldean.compound} → {nameResults.chaldean.root}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Governing Graha: {SINGLE_NUMBERS[nameResults.chaldean.root]?.graha || 'Vibration'}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-stone-300 leading-relaxed">
              <p>• Based on ancient Babylonian and acoustic occult tables popularized by Cheiro (1926).</p>
              <p>• Number 9 is regarded as sacred and excluded from single letter mappings.</p>
              <p>• Emphasizes inner compound vibrations (10–52) over simplified single-digit reductions.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>Primary Focus:</span>
            <span className="text-purple-300 font-medium">Compound Destinies</span>
          </div>
        </div>

        {/* Pythagorean Column */}
        <div className="p-6 rounded-2xl bg-stone-900/40 border border-sky-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  Category D • Sequential 1-9
                </span>
                <h3 className="font-serif-title text-lg font-bold text-stone-100 mt-1.5">Pythagorean System</h3>
              </div>
              <span className="text-xs text-stone-400 font-mono">1 to 9</span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-center">
              <div className="text-xs text-stone-400 mb-1">Expression (Total Sum)</div>
              <div className="font-serif-title text-3xl font-bold text-sky-300">
                {nameResults.pythagorean.compound} → {nameResults.pythagorean.root}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Soul Urge: {nameResults.soulUrge.root} • Personality: {nameResults.personality.root}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-stone-300 leading-relaxed">
              <p>• Assigns digits 1 to 9 sequentially across the Latin alphabet (A=1 through I=9, etc.).</p>
              <p>• Distinguishes between Vowels (Soul Urge) and Consonants (Outer Personality).</p>
              <p>• Preserves Master Numbers (11, 22, 33) as higher vibrational expressions.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>Primary Focus:</span>
            <span className="text-sky-300 font-medium">Self-Expression Triad</span>
          </div>
        </div>

        {/* Indic Ank Jyotish Column */}
        <div className="p-6 rounded-2xl bg-stone-900/40 border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Category A / C • Vedic Graha
                </span>
                <h3 className="font-serif-title text-lg font-bold text-stone-100 mt-1.5">Indic Aṅka Jyotiṣa</h3>
              </div>
              <span className="text-xs text-stone-400 font-mono">Graha Resonance</span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-center">
              <div className="text-xs text-stone-400 mb-1">Nāmāṅka Synthesis</div>
              <div className="font-serif-title text-3xl font-bold text-emerald-300">
                {nameResults.chaldean.root} ({SINGLE_NUMBERS[nameResults.chaldean.root]?.sanskritName})
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Ruler: {SINGLE_NUMBERS[nameResults.chaldean.root]?.graha}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-stone-300 leading-relaxed">
              <p>• Harmonizes the Name Number (Nāmāṅka) with Solar Root (Mūlāṅka) and Destiny (Bhāgyāṅka).</p>
              <p>• Uses classical Mitra (Friend), Sama (Neutral), and Shatru (Enemy) relational algebra.</p>
              <p>• Connects numbers directly to planetary deities, gems, herbs, and directional energies.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>Primary Focus:</span>
            <span className="text-emerald-300 font-medium">Planetary Harmony</span>
          </div>
        </div>

      </div>

      {/* SANSKRIT KATAPAYADI SPECIALIZED DECRYPTION ENGINE */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-amber-500/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Category A — Classical Sanskrit Chronogram Engine
              </span>
              <span className="text-xs text-stone-400 font-mono">Aryabhatiya & Sadratnamala</span>
            </div>
            <h3 className="font-serif-title text-xl font-bold text-stone-100 mt-1 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              Katapayadi (कटपयादि) Numerical Decryption
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              The classical Indian alphanumeric cipher where Sanskrit consonants encode digits 0 through 9: 
              <em>"kādayaḥ prathamāḥ, tādayaḥ prathamāḥ, pādayaḥ prathamāḥ, yādayaḥ prathamāḥ"</em>.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">
              Input Indic Script (Devanagari / Gurmukhi)
            </label>
            <input
              type="text"
              value={indicText}
              onChange={e => setIndicText(e.target.value)}
              placeholder="e.g. पवन पाजी or आर्यभट"
              className="w-full lg:w-72 px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-amber-200 font-indic focus:outline-none focus:border-amber-500/80"
            />
          </div>
        </div>

        {/* Katapayadi Live Analysis Output */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="lg:col-span-2 p-4 rounded-xl bg-stone-950 border border-stone-800">
            <div className="text-xs font-semibold uppercase text-stone-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Phoneme Matched Digits
            </div>
            
            {katapayadiResults.matched.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {katapayadiResults.matched.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-stone-900 border border-stone-700/80 text-center min-w-[50px]">
                    <div className="text-lg font-indic text-amber-300">{m.char}</div>
                    <div className="text-xs font-mono font-bold text-stone-200 mt-1">{m.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 italic">
                No Sanskrit consonants recognized in input text. Try typing Devanagari consonants (क, ख, ग, घ, प, व, न, etc.).
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-stone-800 text-xs text-stone-400 font-mono">
              Consonant Sum: <strong className="text-amber-300">{katapayadiResults.sum}</strong> → Reduced Root: <strong className="text-amber-300">{katapayadiResults.root}</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2.5">
            <div className="text-xs font-semibold uppercase text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Classical Katapayadi Key
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-1.5 rounded bg-stone-900 border border-stone-800">Ka to Jha = 1..9, Ña=0</div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-800">Ta to Dha = 1..9, Na=0</div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-800">Pa to Ma = 1..5</div>
              <div className="p-1.5 rounded bg-stone-900 border border-stone-800">Ya to Ha = 1..8</div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed pt-1">
              Historically used by astronomers like Madhava of Sangamagrama to encode sine tables into poetic verses (anankasya vyavastha).
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
