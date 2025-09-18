import React, { createContext, useContext, useState, useEffect } from 'react';
// TODO: Import Firebase Auth when ready to connect
// import { auth } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Firebase auth state listener
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setUser(user);
    //   setLoading(false);
    // });
    // return unsubscribe;

    // Mock auth for development
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      // TODO: Replace with Firebase signInWithEmailAndPassword
      // const result = await signInWithEmailAndPassword(auth, email, password);
      // return result.user;

      // Mock sign in
      const mockUser = {
        uid: 'mock-uid-' + Date.now(),
        email,
        displayName: email.split('@')[0]
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email, password, displayName) => {
    try {
      // TODO: Replace with Firebase createUserWithEmailAndPassword
      // const result = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(result.user, { displayName });
      // return result.user;

      // Mock sign up
      const mockUser = {
        uid: 'mock-uid-' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0]
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // TODO: Replace with Firebase signOut
      // await auth.signOut();
      
      // Mock sign out
      setUser(null);
      localStorage.removeItem('mockUser');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};