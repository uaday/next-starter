'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  title?: string;
  description?: string;
}

/**
 * A reusable error fallback component to display when an error occurs
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  description,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-destructive/10">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="mb-6 text-muted-foreground">
        {description || error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
