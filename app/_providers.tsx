'use client';

import type React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/error-boundary';

/**
 * Combined providers for the application
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
