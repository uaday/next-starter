'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  isAuthError,
  isApiError,
  isValidationError,
  isNotFoundError,
  formatErrorMessage,
} from '@/utils/error';

/**
 * Hook for handling errors in components
 */
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleError = useCallback(
    (err: unknown) => {
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);

      // Handle different types of errors
      if (isAuthError(err)) {
        toast({
          variant: 'destructive',
          title: 'Authentication Error',
          description: err.message,
        });
      } else if (isApiError(err)) {
        toast({
          variant: 'destructive',
          title: `API Error (${err.statusCode})`,
          description: err.message,
        });
      } else if (isValidationError(err)) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: err.message,
        });
      } else if (isNotFoundError(err)) {
        toast({
          variant: 'destructive',
          title: 'Not Found',
          description: err.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: formatErrorMessage(err),
        });
      }
    },
    [toast]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Wrap an async function with error handling
   */
  const withErrorHandling = useCallback(
    <T extends any[], R>(fn: (...args: T) => Promise<R>) => {
      return async (...args: T): Promise<R | undefined> => {
        try {
          setIsLoading(true);
          clearError();
          const result = await fn(...args);
          return result;
        } catch (err) {
          handleError(err);
          return undefined;
        } finally {
          setIsLoading(false);
        }
      };
    },
    [handleError, clearError]
  );

  return {
    error,
    isLoading,
    handleError,
    clearError,
    withErrorHandling,
  };
}
