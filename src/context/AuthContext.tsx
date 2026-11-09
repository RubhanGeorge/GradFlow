import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';
import { BANGALORE_COLLEGE_DOMAINS, getCollegeName } from '../data/colleges';
import { UserProfile, WhitelistedDomain } from '../types';
import { syncWhitelistedDomains } from '../services/adminService';

interface ValidationResult {
  isValid: boolean;
  domain: string;
  isPersonalProvider: boolean;
  message?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  whitelistDomains: string[];
  whitelistedEntries: WhitelistedDomain[];
  isAuthorizedDomain: boolean;
  validateCollegeDomain: (email: string | null | undefined) => ValidationResult;
  loginWithGoogle: () => Promise<boolean>;
  signupWithEmail: (email: string, pass: string, name?: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  loginAsDemoStudent: (collegeDomain?: string) => void;
  logout: () => Promise<void>;
  clearError: () => void;
  setError: (err: string | null) => void;
}

export const PERSONAL_EMAIL_PROVIDERS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'zoho.com',
  'ymail.com',
  'mail.com',
  'live.com',
  'msn.com'
];

export const RESTRICTED_ERROR_MESSAGE = 
  "Access Restricted: Please use your official institutional email address (e.g., yourname@cmrit.ac.in). Personal email providers like Gmail are not permitted.";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic Whitelist stored in Firestore 'whitelisted_domains'
  const [dynamicWhitelist, setDynamicWhitelist] = useState<string[]>(BANGALORE_COLLEGE_DOMAINS);
  const [whitelistedEntries, setWhitelistedEntries] = useState<WhitelistedDomain[]>([]);

  // 1. Dynamic Firestore Listener for 'whitelisted_domains'
  useEffect(() => {
    let isMounted = true;
    try {
      const domainsCol = collection(db, 'whitelisted_domains');
      const unsubscribe = onSnapshot(domainsCol, async (snapshot) => {
        if (!isMounted) return;

        if (snapshot.empty) {
          // If Firestore collection is empty, automatically seed the 50 college whitelist
          console.log('Whitelisted domains collection is empty. Auto-seeding 50 Bangalore college domains...');
          await syncWhitelistedDomains();
          return;
        }

        const entries: WhitelistedDomain[] = [];
        const activeDomains: string[] = [];

        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const dom = (data.domain || docSnap.id).toLowerCase().trim();
          const status = data.status === 'disabled' ? 'disabled' : 'active';
          
          entries.push({
            domain: dom,
            collegeName: data.collegeName || getCollegeName(dom),
            status,
            addedAt: data.addedAt
          });

          if (status === 'active') {
            activeDomains.push(dom);
          }
        });

        if (isMounted) {
          setWhitelistedEntries(entries);
          // If we have active domains from Firestore, use them; otherwise fallback to the 50 Bangalore list
          if (activeDomains.length > 0) {
            setDynamicWhitelist(activeDomains);
          }
        }
      }, (err) => {
        console.warn('whitelisted_domains subscription notice, using fallback list:', err.message);
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch (e) {
      console.warn('Firestore whitelisted_domains initialization notice');
    }
  }, []);

  // Strict Validation: ONLY users with email addresses matching the whitelisted domains
  // ALL public/personal email domains (including @gmail.com, @yahoo.com, @outlook.com) MUST be strictly blocked
  const validateCollegeDomain = (email: string | null | undefined): ValidationResult => {
    if (!email) {
      return { isValid: false, domain: '', isPersonalProvider: false, message: 'Please enter an email address.' };
    }

    const lower = email.toLowerCase().trim();
    const parts = lower.split('@');
    if (parts.length !== 2 || !parts[1].includes('.')) {
      return { isValid: false, domain: '', isPersonalProvider: false, message: 'Please enter a valid email address.' };
    }

    const domain = parts[1].trim();

    // 1. Strict check: reject all public and personal email providers immediately
    if (PERSONAL_EMAIL_PROVIDERS.includes(domain)) {
      return {
        isValid: false,
        domain,
        isPersonalProvider: true,
        message: RESTRICTED_ERROR_MESSAGE
      };
    }

    // 2. Strict check against active Firestore whitelist (or default 50 college whitelist)
    const activeList = dynamicWhitelist.length > 0 ? dynamicWhitelist : BANGALORE_COLLEGE_DOMAINS;
    const isApproved = activeList.includes(domain);

    if (!isApproved) {
      return {
        isValid: false,
        domain,
        isPersonalProvider: false,
        message: RESTRICTED_ERROR_MESSAGE
      };
    }

    return { isValid: true, domain, isPersonalProvider: false };
  };

  // Sync user profile with Firestore users collection
  const syncUserMetadata = async (user: User, domain: string, customName?: string) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const collegeName = getCollegeName(domain);

      const profileData = {
        uid: user.uid,
        email: user.email || '',
        collegeDomain: domain,
        collegeName,
        displayName: customName || user.displayName || `${collegeName} Student`,
        registeredAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };

      if (!userDoc.exists()) {
        await setDoc(userRef, profileData, { merge: true });
      } else {
        await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
      }

      const activeProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: customName || user.displayName || `${collegeName} Student`,
        collegeDomain: domain,
        branch: 'Computer Science & Engineering',
        year: 'Final Year (2026 Batch)',
        role: 'student'
      };

      setUserProfile(activeProfile);
    } catch (err) {
      console.warn('Firestore user metadata sync in fallback mode:', err);
    }
  };

  useEffect(() => {
    // Purge any legacy demo user from localStorage
    localStorage.removeItem('gradflow_demo_user');

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const validation = validateCollegeDomain(user.email);
        if (validation.isValid) {
          setCurrentUser(user);
          await syncUserMetadata(user, validation.domain);
          setError(null);
        } else {
          // Immediately reject non-college domain, force sign-out, clear state
          setError(validation.message || RESTRICTED_ERROR_MESSAGE);
          await fbSignOut(auth);
          setCurrentUser(null);
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dynamicWhitelist]);

  const loginWithGoogle = async (): Promise<boolean> => {
    setError(null);
    try {
      localStorage.removeItem('gradflow_demo_user');
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      const validation = validateCollegeDomain(email);

      if (!validation.isValid) {
        setError(validation.message || RESTRICTED_ERROR_MESSAGE);
        await fbSignOut(auth);
        setCurrentUser(null);
        setUserProfile(null);
        return false;
      }

      await syncUserMetadata(result.user, validation.domain);
      return true;
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by the browser. Please allow popups or use verified student email login.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please sign in with your college account.');
      } else {
        setError(err.message || 'Failed to authenticate via Google.');
      }
      return false;
    }
  };

  const signupWithEmail = async (email: string, pass: string, name?: string): Promise<boolean> => {
    setError(null);
    const validation = validateCollegeDomain(email);
    if (!validation.isValid) {
      setError(validation.message || RESTRICTED_ERROR_MESSAGE);
      return false;
    }

    try {
      localStorage.removeItem('gradflow_demo_user');
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await syncUserMetadata(cred.user, validation.domain, name);
      return true;
    } catch (err: any) {
      console.error('Email Signup Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This institutional email is already registered. Please log in.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to create student account.');
      }
      return false;
    }
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setError(null);
    const validation = validateCollegeDomain(email);
    if (!validation.isValid) {
      setError(validation.message || RESTRICTED_ERROR_MESSAGE);
      return false;
    }

    try {
      localStorage.removeItem('gradflow_demo_user');
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await syncUserMetadata(cred.user, validation.domain);
      return true;
    } catch (err: any) {
      console.error('Email Login Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid college email or password. Please check your credentials.');
      } else {
        setError(err.message || 'Failed to sign in.');
      }
      return false;
    }
  };

  const loginAsDemoStudent = (collegeDomain: string = 'cmrit.ac.in') => {
    const activeList = dynamicWhitelist.length > 0 ? dynamicWhitelist : BANGALORE_COLLEGE_DOMAINS;
    const domain = activeList.includes(collegeDomain) ? collegeDomain : 'cmrit.ac.in';
    const collegeName = getCollegeName(domain);
    const demoProfile: UserProfile = {
      uid: `demo-student-${domain.replace(/[^a-z0-9]/g, '-')}`,
      email: `student@${domain}`,
      displayName: `${collegeName} Student`,
      collegeDomain: domain,
      usn: `1BL22CS${Math.floor(100 + Math.random() * 900)}`,
      branch: 'Computer Science & Engineering',
      year: 'Final Year (2026 Batch)',
      role: 'student'
    };
    setUserProfile(demoProfile);
    localStorage.setItem('gradflow_demo_user', JSON.stringify(demoProfile));
    setError(null);
  };

  const logout = async () => {
    localStorage.removeItem('gradflow_demo_user');
    setUserProfile(null);
    setCurrentUser(null);
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  const clearError = () => setError(null);

  const isAuthorized = Boolean(
    (currentUser && validateCollegeDomain(currentUser.email).isValid) ||
    (userProfile && validateCollegeDomain(userProfile.email).isValid)
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        error,
        whitelistDomains: dynamicWhitelist,
        whitelistedEntries,
        isAuthorizedDomain: isAuthorized,
        validateCollegeDomain,
        loginWithGoogle,
        signupWithEmail,
        loginWithEmail,
        loginAsDemoStudent,
        logout,
        clearError,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
