// ============================================
// File: components/Delete-Confirm-Modal.tsx
// ============================================
'use client';

import React, { useEffect, useCallback } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DeleteConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  submitting?: boolean;
  title?: string;
  message?: string;
};

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  submitting = false,
  title = 'تایید حذف',
  message = 'آیا از حذف این مورد اطمینان دارید؟',
}) => {
  useEffect(() => {
    if (!open) return;
    
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
      if (e.key === 'Enter' && !submitting) onConfirm();
    };
    
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, submitting, onClose, onConfirm]);

  const handleConfirm = useCallback(() => {
    if (submitting) return;
    onConfirm();
  }, [submitting, onConfirm]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="delete-confirm-title"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !submitting && onClose()}
        aria-hidden="true"
      />

      <div className="relative z-[1001] w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-black">
        <div className="flex items-center justify-between mb-4">
          <h3 id="delete-confirm-title" className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            aria-label="بستن"
            disabled={submitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={onClose}
            disabled={submitting}
            variant="secondary"
            className="rounded-lg"
          >
            انصراف
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={submitting}
            className="rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
          >
            {submitting ? 'در حال حذف...' : 'حذف'}
          </Button>
        </div>
      </div>
    </div>
  );
};