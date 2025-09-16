
// ─────────────────────────────────────────────────────────────────────────────
// file: components/auth/register/parts/ServerError.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

export const ServerError = ({ message }: { message: string }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
  >
    {message}
  </div>
)
