import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  getDocFromServer,
  Firestore 
} from 'firebase/firestore';
import { firebaseConfig } from '../config/firebaseConfig';

// Initialize Firebase App safely
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

// Validate connection once on client load as instructed in guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline or connecting.');
    }
    return false;
  }
}

// User Profile Types
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  savedName?: string;
  savedDob?: string;
  savedSystem?: string;
  updatedAt: string;
}

export interface SavedReading {
  id: string;
  userId: string;
  title: string;
  type: 'personal' | 'business' | 'compatibility' | 'name_lab' | 'custom';
  system?: string;
  inputData?: Record<string, any>;
  summary?: string;
  notes?: string;
  createdAt: string;
}

// Auth Helpers
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  
  // Sync basic user document in Firestore
  if (user) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const existing = await getDoc(userRef);
      const profileData: Partial<UserProfile> = {
        uid: user.uid,
        displayName: user.displayName || 'Seeker',
        email: user.email || '',
        photoURL: user.photoURL || '',
        updatedAt: new Date().toISOString()
      };
      if (!existing.exists()) {
        await setDoc(userRef, profileData, { merge: true });
      }
    } catch (e) {
      console.warn('Could not sync user profile to firestore:', e);
    }
  }
  return user;
}

export async function logOut(): Promise<void> {
  await signOut(auth);
}

// User Data Sync
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn('Error fetching user profile:', err);
  }
  return null;
}

export async function saveUserProfile(profile: Partial<UserProfile> & { uid: string }): Promise<void> {
  try {
    const userRef = doc(db, 'users', profile.uid);
    await setDoc(userRef, {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error updating user profile:', err);
    throw err;
  }
}

// Readings Persistence
export async function fetchUserReadings(uid: string): Promise<SavedReading[]> {
  try {
    const readingsCol = collection(db, 'users', uid, 'readings');
    const q = query(readingsCol, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as SavedReading);
  } catch (err) {
    console.warn('Error fetching readings:', err);
    return [];
  }
}

export async function saveReading(reading: SavedReading): Promise<void> {
  try {
    const docRef = doc(db, 'users', reading.userId, 'readings', reading.id);
    await setDoc(docRef, reading);
  } catch (err) {
    console.error('Error saving reading:', err);
    throw err;
  }
}

export async function deleteReading(uid: string, readingId: string): Promise<void> {
  try {
    const docRef = doc(db, 'users', uid, 'readings', readingId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting reading:', err);
    throw err;
  }
}
