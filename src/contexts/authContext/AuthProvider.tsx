// @ts-nocheck

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "@/firebase/firebase.config";
import { useContext, useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (updates) => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user");
    }
    return updateProfile(auth.currentUser, updates);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // THIS currentUser is just provided by the framework. which is just a magical thing in js to me.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      currentUser ? console.log("Logged In ↘️") : console.log("Logged Out ↗️");
    });

    return () => unsubscribe();
  }, []);

  const value = {
    createUser,
    signInUser,
    updateUserProfile,
    user,
    signOutUser,
    loading,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook — use this everywhere instead of useContext(AuthContext) directly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
