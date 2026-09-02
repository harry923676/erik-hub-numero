/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Navigation Header Component
 * Architect & Developer: Pawan Paji
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  FileText, 
  Menu, 
  X, 
  Cpu, 
  Compass, 
  Layers, 
  BookOpen, 
  Users, 
  Briefcase, 
  Baby, 
  MessageSquare,
  Grid3X3
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'loshu'
  | 'systems'
  | 'namelab'
  | 'compatibility'
  | 'business'
  | 'babynames'
  | 'numeropedia'
  | 'ai_assistant';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenDeveloperModal: () => void;
  onOpenReportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDeveloperModal,
  onOpenReportModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Personal Profile', icon: <Compass className="w-4 h-4" /> },
    { id: 'loshu', label: 'Lo Shu Grid & Planes', icon: <Grid3X3 className="w-4 h-4" />, badge: 'New' },
    { id: 'systems', label: 'Systems & Katapayadi', icon: <Layers className="w-4 h-4" /> },
    { id: 'namelab', label: 'Name Lab & Comparator', icon: <Cpu className="w-4 h-4" /> },
    { id: 'compatibility', label: 'Compatibility Matrix', icon: <Users className="w-4 h-4" /> },
    { id: 'business', label: 'Business & Brand', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'babynames', label: 'Baby Name Explorer', icon: <Baby className="w-4 h-4" /> },
    { id: 'numeropedia', label: 'Numeropedia & Sources', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ai_assistant', label: 'Ask AI Assistant', icon: <MessageSquare className="w-4 h-4" />, badge: 'Gemini' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif-title font-bold text-xl shadow-inner">
              अ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-title text-xl font-bold tracking-wider text-stone-100">
                  ERIK-HUB Numero
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-mono bg-stone-900 border border-stone-700 text-stone-300">
                  अङ्कवेद
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans tracking-wide">
                Numerology Intelligence Platform
              </p>
            </div>
          </div>

          {/* Center / Right Controls & Developer Pill */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Developer Tribute Pill */}
            <button
              onClick={onOpenDeveloperModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800/80 border border-amber-500/40 text-xs text-stone-200 transition-all hover:border-amber-400 group"
              title="View contributions by Lead Developer Pawan Paji"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Architect: <strong className="text-amber-300 font-semibold group-hover:text-amber-200">Pawan Paji</strong></span>
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            </button>

            {/* Dossier Report Button */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Dossier</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenDeveloperModal}
              className="p-2 rounded-lg bg-stone-900 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Pawan Paji</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Desktop Navigation Tabs */}
        <div className="hidden lg:flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-stone-800/60">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-800 space-y-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                      : 'text-stone-300 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            
            <div className="pt-3 mt-2 border-t border-stone-800 flex gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReportModal();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-stone-900 text-stone-200 text-xs font-medium border border-stone-700"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                Export Dossier
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDeveloperModal();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/40"
              >
                <UserCheck className="w-4 h-4" />
                Pawan Paji
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
