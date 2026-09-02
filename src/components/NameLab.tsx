/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Name Lab & Multi-Name Harmonic Comparator
 * Architect: Pawan Paji
 */

import React, { useState } from 'react';
import { Cpu, Plus, Trash2, ArrowRight, Sparkles, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { calculateNameNumbers, reduceToSingleDigit } from '../utils/numerology';
import { COMPOUND_NUMBERS, SINGLE_NUMBERS } from '../data/numbers';

interface NameLabProps {
  birthNumber: number; // user's mulank
}

export const NameLab: React.FC<NameLabProps> = ({ birthNumber }) => {
  // Multi-Name Comparator items
  const [namesList, setNamesList] = useState<string[]>([
    'Pawan Kumar',
    'Pawan Kuhmar',
    'H Pawan Kumar',
    'Pawan Paji'
  ]);
  const [newNameInput, setNewNameInput] = useState('');

  // Interactive Optimizer Lab
  const [originalName, setOriginalName] = useState('Pawan Kumar');
  const [modifiedName, setModifiedName] = useState('Pawan Paji');

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNameInput.trim() && !namesList.includes(newNameInput.trim())) {
      setNamesList([...namesList, newNameInput.trim()]);
      setNewNameInput('');
    }
  };

  const handleRemoveName = (nameToRemove: string) => {
    setNamesList(namesList.filter(n => n !== nameToRemove));
  };

  // Optimization Lab calculations
  const origCalc = calculateNameNumbers(originalName);
  const modCalc = calculateNameNumbers(modifiedName);

  const origCompoundInfo = COMPOUND_NUMBERS[origCalc.chaldean.compound];
  const modCompoundInfo = COMPOUND_NUMBERS[modCalc.chaldean.compound];

  const birthRuler = SINGLE_NUMBERS[birthNumber] || SINGLE_NUMBERS[1];

  // Harmony calculation
  const getHarmonyBadge = (rootVal: number) => {
    if (birthRuler.friends.includes(rootVal)) {
      return { label: 'High Harmony', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
    }
    if (birthRuler.enemies.includes(rootVal)) {
      return { label: 'Dynamic / Friction', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
    }
    return { label: 'Neutral Resonance', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* SECTION 1: NAME OPTIMIZATION LAB */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Interactive Vibrational Sandbox
            </span>
            <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              Name Optimization Lab
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              Examine the step-by-step transformation when adjusting letters, vowels, or initials. Every modification transparently computes the compound delta and its alignment with your Birth Number ({birthNumber} • {birthRuler.graha}).
            </p>
          </div>
        </div>

        {/* Inputs for comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Original Base Name
            </label>
            <input
              type="text"
              value={originalName}
              onChange={e => setOriginalName(e.target.value)}
              className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:border-amber-500/80"
              placeholder="e.g. Pawan Kumar"
            />
            
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-baseline justify-between text-xs">
              <span className="text-stone-400">Chaldean Compound:</span>
              <span className="font-mono text-base font-bold text-stone-200">
                {origCalc.chaldean.compound} → Root {origCalc.chaldean.root}
              </span>
            </div>
            <div className="mt-1 text-xs text-stone-400 truncate">
              {origCompoundInfo ? origCompoundInfo.title : `Root ${origCalc.chaldean.root} (${SINGLE_NUMBERS[origCalc.chaldean.root]?.graha})`}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40">
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
              Modified / Optimized Variation
            </label>
            <input
              type="text"
              value={modifiedName}
              onChange={e => setModifiedName(e.target.value)}
              className="w-full px-3.5 py-2 bg-stone-900 border border-amber-500/50 rounded-lg text-sm text-amber-200 font-semibold focus:outline-none focus:border-amber-400"
              placeholder="e.g. Pawan Paji"
            />

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-baseline justify-between text-xs">
              <span className="text-stone-400">New Chaldean Compound:</span>
              <span className="font-mono text-base font-bold text-amber-300">
                {modCalc.chaldean.compound} → Root {modCalc.chaldean.root}
              </span>
            </div>
            <div className="mt-1 text-xs text-amber-200/90 truncate font-medium">
              {modCompoundInfo ? modCompoundInfo.title : `Root ${modCalc.chaldean.root} (${SINGLE_NUMBERS[modCalc.chaldean.root]?.graha})`}
            </div>
          </div>
        </div>

        {/* Step-by-Step Delta Impact Card */}
        <div className="mt-6 p-5 rounded-xl bg-stone-950/80 border border-stone-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Vibrational Delta Analysis
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-stone-500 block mb-1">Compound Shift:</span>
              <div className="font-mono text-base font-bold text-stone-200">
                {origCalc.chaldean.compound} <ArrowRight className="inline w-3.5 h-3.5 text-amber-400 mx-1" /> {modCalc.chaldean.compound}
              </div>
              <span className="text-stone-400 text-[11px] mt-1 block">
                Net change: {modCalc.chaldean.compound - origCalc.chaldean.compound > 0 ? `+${modCalc.chaldean.compound - origCalc.chaldean.compound}` : modCalc.chaldean.compound - origCalc.chaldean.compound}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-stone-500 block mb-1">Governing Planetary Shift:</span>
              <div className="text-xs font-bold text-stone-200 mt-1">
                {SINGLE_NUMBERS[origCalc.chaldean.root]?.graha} → <span className="text-amber-300">{SINGLE_NUMBERS[modCalc.chaldean.root]?.graha}</span>
              </div>
              <span className="text-stone-400 text-[11px] mt-1 block">
                Root {origCalc.chaldean.root} to Root {modCalc.chaldean.root}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-stone-500 block mb-1">Harmony with Birth Number ({birthNumber}):</span>
              <div className="mt-1">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getHarmonyBadge(modCalc.chaldean.root).color}`}>
                  {getHarmonyBadge(modCalc.chaldean.root).label}
                </span>
              </div>
              <span className="text-stone-400 text-[11px] mt-1.5 block">
                Vedic Graha Resonance
              </span>
            </div>
          </div>

          {modCompoundInfo && (
            <div className="mt-4 p-3 rounded-lg bg-stone-900/60 border border-amber-500/20 text-xs text-stone-300">
              <strong className="text-amber-300 block mb-1">{modCompoundInfo.title} ({modCalc.chaldean.compound}):</strong>
              <p className="leading-relaxed">{modCompoundInfo.symbolism}</p>
              <p className="mt-1 text-stone-400 italic">Guidance: {modCompoundInfo.practicalGuidance}</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: MULTI-NAME COMPARISON DASHBOARD */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <h3 className="font-serif-title text-lg font-bold text-stone-100">
              Multi-Name Comparative Dashboard
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Compare multiple spelling permutations simultaneously to find the optimum vibrational balance.
            </p>
          </div>

          {/* Add custom name input */}
          <form onSubmit={handleAddName} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newNameInput}
              onChange={e => setNewNameInput(e.target.value)}
              placeholder="Add variant name..."
              className="px-3 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500/80"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        </div>

        {/* Names Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Name Variant</th>
                <th className="py-3 px-3">Chaldean Compound</th>
                <th className="py-3 px-3">Chaldean Root</th>
                <th className="py-3 px-3">Pythagorean Root</th>
                <th className="py-3 px-3">Governing Graha</th>
                <th className="py-3 px-3">Birth Harmony</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-sans">
              {namesList.map((name, i) => {
                const res = calculateNameNumbers(name);
                const badge = getHarmonyBadge(res.chaldean.root);
                const isSelected = name === modifiedName;

                return (
                  <tr key={i} className={`hover:bg-stone-800/40 transition-colors ${isSelected ? 'bg-amber-500/5' : ''}`}>
                    <td className="py-3.5 px-3 font-medium text-stone-100 flex items-center gap-2">
                      <span>{name}</span>
                      {name === 'Pawan Paji' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Lead Architect
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-purple-300">
                      {res.chaldean.compound}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-stone-200">
                      {res.chaldean.root}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-sky-300">
                      {res.pythagorean.root}
                    </td>
                    <td className="py-3.5 px-3 text-stone-300">
                      {SINGLE_NUMBERS[res.chaldean.root]?.graha}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      <button
                        onClick={() => setModifiedName(name)}
                        className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                      >
                        Inspect
                      </button>
                      {namesList.length > 1 && (
                        <button
                          onClick={() => handleRemoveName(name)}
                          className="text-stone-500 hover:text-rose-400 p-1"
                          title="Remove name"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
