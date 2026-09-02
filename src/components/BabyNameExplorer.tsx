/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Baby Name Explorer & Linguistic Origin Matrix
 * Researched & Curated by Pawan Paji
 */

import React, { useState } from 'react';
import { Baby, Search, Filter, BookOpen, Sparkles, Check, Bookmark } from 'lucide-react';
import { BABY_NAMES_DATA } from '../data/babyNames';
import { SINGLE_NUMBERS } from '../data/numbers';

export const BabyNameExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [targetNumber, setTargetNumber] = useState<string>('All');

  const filteredNames = BABY_NAMES_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.script.includes(searchQuery);
    const matchesLang = selectedLanguage === 'All' || item.language === selectedLanguage;
    const matchesGender = selectedGender === 'All' || item.gender === selectedGender;
    const matchesNum = targetNumber === 'All' || item.chaldeanRoot.toString() === targetNumber;
    return matchesSearch && matchesLang && matchesGender && matchesNum;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Linguistic & Etymological Heritage
        </span>
        <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
          <Baby className="w-5 h-5 text-amber-400" />
          Harmonic Baby Name & Script Explorer
        </h2>
        <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Curated classical names grounded in authentic Sanskrit, Prakrit, Dravidian, and Indic canonical texts with verified Chaldean compounds and Graha alignments.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Search Name or Meaning</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="e.g. Pawan, light, wisdom..."
                className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Tradition / Origin</label>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Traditions</option>
              <option value="Sanskrit">Sanskrit (Classical)</option>
              <option value="Hindi">Hindi / North Indic</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Telugu">Telugu</option>
              <option value="Tamil">Tamil</option>
              <option value="Bengali">Bengali</option>
              <option value="Buddhist">Buddhist Canon</option>
              <option value="Jain">Jain Agamas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Gender</label>
            <select
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Genders</option>
              <option value="Male">Boy (Male)</option>
              <option value="Female">Girl (Female)</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Target Chaldean Root</label>
            <select
              value={targetNumber}
              onChange={e => setTargetNumber(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">Any Number (1-9)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <option key={n} value={n.toString()}>
                  Number {n} ({SINGLE_NUMBERS[n]?.graha})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Results Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNames.map(item => (
          <div 
            key={item.id}
            className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                    {item.language} • {item.gender}
                  </span>
                  <h3 className="font-serif-title text-xl font-bold text-stone-100 mt-1.5 flex items-baseline gap-2">
                    <span>{item.name}</span>
                    <span className="font-indic text-sm text-amber-300/80 font-normal">{item.script}</span>
                  </h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-stone-950 border border-amber-500/40 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] text-stone-500 uppercase leading-none">Chaldean</span>
                  <span className="font-serif-title text-sm font-bold text-amber-300 leading-tight">
                    {item.chaldeanCompound}/{item.chaldeanRoot}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs text-stone-300 leading-relaxed font-medium">
                "{item.meaning}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 text-[11px] space-y-1">
              <div className="flex justify-between text-stone-400">
                <span>Governing Deity / Graha:</span>
                <span className="text-amber-300 font-medium">{item.rulingPlanet}</span>
              </div>
              <div className="text-stone-500 truncate" title={item.sourceReference}>
                Ref: {item.sourceReference}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNames.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-stone-900/30 border border-stone-800 text-stone-400">
          <p className="text-sm">No names match your current filter selection. Try resetting filters.</p>
        </div>
      )}

    </div>
  );
};
