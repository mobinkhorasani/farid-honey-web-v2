
// ─────────────────────────────────────────────────────────────────────────────
// file: components/auth/register/parts/ServerSuccess.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

export const ServerSuccess = ({ message }: { message: string }) => (
  <div
    role="status"
    aria-live="polite"
    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
  >
    {message}
  </div>
)
