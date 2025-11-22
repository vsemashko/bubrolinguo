/**
 * Confirmation Dialog Component
 *
 * Displays a modal dialog for confirming destructive actions
 */

'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'warning',
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'info':
        return 'ℹ️';
      default:
        return '❓';
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        {/* Icon */}
        <div className="text-5xl mb-4">{getIcon()}</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            variant={getButtonVariant()}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
