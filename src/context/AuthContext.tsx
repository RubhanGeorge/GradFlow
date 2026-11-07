import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';
import { BANGALORE_COLLEGE_DOMAINS, getCollegeName } from '../data/colleges';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  whitelistDomains: string[];
  isAuthorizedDomain: boolean;
  loginWithGoogle: () => Promise<boolean>;
  signupWithEmail: (email: string, pass: string, name?: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  loginAsDemoStudent: (collegeDomain?: string) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

const ALLOWED_ADMIN_EMAILS = ['admin.demo@example.edu', 'evaluator@college.edu'];
const RESTRICTED_ERROR_MESSAGE = "Please enter a valid student or campus email address.";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Validate email domain
  const validateCollegeDomain = (email: string | null | undefined): { isValid: boolean; domain: string } => {
    if (!email) return { isValid: false, domain: '' };
    const lower = email.toLowerCase().trim();
    const parts = lower.split('@');
    if (parts.length !== 2 || !parts[1].includes('.')) return { isValid: false, domain: '' };

    const domain = parts[1];
    return { isValid: true, domain };
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
        role: (user.email && ALLOWED_ADMIN_EMAILS.includes(user.email.toLowerCase())) ? 'admin' : 'student'
      };

      setUserProfile(activeProfile);
    } catch (err) {
      console.warn('Firestore user metadata sync in fallback mode:', err);
    }
  };

  useEffect(() => {
    // Check local storage for demo user
    const savedDemo = localStorage.getItem('gradflow_demo_user');
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setUserProfile(parsed);
      } catch (e) {
        console.error('Failed to parse demo user', e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { isValid, domain } = validateCollegeDomain(user.email);
        if (isValid) {
          setCurrentUser(user);
          await syncUserMetadata(user, domain);
          setError(null);
        } else {
          setError(RESTRICTED_ERROR_MESSAGE);
          await fbSignOut(auth);
          setCurrentUser(null);
        }
      } else {
        if (!localStorage.getItem('gradflow_demo_user')) {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    setError(null);
    try {
      localStorage.removeItem('gradflow_demo_user');
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      const { isValid, domain } = validateCollegeDomain(email);

      if (!isValid) {
        setError(RESTRICTED_ERROR_MESSAGE);
        await fbSignOut(auth);
        setCurrentUser(null);
        setUserProfile(null);
        return false;
      }

      await syncUserMetadata(result.user, domain);
      return true;
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by the browser. Please allow popups or use the 1-Click Bangalore College Demo Login.');
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
    const { isValid, domain } = validateCollegeDomain(email);
    if (!isValid) {
      setError(RESTRICTED_ERROR_MESSAGE);
      return false;
    }

    try {
      localStorage.removeItem('gradflow_demo_user');
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await syncUserMetadata(cred.user, domain, name);
      return true;
    } catch (err: any) {
      console.error('Email Signup Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in.');
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
    const { isValid, domain } = validateCollegeDomain(email);
    if (!isValid) {
      setError(RESTRICTED_ERROR_MESSAGE);
      return false;
    }

    try {
      localStorage.removeItem('gradflow_demo_user');
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await syncUserMetadata(cred.user, domain);
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
    const domain = BANGALORE_COLLEGE_DOMAINS.includes(collegeDomain) ? collegeDomain : 'cmrit.ac.in';
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
        whitelistDomains: BANGALORE_COLLEGE_DOMAINS,
        isAuthorizedDomain: isAuthorized,
        loginWithGoogle,
        signupWithEmail,
        loginWithEmail,
        loginAsDemoStudent,
        logout,
        clearError
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
