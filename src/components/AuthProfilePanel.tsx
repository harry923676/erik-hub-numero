import React, { useState, useEffect } from 'react';
import { 
  LogIn, 
  LogOut, 
  User as UserIcon, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  FolderHeart, 
  Check, 
  X,
  Loader2,
  Sparkles
} from 'lucide-react';
import { 
  auth, 
  signInWithGoogle, 
  logOut, 
  saveReading, 
  fetchUserReadings, 
  deleteReading, 
  SavedReading, 
  saveUserProfile, 
  fetchUserProfile 
} from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { CoreNumbersProfile } from '../types';

interface AuthProfilePanelProps {
  currentProfile: CoreNumbersProfile;
  nameInput: string;
  dobInput: string;
  onApplySavedProfile?: (name: string, dob: string) => void;
}

export const AuthProfilePanel: React.FC<AuthProfilePanelProps> = ({
  currentProfile,
  nameInput,
  dobInput,
  onApplySavedProfile
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [savedReadings, setSavedReadings] = useState<SavedReading[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [readingsModalOpen, setReadingsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
      if (user) {
        loadReadings(user.uid);
      } else {
        setSavedReadings([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadReadings = async (uid: string) => {
    const list = await fetchUserReadings(uid);
    setSavedReadings(list);
  };

  const handleSignIn = async () => {
    try {
      setLoadingAuth(true);
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Sign-in error:', err);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setReadingsModalOpen(false);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleSaveCurrentReading = async () => {
    if (!currentUser) {
      handleSignIn();
      return;
    }

    try {
      setIsSaving(true);
      const newReading: SavedReading = {
        id: `reading_${Date.now()}`,
        userId: currentUser.uid,
        title: currentProfile.name || 'Personal Numerology Chart',
        type: 'personal',
        system: 'Chaldean, Pythagorean & Indic',
        summary: `Mūlāṅka: ${currentProfile.mulank.value}, Bhāgyāṅka: ${currentProfile.bhagyank.value}, Chaldean: ${currentProfile.chaldeanName.compoundValue}/${currentProfile.chaldeanName.rootValue}`,
        inputData: {
          name: nameInput,
          dob: dobInput,
          savedAt: new Date().toISOString()
        },
        notes: `Universal Year: ${currentProfile.personalCycles.universalYear}, Personal Year: ${currentProfile.personalCycles.personalYear}`,
        createdAt: new Date().toISOString()
      };

      await saveReading(newReading);
      
      // Also remember preferred default profile
      await saveUserProfile({
        uid: currentUser.uid,
        savedName: nameInput,
        savedDob: dobInput,
        updatedAt: new Date().toISOString()
      });

      await loadReadings(currentUser.uid);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to save reading:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReading = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    try {
      await deleteReading(currentUser.uid, id);
      setSavedReadings(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error deleting reading:', err);
    }
  };

  const handleLoadReading = (reading: SavedReading) => {
    if (reading.inputData?.name && reading.inputData?.dob && onApplySavedProfile) {
      onApplySavedProfile(reading.inputData.name, reading.inputData.dob);
      setReadingsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {loadingAuth ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
          <span>Connecting Auth...</span>
        </div>
      ) : currentUser ? (
        <div className="flex items-center gap-2">
          {/* User Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-800 text-xs text-stone-200">
            {currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Avatar" 
                className="w-5 h-5 rounded-full border border-amber-400/50" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <UserIcon className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="font-medium truncate max-w-[110px] sm:max-w-[160px]">
              {currentUser.displayName || currentUser.email || 'User'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Cloud Sync
            </span>
          </div>

          {/* Save Current Chart Button */}
          <button
            onClick={handleSaveCurrentReading}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              saveSuccess 
                ? 'bg-emerald-600 text-white border border-emerald-500'
                : 'bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300'
            }`}
            title="Save this chart to your Firestore cloud vault"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span>{saveSuccess ? 'Saved' : 'Save Chart'}</span>
          </button>

          {/* View Vault Readings Button */}
          <button
            onClick={() => setReadingsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 transition-colors"
            title="View saved numerology profiles in Firestore"
          >
            <FolderHeart className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Saved Vault</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-800 text-[10px] font-mono text-amber-300">
              {savedReadings.length}
            </span>
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            title="Sign out of Firebase"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold shadow-sm transition-all"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Google Sign-In</span>
        </button>
      )}

      {/* Saved Vault Modal */}
      {readingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold">
                  <FolderHeart className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-serif-title font-bold text-stone-100">
                    Saved Numerology Charts Vault
                  </h3>
                  <p className="text-xs text-stone-400">
                    Synchronized with Google Firebase Firestore for {currentUser?.displayName || currentUser?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReadingsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {savedReadings.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <BookmarkCheck className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-sm text-stone-400">No saved charts in your cloud vault yet.</p>
                  <p className="text-xs text-stone-500">
                    Click "Save Chart" on any profile to synchronize your calculations securely.
                  </p>
                </div>
              ) : (
                savedReadings.map(reading => (
                  <div
                    key={reading.id}
                    onClick={() => handleLoadReading(reading)}
                    className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                          {reading.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-400">
                          {reading.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 font-mono">
                        {reading.summary}
                      </p>
                      {reading.inputData?.dob && (
                        <p className="text-[11px] text-stone-500">
                          DOB: {reading.inputData.dob} • Saved: {new Date(reading.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Load &rarr;
                      </span>
                      <button
                        onClick={(e) => handleDeleteReading(reading.id, e)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                        title="Delete reading from Firestore"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-800 bg-stone-950/40 flex items-center justify-between text-xs text-stone-400">
              <span>Security: Zero-trust attribute-based Firestore rules active</span>
              <button
                onClick={() => setReadingsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
