// ─────────────────────────────────────────────────────────────────────────────
// file: components/auth/login/parts/ServerError.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

export const ServerError = ({ message }: { message: string }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2"
  >
    <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-red-500" />
    </div>
    {message}
  </div>
)

