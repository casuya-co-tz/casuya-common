/**
 * HTTP-related errors
 * Standardized errors for API responses
 */

import { ERROR_CODES, HTTP_STATUS } from '../constants';
import { AppError } from './base';

/**
 * Resource not found
 */
export class NotFoundError extends AppError {
  constructor(resource?: string, identifier?: string | number) {
    const message = resource
      ? `${resource}${identifier ? ` with id '${identifier}'` : ''} not found`
      : 'Resource not found';
    super(ERROR_CODES.NOT_FOUND, message, HTTP_STATUS.NOT_FOUND);
  }
}

/**
 * Resource already exists
 */
export class AlreadyExistsError extends AppError {
  constructor(resource?: string, identifier?: string | number) {
    const message = resource
      ? `${resource}${identifier ? ` with id '${identifier}'` : ''} already exists`
      : 'Resource already exists';
    super(ERROR_CODES.ALREADY_EXISTS, message, HTTP_STATUS.CONFLICT);
  }
}

/**
 * Authentication required
 */
export class UnauthorizedError extends AppError {
  constructor(message?: string) {
    super(
      ERROR_CODES.UNAUTHORIZED,
      message || 'Authentication required',
      HTTP_STATUS.UNAUTHORIZED
    );
  }
}

/**
 * Access denied
 */
export class ForbiddenError extends AppError {
  constructor(message?: string, resource?: string) {
    const msg = resource
      ? `Access denied to ${resource}`
      : message || 'Access denied';
    super(ERROR_CODES.FORBIDDEN, msg, HTTP_STATUS.FORBIDDEN);
  }
}

/**
 * Conflict with current state
 */
export class ConflictError extends AppError {
  constructor(message?: string, details?: Record<string, unknown>) {
    super(ERROR_CODES.CONFLICT, message || 'Resource conflict', HTTP_STATUS.CONFLICT, details);
  }
}

/**
 * Bad request
 */
export class BadRequestError extends AppError {
  constructor(message?: string, details?: Record<string, unknown>) {
    super(ERROR_CODES.INVALID_INPUT, message || 'Invalid input', HTTP_STATUS.BAD_REQUEST, details);
  }
}

/**
 * Rate limit exceeded
 */
export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super(
      ERROR_CODES.RATE_LIMITED,
      'Rate limit exceeded',
      HTTP_STATUS.TOO_MANY_REQUESTS,
      retryAfter ? { retryAfter } : undefined
    );
  }
}

/**
 * Operation timeout
 */
export class TimeoutError extends AppError {
  constructor(operation?: string) {
    super(
      ERROR_CODES.TIMEOUT,
      operation ? `Operation '${operation}' timed out` : 'Operation timed out',
      HTTP_STATUS.REQUEST_TIMEOUT
    );
  }
}

/**
 * Network connection failed
 */
export class ConnectionError extends AppError {
  constructor(target?: string) {
    super(
      ERROR_CODES.CONNECTION_FAILED,
      target ? `Failed to connect to ${target}` : 'Connection failed',
      HTTP_STATUS.BAD_GATEWAY
    );
  }
}

/**
 * Service unavailable
 */
export class ServiceUnavailableError extends AppError {
  constructor(service?: string) {
    super(
      ERROR_CODES.SERVICE_UNAVAILABLE,
      service ? `Service '${service}' is unavailable` : 'Service unavailable',
      HTTP_STATUS.SERVICE_UNAVAILABLE
    );
  }
}
