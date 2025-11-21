'use client';

/**
 * Auth Context Provider
 *
 * Manages authentication state throughout the application.
 * Provides user data, authentication status, and auth methods.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { login as apiLogin, register as apiRegister, logout as apiLogout, isAuthenticated } from '@/lib/auth';
import { getCurrentUser } from '@/services/user.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  register: (data: {
    email: string;
    password: string;
    displayName: string;
    interfaceLanguage: 'en' | 'ru';
  }) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user on mount
  const loadUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data.user);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
      }
    } catch (_error) {
      console.error('Failed to load user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);

      if (response.success && response.data) {
        setUser(response.data.user);
        router.push('/dashboard');
        return { success: true };
      }

      return {
        success: false,
        error: response.error || { message: 'Login failed' },
      };
    } catch (_error) {
      return {
        success: false,
        error: { message: 'Network error. Please try again.' },
      };
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    displayName: string;
    interfaceLanguage: 'en' | 'ru';
  }) => {
    try {
      const response = await apiRegister(data);

      if (response.success && response.data) {
        setUser(response.data.user);
        router.push('/dashboard');
        return { success: true };
      }

      return {
        success: false,
        error: response.error || { message: 'Registration failed' },
      };
    } catch (_error) {
      return {
        success: false,
        error: { message: 'Network error. Please try again.' },
      };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Higher-order component to protect routes
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
