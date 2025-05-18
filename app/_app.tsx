'use client';

import type React from 'react';
import ErrorBoundary from '@/components/error-boundary';

/**
 * Custom App component with ErrorBoundary
 * This can be used to wrap specific parts of your application with an ErrorBoundary
 */
export default function CustomApp({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
