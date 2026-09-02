/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Numeropedia & Source Intelligence Library
 * Architect: Pawan Paji
 */

import React, { useState } from 'react';
import { BookOpen, Search, ShieldCheck, Layers, FileText, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { SINGLE_NUMBERS, COMPOUND_NUMBERS } from '../data/numbers';
import { KNOWLEDGE_SOURCES, SOURCE_TAXONOMY } from '../data/sources';
import { SourceCategory } from '../types';

export const Numeropedia: React.FC = () => {
  const [subView, setSubView] = useState<'numbers' | 'sources' | 'compounds'>('numbers');
  const [selectedDigit, setSelectedDigit] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const activeNumber = SINGLE_NUMBERS[selectedDigit] || SINGLE_NUMBERS[1];

  const filteredSources = KNOWLEDGE_SOURCES.filter(src => {
    const matchesSearch = src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          src.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          src.tradition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || src.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Source-First Epistemological Engine
            </span>
            <h2 className="text-xl font-serif-title font-bold text-stone-100 mt-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Numeropedia & Source Intelligence Repository
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              Curated by <strong>Pawan Paji</strong> to preserve rigorous distinctions between classical Sanskrit manuscripts, academic scholarship, living tradition, and modern numerical codifications.
            </p>
          </div>

          {/* Sub-view switcher */}
          <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800 text-xs">
            <button
              onClick={() => setSubView('numbers')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                subView === 'numbers' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Numbers 1–9
            </button>
            <button
              onClick={() => setSubView('compounds')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                subView === 'compounds' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Compounds 10–52
            </button>
            <button
              onClick={() => setSubView('sources')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                subView === 'sources' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Source Catalog
            </button>
          </div>
        </div>

        {/* 5-Tier Taxonomy Legend */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {Object.entries(SOURCE_TAXONOMY).map(([cat, info]) => (
            <div key={cat} className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 text-[11px]">
              <span className="font-semibold text-amber-300 block">{cat}</span>
              <span className="text-stone-400 text-[10px] leading-tight block mt-0.5">{info.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SUBVIEW 1: NUMBERS 1 TO 9 EXPLORER */}
      {subView === 'numbers' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left: Digit Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Select Number
            </label>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => {
                const item = SINGLE_NUMBERS[digit];
                const isSelected = selectedDigit === digit;
                return (
                  <button
                    key={digit}
                    onClick={() => setSelectedDigit(digit)}
                    className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                        : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif-title text-xl font-bold">{digit}</span>
                      <div>
                        <div className="text-xs font-semibold">{item.sanskritName}</div>
                        <div className="text-[10px] text-stone-400">{item.graha}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Number Deep Dive */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeNumber.sanskritName} • Deity: {activeNumber.deity}
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-stone-100 mt-2">
                  Number {activeNumber.digit}: {activeNumber.indicTitle}
                </h3>
                <p className="text-xs text-stone-300 mt-1">{activeNumber.archetype}</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-amber-500/40 flex items-center justify-center font-serif-title text-3xl font-bold text-amber-300 shadow-inner">
                {activeNumber.digit}
              </div>
            </div>

            {/* Three System Perspectives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/30">
                <span className="font-semibold text-emerald-300 block mb-1">Classical Indic Tradition</span>
                <p className="text-stone-300 leading-relaxed">{activeNumber.indicTradition}</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-purple-500/30">
                <span className="font-semibold text-purple-300 block mb-1">Chaldean Acoustic Meaning</span>
                <p className="text-stone-300 leading-relaxed">{activeNumber.chaldeanTradition}</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-sky-500/30">
                <span className="font-semibold text-sky-300 block mb-1">Pythagorean Geometry</span>
                <p className="text-stone-300 leading-relaxed">{activeNumber.pythagoreanTradition}</p>
              </div>
            </div>

            {/* Planetary Relational Matrix */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-stone-400 block">
                Vedic Graha Relational Algebra (Bṛhat Saṁhitā):
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-stone-900 border border-stone-800">
                  <span className="text-emerald-400 font-bold block">Mitra (Friends):</span>
                  <span className="text-stone-300">{activeNumber.friends.join(', ')}</span>
                </div>
                <div className="p-2 rounded bg-stone-900 border border-stone-800">
                  <span className="text-amber-400 font-bold block">Sama (Neutral):</span>
                  <span className="text-stone-300">{activeNumber.neutrals.join(', ') || 'None'}</span>
                </div>
                <div className="p-2 rounded bg-stone-900 border border-stone-800">
                  <span className="text-rose-400 font-bold block">Shatru (Inimical):</span>
                  <span className="text-stone-300">{activeNumber.enemies.join(', ') || 'None'}</span>
                </div>
              </div>
            </div>

            {/* Citations & Sources */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Verified Sources: {activeNumber.sources.map(s => s.title).join(' • ')}</span>
              <span className="text-amber-400 font-semibold">Researched by Pawan Paji</span>
            </div>

          </div>

        </div>
      )}

      {/* SUBVIEW 2: COMPOUNDS 10 TO 52 */}
      {subView === 'compounds' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(COMPOUND_NUMBERS).map(cp => (
            <div key={cp.number} className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {cp.sourceCategory} • Compound
                    </span>
                    <h4 className="font-serif-title text-lg font-bold text-stone-100 mt-1">{cp.title}</h4>
                    <p className="text-xs text-amber-300/80">{cp.archetype}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-stone-950 border border-purple-500/40 flex items-center justify-center font-serif-title text-xl font-bold text-purple-300">
                    {cp.number}
                  </div>
                </div>

                <p className="mt-3 text-xs text-stone-300 leading-relaxed">{cp.symbolism}</p>
              </div>

              <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
                <div><strong className="text-stone-300">Guidance:</strong> {cp.practicalGuidance}</div>
                <div className="text-stone-500 text-[10px]">Ref: {cp.primaryReference}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBVIEW 3: SOURCE CATALOG */}
      {subView === 'sources' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search manuscripts, authors (Varāhamihira, Aryabhata, Cheiro)..."
                className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Categories (A–E)</option>
              <option value="Category A">Category A (Classical Treatises)</option>
              <option value="Category B">Category B (Academic Publications)</option>
              <option value="Category C">Category C (Living Lineages)</option>
              <option value="Category D">Category D (Modern Codifications)</option>
              <option value="Category E">Category E (AI Interpretation)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSources.map(src => (
              <div key={src.id} className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                      {src.category} • {src.sourceType}
                    </span>
                    <h4 className="font-serif-title text-base font-bold text-stone-100 mt-1">{src.title}</h4>
                    <p className="text-xs text-stone-400">Author: {src.author} ({src.historicalPeriod})</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                  {src.translation}
                </div>

                <div className="text-[11px] text-stone-400 space-y-0.5">
                  <div>Academic Ref: <span className="text-stone-300">{src.academicReference}</span></div>
                  <div>Tradition: <span className="text-stone-300">{src.tradition}</span></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
