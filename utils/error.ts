/**
 * Custom error classes for different types of errors
 */

// Base application error
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

// Authentication errors
export class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message);
    this.name = 'AuthError';
  }
}

// API request errors
export class ApiError extends AppError {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// Validation errors
export class ValidationError extends AppError {
  errors: Record<string, string>;

  constructor(message = 'Validation failed', errors: Record<string, string> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Not found errors
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}

/**
 * Error handling utilities
 */

// Format error for display
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

// Check if error is a specific type
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

// Create a validation error from form errors
export function createValidationError(errors: Record<string, string>): ValidationError {
  return new ValidationError('Validation failed', errors);
}
