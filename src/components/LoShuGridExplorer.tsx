/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Lo Shu Grid & Plane Analysis Explorer
 * Lead Architect & Numerology Codifier: Pawan Paji
 */

import React, { useState, useMemo } from 'react';
import { 
  Grid3X3, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Flame, 
  Droplets, 
  TreePine, 
  Mountain, 
  CircleDot, 
  Bookmark, 
  RotateCcw,
  Info,
  HelpCircle,
  Gem,
  Award
} from 'lucide-react';
import { generateLoShuAnalysis, LOSHU_PLANES_DEFINITIONS } from '../utils/loshu';
import { LoShuPlaneAnalysis } from '../types';
import { auth, saveReading, SavedReading } from '../services/firebase';

interface LoShuGridExplorerProps {
  initialDob?: string;
  initialName?: string;
}

export const LoShuGridExplorer: React.FC<LoShuGridExplorerProps> = ({
  initialDob = '1988-08-15',
  initialName = 'Seeker'
}) => {
  const [dob, setDob] = useState<string>(initialDob);
  const [name, setName] = useState<string>(initialName);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [mode, setMode] = useState<'vedic_hybrid' | 'pure_dob' | 'with_kua'>('vedic_hybrid');
  const [activePlaneId, setActivePlaneId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'planes' | 'missing' | 'frequency' | 'kua'>('planes');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [useSolarCutoff, setUseSolarCutoff] = useState<boolean>(true);

  // Check if born before Feb 4 (Li Chun solar year cutoff)
  const isBornBeforeFeb4 = useMemo(() => {
    const parts = dob.split('-').map(p => parseInt(p, 10));
    const m = parts[1] || 1;
    const d = parts[2] || 1;
    return m < 2 || (m === 2 && d < 4);
  }, [dob]);

  // Compute Lo Shu Analysis
  const analysis = useMemo(() => {
    return generateLoShuAnalysis(dob, { 
      mode, 
      gender,
      forceSolarAdjustment: isBornBeforeFeb4 ? useSolarCutoff : false
    });
  }, [dob, mode, gender, isBornBeforeFeb4, useSolarCutoff]);

  // Handle Plane Selection / Hover
  const activePlane = useMemo(() => {
    if (!activePlaneId) return null;
    return analysis.planes.find(p => p.id === activePlaneId) || null;
  }, [activePlaneId, analysis.planes]);

  const activeHighlightedNumbers = useMemo(() => {
    if (!activePlane) return new Set<number>();
    return new Set(activePlane.numbers);
  }, [activePlane]);

  // Save to Firebase Vault
  const handleSaveToVault = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in via Google in the top bar to save this reading to your Cloud Vault.');
      return;
    }

    try {
      setSaveStatus('saving');
      const reading: SavedReading = {
        id: `loshu_${Date.now()}`,
        userId: user.uid,
        title: `${name} — Lo Shu Grid & Plane Report`,
        type: 'loshu' as any,
        system: `Lo Shu Magic Square (${mode === 'vedic_hybrid' ? 'Vedic Composite' : mode === 'pure_dob' ? 'Pure DOB' : 'With Kua'})`,
        summary: `DOB: ${dob} • Mūlāṅka: ${analysis.mulankValue} • Bhāgyāṅka: ${analysis.bhagyankValue} • Yogas: ${analysis.yogas.goldenRajYoga ? 'Golden Raj Yoga (4-5-6), ' : ''}${analysis.yogas.silverRajYoga ? 'Silver Yoga (2-5-8)' : 'Balanced'}`,
        inputData: {
          name,
          dob,
          mode,
          gender,
          yogas: analysis.yogas,
          missingNumbers: analysis.missingNumbers
        },
        notes: `Planes complete: ${analysis.planes.filter(p => p.status === 'Complete').map(p => p.name).join(', ') || 'None'}`,
        createdAt: new Date().toISOString()
      };

      await saveReading(reading);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Error saving Lo Shu reading:', err);
      setSaveStatus('idle');
    }
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Wood': return <TreePine className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-amber-400" />;
      case 'Metal': return <CircleDot className="w-3.5 h-3.5 text-slate-300" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-sky-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Classical 3×3 Magic Square
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-stone-800 text-stone-300">
                Sum of Lines = 15
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100 tracking-tight">
              Lo Shu Grid &amp; Multi-Plane Analytical Engine
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed">
              Codified in ancient cosmological treatises and refined by Indian numerologists, the Lo Shu grid maps your date of birth across eight dimensional planes of mental intellect, heart intuition, physical stamina, and special prosperity yogas.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSaveToVault}
              disabled={saveStatus === 'saving'}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                saveStatus === 'saved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{saveStatus === 'saved' ? 'Saved to Vault!' : 'Save Reading to Vault'}</span>
            </button>
            <button
              onClick={() => {
                setDob('1988-08-15');
                setName('Seeker');
                setMode('vedic_hybrid');
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1.5"
              title="Reset to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Input Controls Bar */}
        <div className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5">
              Subject Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* DOB Field */}
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5">
              Date of Birth (YYYY-MM-DD)
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Gender Field for Kua */}
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5">
              Gender (for Kua Compass)
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other / Neutral</option>
            </select>
          </div>

          {/* Calculation Engine Mode */}
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5">
              Calculation Methodology
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="vedic_hybrid">Vedic Composite (DOB + Mūlāṅka + Bhāgyāṅka)</option>
              <option value="pure_dob">Pure Classical (DOB Digits Only)</option>
              <option value="with_kua">Extended (DOB + Mūlāṅka + Bhāgyāṅka + Kua)</option>
            </select>
          </div>

        </div>

        {/* Vital Stats Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-400">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
            <span className="text-stone-500">Mūlāṅka (Root):</span>
            <strong className="text-amber-400 font-mono text-sm">{analysis.mulankValue}</strong>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
            <span className="text-stone-500">Bhāgyāṅka (Destiny):</span>
            <strong className="text-amber-400 font-mono text-sm">{analysis.bhagyankValue}</strong>
          </span>
          {analysis.kuaNumber && (
            <button
              onClick={() => setActiveTab('kua')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/40 border border-sky-800/60 hover:border-sky-500 transition-all text-left group cursor-pointer"
              title="Click to view full Kua Compass & 8 Directional Analysis"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-45 transition-transform" />
              <span className="text-stone-400">Kua Number:</span>
              <strong className="text-sky-300 font-mono text-sm">{analysis.kuaNumber}</strong>
              <span className="text-[10px] text-sky-400/90 underline ml-0.5 font-sans">Explore Compass</span>
            </button>
          )}
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
            <span className="text-stone-500">Digits Present:</span>
            <strong className="text-stone-200 font-mono">{analysis.presentNumbers.length}/9</strong>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
            <span className="text-stone-500">Missing Numbers:</span>
            <strong className="text-rose-400 font-mono">{analysis.missingNumbers.join(', ') || 'None'}</strong>
          </span>
        </div>

        {/* Solar Year (Li Chun) Cutoff Notice if born before Feb 4 */}
        {isBornBeforeFeb4 && (
          <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-200">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Solar Year Cutoff:</strong> Born before Feb 4 (Li Chun / Spring Start). In classical Feng Shui, effective Solar Year is <strong>{analysis.kuaDetails?.solarYear}</strong> (Gregorian {analysis.kuaDetails?.gregorianYear} − 1).
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none shrink-0 font-medium text-amber-300">
              <input
                type="checkbox"
                checked={useSolarCutoff}
                onChange={(e) => setUseSolarCutoff(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>Apply Li Chun Cutoff</span>
            </label>
          </div>
        )}

      </div>

      {/* Main Grid & Interactive Display Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: 3x3 Lo Shu Magic Square Canvas (5 Cols on large) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-amber-400" />
                <h2 className="font-serif-title text-lg font-bold text-stone-100">
                  Interactive 3×3 Lo Shu Grid
                </h2>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">
                Click any cell or plane
              </span>
            </div>

            {/* The 3x3 Grid */}
            <div className="grid grid-cols-3 gap-3.5 aspect-square p-2 bg-stone-950/90 rounded-2xl border border-stone-800/80 shadow-inner">
              {[
                // Row 1: 4, 9, 2
                4, 9, 2,
                // Row 2: 3, 5, 7
                3, 5, 7,
                // Row 3: 8, 1, 6
                8, 1, 6
              ].map(num => {
                const cell = analysis.cells[num];
                const isHighlighted = activeHighlightedNumbers.has(num);
                const isPresent = cell.count > 0;

                return (
                  <div
                    key={num}
                    className={`relative rounded-xl p-3 flex flex-col justify-between transition-all duration-300 border ${
                      isHighlighted
                        ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/10 scale-[1.02] z-10'
                        : isPresent
                        ? 'border-stone-700/80 bg-stone-900/80 hover:border-stone-600'
                        : 'border-stone-800/40 bg-stone-950/40 opacity-50 hover:opacity-80'
                    }`}
                  >
                    {/* Top Row: Base Number & Element */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-stone-500 font-bold">
                        #{num}
                      </span>
                      <div className="flex items-center gap-1" title={`${cell.element} Element • ${cell.direction}`}>
                        {getElementIcon(cell.element)}
                        <span className="text-[10px] text-stone-400 hidden sm:inline">
                          {cell.element}
                        </span>
                      </div>
                    </div>

                    {/* Center: Dynamic Occurrences */}
                    <div className="my-auto text-center py-1">
                      {isPresent ? (
                        <div className="space-y-0.5">
                          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tracking-wider">
                            {Array(cell.count).fill(num).join('')}
                          </div>
                          <div className="text-[10px] font-mono text-stone-400">
                            {cell.count} {cell.count === 1 ? 'occurrence' : 'occurrences'}
                          </div>
                        </div>
                      ) : (
                        <div className="text-stone-600 text-lg font-mono tracking-widest font-light">
                          —
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Direction & Planetary Lord */}
                    <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-800/60">
                      <span className="truncate max-w-[55px]" title={cell.direction}>
                        {cell.direction.split('-')[0]}
                      </span>
                      <span className="truncate max-w-[65px] text-stone-500" title={cell.planetaryLord}>
                        {cell.planetaryLord.split(' ')[0]}
                      </span>
                    </div>

                    {/* Subtle Source Pill */}
                    {isPresent && (
                      <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5">
                        {cell.sourceBreakdown.fromMulank > 0 && (
                          <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[8px] flex items-center justify-center" title="Includes Mūlāṅka (Root)">
                            M
                          </span>
                        )}
                        {cell.sourceBreakdown.fromBhagyank > 0 && (
                          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-stone-950 font-bold text-[8px] flex items-center justify-center" title="Includes Bhāgyāṅka (Destiny)">
                            B
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid Legend & Methodology Note */}
            <div className="mt-4 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Active Cells
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-stone-700"></span>
                  Missing Elements
                </span>
              </div>
              <span className="text-[11px] text-stone-500">
                Lead Codifier: Pawan Paji
              </span>
            </div>
          </div>

          {/* Quick Yogas Summary Card */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Special Celestial Yogas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setActivePlaneId(activePlaneId === 'golden_raj_yoga' ? null : 'golden_raj_yoga')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  analysis.yogas.goldenRajYoga
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-stone-950/60 border-stone-800 text-stone-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>Golden Raj Yoga</span>
                  <span className="text-[10px] font-mono">4-5-6</span>
                </div>
                <p className="text-[11px] leading-tight">
                  {analysis.yogas.goldenRajYoga ? 'Active • Abundance & Fame' : 'Incomplete Line'}
                </p>
              </div>

              <div 
                onClick={() => setActivePlaneId(activePlaneId === 'silver_raj_yoga' ? null : 'silver_raj_yoga')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  analysis.yogas.silverRajYoga
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-stone-950/60 border-stone-800 text-stone-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>Silver Yoga (Earth)</span>
                  <span className="text-[10px] font-mono">2-5-8</span>
                </div>
                <p className="text-[11px] leading-tight">
                  {analysis.yogas.silverRajYoga ? 'Active • Land & Property' : 'Incomplete Line'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Deep Dive Tabbed Analysis (7 Cols on large) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Analysis View Tabs */}
          <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('planes')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'planes'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Planes of Expression ({analysis.planes.filter(p => p.status === 'Complete').length}/8 Active)</span>
            </button>

            <button
              onClick={() => setActiveTab('missing')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'missing'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Missing Numbers &amp; Remedies ({analysis.missingNumbers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('frequency')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'frequency'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Number Frequencies ({analysis.repeatedNumbers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('kua')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'kua'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Kua Compass &amp; Trigram ({analysis.kuaNumber ? `Gua ${analysis.kuaNumber}` : 'Directions'})</span>
            </button>
          </div>

          {/* TAB 1: Planes Analysis */}
          {activeTab === 'planes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                <span>Click any plane below to inspect full psychological breakdown and light up the 3×3 grid.</span>
                {activePlaneId && (
                  <button 
                    onClick={() => setActivePlaneId(null)}
                    className="text-amber-400 hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {analysis.planes.map(plane => {
                  const isSelected = activePlaneId === plane.id;

                  return (
                    <div
                      key={plane.id}
                      onClick={() => setActivePlaneId(isSelected ? null : plane.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                          : plane.status === 'Complete'
                          ? 'bg-stone-900/80 border-stone-800 hover:border-amber-500/40'
                          : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
                              <span>{plane.name}</span>
                              <span className="text-xs text-stone-500 font-mono font-normal">
                                [{plane.numbers.join('-')}]
                              </span>
                            </h4>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              plane.status === 'Complete'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : plane.status === 'Partial'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-stone-800 text-stone-500 border-stone-700'
                            }`}>
                              {plane.status === 'Complete' ? '100% Complete' : `${plane.completionPercentage}% Active`}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400">
                            {plane.hindiName} • Type: <span className="capitalize">{plane.type}</span>
                          </p>
                        </div>

                        {/* Visual Completion Dots */}
                        <div className="flex items-center gap-1 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                          {plane.numbers.map(num => {
                            const isPresent = analysis.cells[num].count > 0;
                            return (
                              <span
                                key={num}
                                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                                  isPresent
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : 'bg-stone-900 text-stone-600 border border-stone-800'
                                }`}
                              >
                                {num}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Expanded Details on Selection */}
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-3 text-xs animate-fade-in">
                          <div className="text-stone-300 leading-relaxed bg-stone-950/70 p-3 rounded-xl border border-stone-800/60">
                            <strong>Psychological Impact:</strong> {plane.psychologicalImpact}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1 bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/30 text-emerald-300">
                              <span className="font-semibold flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Manifest Strengths:
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-stone-300">
                                {plane.practicalStrengths.map((s, idx) => (
                                  <li key={idx}>{s}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-1 bg-rose-950/20 p-3 rounded-xl border border-rose-900/30 text-rose-300">
                              <span className="font-semibold flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                                Potential Blindspots:
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-stone-300">
                                {plane.potentialBlindspots.map((b, idx) => (
                                  <li key={idx}>{b}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {plane.vedicRemedy && (
                            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                              <strong>Scholarly Alignment Remedy:</strong> {plane.vedicRemedy}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Missing Numbers & Remedies */}
          {activeTab === 'missing' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-400">
                In classical Lo Shu and Vedic Aṅka Jyotiṣa, missing digits highlight dormant elemental channels that can be consciously fortified with direction-based Vastu adjustments, harmonic colors, and habits.
              </div>

              {analysis.missingNumbers.length === 0 ? (
                <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="text-base font-bold text-stone-100 font-serif-title">
                    Complete Omnipresent Matrix
                  </h4>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    All digits 1 through 9 are present in this calculation profile. The seeker commands representation across all five primordial elements.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analysis.remedies.map(rem => (
                    <div
                      key={rem.number}
                      className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono font-bold flex items-center justify-center text-sm">
                            #{rem.number}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-stone-100">
                              Missing Number {rem.number} • {rem.element} Element
                            </h4>
                            <p className="text-xs text-stone-400">
                              Direction: <strong className="text-stone-200">{rem.direction}</strong> • Planetary Lord: {rem.rulingPlanet}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-stone-800 text-amber-300">
                          Remedy Available
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                        {rem.impactDescription}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/60 space-y-1">
                          <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                            <Gem className="w-3.5 h-3.5" />
                            Crystal / Gemstone Resonance
                          </span>
                          <p className="text-stone-300 text-[11px]">{rem.crystalOrGem}</p>
                          <p className="text-stone-400 text-[11px]">Harmonic Color: {rem.colorRemedy}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/60 space-y-1">
                          <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" />
                            Vastu Elemental Adjustment
                          </span>
                          <p className="text-stone-300 text-[11px]">{rem.vastuElementCorrection}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-semibold text-stone-400">
                          Recommended Practical Daily Disciplines:
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-xs text-stone-300">
                          {rem.practicalCures.map((cure, cIdx) => (
                            <li key={cIdx}>{cure}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300 flex items-center justify-between">
                        <span>Vedic Mantra: {rem.mantraOrAffirmation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Number Frequency Analysis */}
          {activeTab === 'frequency' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-400">
                Number frequency determines whether a vibrational quality is gracefully balanced or manifesting as an over-amplified obsession or restlessness.
              </div>

              <div className="grid grid-cols-1 gap-3">
                {analysis.repeatedNumbers.map(item => (
                  <div
                    key={item.number}
                    className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-mono font-bold text-sm shrink-0">
                      {Array(item.count).fill(item.number).join('')}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-100 text-sm">
                          Number {item.number} ({item.count}x Frequency)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                          {item.count === 1 ? 'Balanced' : item.count === 2 ? 'Amplified Gift' : 'Intense Concentration'}
                        </span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {item.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Kua Compass & Trigram (Gua) */}
          {activeTab === 'kua' && analysis.kuaDetails && (
            <div className="space-y-6">
              
              {/* Kua Hero Card */}
              <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex flex-col items-center justify-center text-sky-300 shrink-0">
                      <span className="text-lg font-bold leading-none">{analysis.kuaDetails.trigram.split(' ')[0]}</span>
                      <span className="text-2xl font-mono font-bold leading-none mt-1">{analysis.kuaNumber}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/30">
                          {analysis.kuaDetails.group}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-stone-800 text-stone-300 flex items-center gap-1">
                          {getElementIcon(analysis.kuaDetails.element)}
                          <span>{analysis.kuaDetails.element} Element</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-stone-800 text-stone-300 font-mono">
                          {analysis.kuaDetails.direction}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-serif-title text-stone-100">
                        {analysis.kuaDetails.trigram}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Chinese: <span className="text-stone-300">{analysis.kuaDetails.trigramChinese}</span> • Vedic Correlate: <span className="text-stone-300">{analysis.kuaDetails.trigramVedic}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-right sm:border-l sm:border-stone-800 sm:pl-6 space-y-1 shrink-0">
                    <div className="text-stone-500">Ruling Planet &amp; Force</div>
                    <div className="font-semibold text-stone-200">{analysis.kuaDetails.rulingPlanet}</div>
                  </div>
                </div>
              </div>

              {/* Authentic Mathematical Calculation Walkthrough */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                      Standard Eight Mansions (Ba Zhai) Kua Derivation
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      Gender: {gender}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      Era: {analysis.kuaDetails.era}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Formula: {analysis.kuaDetails.formulaUsed}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  {analysis.kuaDetails.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300 shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-stone-300 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Number 5 Exception Alert */}
                {analysis.kuaDetails.transformedFromFive && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Taiji Central Palace 5 Exception Activated:</strong>
                      <p className="mt-1 leading-relaxed text-stone-300">
                        Because raw mathematical calculation yielded <strong>5</strong>, this person maps to the central Earth palace (Taiji) of the 3×3 square. Since 5 has no outer compass sector, classical Eight Mansions rules require:
                        <br />
                        • <strong>Male raw 5</strong> converts to <strong>Kua 2</strong> (Kun / Mother Earth / South-West)
                        <br />
                        • <strong>Female raw 5</strong> converts to <strong>Kua 8</strong> (Gen / Mountain Earth / North-East)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 8 Personal Compass Directions (4 Auspicious & 4 Inauspicious) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    4 Auspicious Directions (Orient Work Desk, Bed Head &amp; Main Entrance Here)
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-medium">Beneficial Chi</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {analysis.kuaDetails.auspiciousDirections.map(dir => (
                    <div
                      key={dir.type}
                      className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/40 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            {dir.type}
                          </span>
                          <span className="text-xs font-bold text-stone-100">{dir.englishTitle}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">{dir.direction}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        {dir.sanskritOrChineseName} • {dir.compassDegree}
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed pt-1 border-t border-stone-800/80">
                        {dir.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    4 Inauspicious Directions (Avoid Facing During Critical Negotiations &amp; Sleep)
                  </h4>
                  <span className="text-[11px] text-rose-400 font-medium">Conflicting Chi</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {analysis.kuaDetails.inauspiciousDirections.map(dir => (
                    <div
                      key={dir.type}
                      className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-rose-500/40 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                            {dir.type}
                          </span>
                          <span className="text-xs font-bold text-stone-100">{dir.englishTitle}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-rose-400">{dir.direction}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        {dir.sanskritOrChineseName} • {dir.compassDegree}
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed pt-1 border-t border-stone-800/80">
                        {dir.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors, Numbers & Lifestyle Vastu Alignment */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Kua Environmental Synergy &amp; Color Palette
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
                    <span className="text-stone-400 font-semibold block">Auspicious Colors:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.kuaDetails.luckyColors.map((color, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
                    <span className="text-stone-400 font-semibold block">Inauspicious Colors:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.kuaDetails.unluckyColors.map((color, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
                    <span className="text-stone-400 font-semibold block">Harmonious Numbers:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.kuaDetails.luckyNumbers.map(num => (
                        <span key={num} className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/50 border border-stone-800/80 text-xs text-stone-400 leading-relaxed">
                  <strong className="text-stone-200">Eight Mansions Group Harmony: </strong>
                  {analysis.kuaDetails.group.includes('East') ? (
                    <span>
                      As an <strong>East Group (Dong Si Ming)</strong> individual, your energy field resonates with Water (1), Wood (3, 4), and Fire (9). Your favorable compass sectors are <strong>North, East, South-East, and South</strong>.
                    </span>
                  ) : (
                    <span>
                      As a <strong>West Group (Xi Si Ming)</strong> individual, your energy field resonates with Earth (2, 8) and Metal (6, 7). Your favorable compass sectors are <strong>West, North-West, South-West, and North-East</strong>.
                    </span>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
