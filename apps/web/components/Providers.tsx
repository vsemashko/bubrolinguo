'use client';

/**
 * Client-side Providers Wrapper
 *
 * Wraps the app with all client-side context providers.
 * This keeps the root layout as a server component.
 */

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import { AchievementProvider } from '@/contexts/AchievementContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <AchievementProvider>
            {children}
          </AchievementProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
