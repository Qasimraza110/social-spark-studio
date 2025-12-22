import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,   
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const requireAuth = () => {
  if (!auth) {
    throw { code: "app/firebase-not-configured" } as { code: string };
  }
  return auth;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const a = requireAuth();
    await signInWithEmailAndPassword(a, email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const a = requireAuth();
    const result = await createUserWithEmailAndPassword(a, email, password);
    if (result.user) {
      await updateProfile(result.user, { displayName: name });
    }
  };

  const logOut = async () => {
    const a = requireAuth();
    await signOut(a);
  };

  const signInWithGoogle = async () => {
    const a = requireAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(a, provider);
  };

  const signInWithGithub = async () => {
    const a = requireAuth();
    const provider = new GithubAuthProvider();
    await signInWithPopup(a, provider);
  };

  const resetPassword = async (email: string) => {
    const a = requireAuth();
    await sendPasswordResetEmail(a, email);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithGithub,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

