'use client'
import { sendOtp } from '@/lib/api/mfaApi';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name?: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to check session:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const firebaseres = await handleLoginFirebase(email); // Call Firebase login function
      console.log('Firebase UID:', firebaseres); // Log Firebase UID
      const send = await sendOtp(email); // Send OTP to email
      console.log('OTP sent to email:', send); // Log OTP sent status
    //   setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFirebase = async (email:string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/authf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Firebase UID:', data.uid);
        // Now you can use UID or trigger OTP or redirect user
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (err) {
      console.error('Request error:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Automatically log in after successful registration
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Logout failed');
      }

      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
