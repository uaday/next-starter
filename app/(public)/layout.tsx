import type React from 'react';
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">{children}</div>
    </div>
  );
}
