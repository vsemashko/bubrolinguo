/**
 * Error State Component
 *
 * Displays error messages with retry functionality
 */

import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error;
  onRetry?: () => void;
  showDetails?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  error,
  onRetry,
  showDetails = false,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Error Icon */}
      <div className="text-6xl mb-4">⚠️</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
        {title}
      </h3>

      {/* Message */}
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>

      {/* Error Details (Development) */}
      {showDetails && error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl w-full">
          <div className="text-sm font-mono text-red-800 whitespace-pre-wrap">
            {error.message}
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-red-600 hover:text-red-700">
                  Stack trace
                </summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}

      {/* Retry Button */}
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
