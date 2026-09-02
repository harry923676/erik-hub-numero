/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA (अङ्कवेद) — Numerology Intelligence Platform
 * Lead Architect & Developer: Pawan Paji
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { PersonalDashboard } from './components/PersonalDashboard';
import { SystemComparator } from './components/SystemComparator';
import { NameLab } from './components/NameLab';
import { CompatibilityMatrix } from './components/CompatibilityMatrix';
import { BusinessNumerology } from './components/BusinessNumerology';
import { BabyNameExplorer } from './components/BabyNameExplorer';
import { Numeropedia } from './components/Numeropedia';
import { AIAssistant } from './components/AIAssistant';
import { LoShuGridExplorer } from './components/LoShuGridExplorer';
import { DeveloperModal } from './components/DeveloperModal';
import { ReportModal } from './components/ReportModal';
import { Footer } from './components/Footer';
import { generateCoreProfile } from './utils/numerology';
import { auth, fetchUserProfile, testFirestoreConnection } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  
  // User Inputs for Core Profile
  const [nameInput, setNameInput] = useState('Pawan Kumar');
  const [dobInput, setDobInput] = useState('1987-10-27');

  // Modals
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Validate connection to Firestore on boot and load saved profile if available
  useEffect(() => {
    testFirestoreConnection();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const saved = await fetchUserProfile(user.uid);
        if (saved?.savedName && saved?.savedDob) {
          setNameInput(saved.savedName);
          setDobInput(saved.savedDob);
        }
      }
    });

    return () => unsub();
  }, []);

  // Compute Core Numbers profile dynamically
  const profile = useMemo(() => {
    return generateCoreProfile(nameInput, dobInput);
  }, [nameInput, dobInput]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Header with Navigation & Developer Attribution */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main Tab Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'dashboard' && (
          <PersonalDashboard
            profile={profile}
            nameInput={nameInput}
            dobInput={dobInput}
            setNameInput={setNameInput}
            setDobInput={setDobInput}
            onSelectSystemForAnalysis={() => setActiveTab('systems')}
            onNavigateToLoShu={() => setActiveTab('loshu')}
          />
        )}

        {activeTab === 'loshu' && (
          <LoShuGridExplorer
            initialDob={dobInput}
            initialName={nameInput}
          />
        )}

        {activeTab === 'systems' && (
          <SystemComparator initialName={nameInput} />
        )}

        {activeTab === 'namelab' && (
          <NameLab birthNumber={profile.mulank.value} />
        )}

        {activeTab === 'compatibility' && (
          <CompatibilityMatrix />
        )}

        {activeTab === 'business' && (
          <BusinessNumerology />
        )}

        {activeTab === 'babynames' && (
          <BabyNameExplorer />
        )}

        {activeTab === 'numeropedia' && (
          <Numeropedia />
        )}

        {activeTab === 'ai_assistant' && (
          <AIAssistant profile={profile} />
        )}

      </main>

      {/* Footer with Source Mandate & Pawan Paji Attribution */}
      <Footer
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Lead Developer Pawan Paji Tribute Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />

      {/* Comprehensive Printable Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        profile={profile}
      />

    </div>
  );
}
