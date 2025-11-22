/**
 * Empty State Component
 *
 * Displays when there's no data to show
 */

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = '📭',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon */}
      <div className="text-6xl mb-4">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-center mb-6 max-w-md">
          {description}
        </p>
      )}

      {/* Action Button */}
      {(actionLabel && (actionHref || onAction)) && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary">{actionLabel}</Button>
            </Link>
          ) : (
            <Button onClick={onAction} variant="primary">
              {actionLabel}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default EmptyState;
